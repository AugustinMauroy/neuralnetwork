class NeuralNetwork {
	constructor(inputSize, hiddenSize, outputSize, learningRate) {
		this.inputSize = inputSize;
		this.hiddenSize = hiddenSize;
		this.outputSize = outputSize;
		this.learningRate = learningRate;
  
		// Initialize the weights of the neural network with random values
		this.weights = {
			inputToHidden: new Array(inputSize).fill().map(() => new Array(hiddenSize).fill().map(() => Math.random())),
			hiddenToOutput: new Array(hiddenSize).fill().map(() => new Array(outputSize).fill().map(() => Math.random()))
		};
	}
  
	sigmoid(x) {
		return 1 / (1 + Math.exp(-x));
	}
  
	feedforward(inputs) {
		// Calculate the outputs of the hidden layer
		const hiddenOutputs = new Array(this.hiddenSize).fill(0);
		for (let i = 0; i < this.hiddenSize; i++) {
			let sum = 0;
			for (let j = 0; j < this.inputSize; j++) {
				sum += inputs[j] * this.weights.inputToHidden[j][i];
			}
			hiddenOutputs[i] = this.sigmoid(sum);
		}
  
		// Calculate the outputs of the hidden layer
		const outputs = new Array(this.outputSize).fill(0);
		for (let i = 0; i < this.outputSize; i++) {
			let sum = 0;
			for (let j = 0; j < this.hiddenSize; j++) {
				sum += hiddenOutputs[j] * this.weights.hiddenToOutput[j][i];
			}
			outputs[i] = this.sigmoid(sum);
		}
  
		return outputs;
	}
  
	backpropagation(inputs, targets) {
		// Calculate the outputs of the hidden layer and the final output
		const hiddenOutputs = new Array(this.hiddenSize).fill(0);
		const outputs = new Array(this.outputSize).fill(0);
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
		const outputErrors = new Array(this.outputSize).fill(0);
		for (let i = 0; i < this.outputSize; i++) {
			outputErrors[i] = targets[i] - outputs[i];
		}
  
		// Calculer l'erreur de la couche cachée
		const hiddenErrors = new Array(this.hiddenSize).fill(0);
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
  
	train(trainingData, numberOfIterations) {
		// Train the neural network
		for (let i = 0; i < numberOfIterations; i++) {
			const randomIndex = Math.floor(Math.random() * trainingData.length);
			const randomTrainingData = trainingData[randomIndex];
			this.backpropagation(randomTrainingData[0], randomTrainingData[1]);
		}
	}
  
	test(input) {
		// Test the neural network
		const outputs = this.feedforward(input);
		console.log(`Input: ${input[0]} ${input[1]} | Output: ${outputs[0]}`);
	}
}
  
export default NeuralNetwork;
