import fs from 'node:fs';

interface NeuralNetworkConfig {
  inputSize: number;
  hiddenSize: number;
  outputSize: number;
  learningRate: number;
}

class NeuralNetwork {

    private inputSize: number;
    private hiddenSize: number;
    private outputSize: number;
    private learningRate: number;
    private weights: {
    inputToHidden: number[][];
    hiddenToOutput: number[][];
  };

    constructor(config: NeuralNetworkConfig) {

        this.inputSize = config.inputSize;
        this.hiddenSize = config.hiddenSize;
        this.outputSize = config.outputSize;
        this.learningRate = config.learningRate;

        // Initialize the weights of the neural network with random values
        this.weights = {
            inputToHidden: new Array(this.inputSize).fill([]).map(() => new Array(this.hiddenSize).fill(0).map(() => Math.random())),
            hiddenToOutput: new Array(this.hiddenSize).fill([]).map(() => new Array(this.outputSize).fill(0).map(() => Math.random())),
        };
    
    }

    sigmoid(x: number): number {

        return 1 / (1 + Math.exp(-x));
    
    }

    feedforward(inputs: number[]): number[] {

        // Calculate the outputs of the hidden layer
        const hiddenOutputs: number[] = new Array(this.hiddenSize).fill(0);
        for (let i = 0; i < this.hiddenSize; i++) {

            let sum = 0;
            for (let j = 0; j < this.inputSize; j++) {

                sum += inputs[j] * this.weights.inputToHidden[j][i];
            
            }
            hiddenOutputs[i] = this.sigmoid(sum);
        
        }

        // Calculate the outputs of the output layer
        const outputs: number[] = new Array(this.outputSize).fill(0);
        for (let i = 0; i < this.outputSize; i++) {

            let sum = 0;
            for (let j = 0; j < this.hiddenSize; j++) {

                sum += hiddenOutputs[j] * this.weights.hiddenToOutput[j][i];
            
            }
            outputs[i] = this.sigmoid(sum);
        
        }

        return outputs;
    
    }

    backpropagation(inputs: number[], targets: number[]): void {

        // Calculate the outputs of the hidden layer and the final output
        const hiddenOutputs: number[] = new Array(this.hiddenSize).fill(0);
        const outputs: number[] = new Array(this.outputSize).fill(0);
        for (let i = 0; i < this.hiddenSize; i++) {

            let sum = 0;
            for (let j = 0; j < this.inputSize; j++) {

                sum += inputs[j] * this.weights.inputToHidden[j][i];
            
            }
            hiddenOutputs[i] = this.sigmoid(sum);
        
        }
        for (let i = 0; i < this.outputSize; i++) {

            let sum = 0;
            for (let j = 0; j < this.hiddenSize; j++) {

                sum += hiddenOutputs[j] * this.weights.hiddenToOutput[j][i];
            
            }
            outputs[i] = this.sigmoid(sum);
        
        }

        // Calculate the output error
        const outputErrors: number[] = new Array(this.outputSize).fill(0);
        for (let i = 0; i < this.outputSize; i++) {

            outputErrors[i] = targets[i] - outputs[i];
        
        }

        // Calculate the hidden layer error
        const hiddenErrors: number[] = new Array(this.hiddenSize).fill(0);
        for (let i = 0; i < this.hiddenSize; i++) {

            let sum = 0;
            for (let j = 0; j < this.outputSize; j++) {

                sum += outputErrors[j] * this.weights.hiddenToOutput[i][j];
            
            }
            hiddenErrors[i] = hiddenOutputs[i] * (1 - hiddenOutputs[i]) * sum;
        
        }

        // Update the weights from the hidden layer to the output
        for (let i = 0; i < this.hiddenSize; i++) {

            for (let j = 0; j < this.outputSize; j++) {

                this.weights.hiddenToOutput[i][j] += this.learningRate * outputErrors[j] * hiddenOutputs[i];
            
            }
        
        }

        // Update the weights from the input to the hidden layer
        for (let i = 0; i < this.inputSize; i++) {

            for (let j = 0; j < this.hiddenSize; j++) {

                this.weights.inputToHidden[i][j] += this.learningRate * hiddenErrors[j] * inputs[i];
            
            }
        
        }
    
    }

    train(trainingData: [number[], number[]][], numberOfIterations: number): void {

        // Train the neural network
        for (let i = 0; i < numberOfIterations; i++) {

            const randomIndex = Math.floor(Math.random() * trainingData.length);
            const [randomInputs, randomTargets] = trainingData[randomIndex];
            this.backpropagation(randomInputs, randomTargets);
        
        }
    
    }

    test(input: number[]): void {

        // Test the neural network
        const outputs = this.feedforward(input);
        console.log(`Input: ${input[0]} ${input[1]} | Output: ${outputs[0]}`);
    
    }

    saveModel(filePath: string): void {

        const model = JSON.stringify(this.weights);
        fs.writeFileSync(filePath, model);
    
    }

    loadModel(filePath: string): void {

        const model = fs.readFileSync(filePath, 'utf-8');
        this.weights = JSON.parse(model);
    
    }

}

export default NeuralNetwork;
