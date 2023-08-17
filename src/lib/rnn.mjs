class RNN {
	constructor(inputSize, hiddenSize, outputSize, learningRate) {
		this.inputSize = inputSize;
		this.hiddenSize = hiddenSize;
		this.outputSize = outputSize;
		this.learningRate = learningRate;
  
		// Initialize the weights of the neural network with random values
		this.weights = {
			inputToHidden: new Array(inputSize).fill().map(() => new Array(hiddenSize).fill().map(() => Math.random())),
			hiddenToHidden: new Array(hiddenSize).fill().map(() => new Array(hiddenSize).fill().map(() => Math.random())),
			hiddenToOutput: new Array(hiddenSize).fill().map(() => new Array(outputSize).fill().map(() => Math.random()))
		};
  
		// Initialize the biases of the neural network with random values
		this.biases = {
			hidden: new Array(hiddenSize).fill().map(() => Math.random()),
			output: new Array(outputSize).fill().map(() => Math.random())
		};
  
		// Initialize the previous hidden state to zeros
		this.previousHiddenState = new Array(hiddenSize).fill(0);
	}
  
	sigmoid(x) {
		return 1 / (1 + Math.exp(-x));
	}
  
	tanh(x) {
		return Math.tanh(x);
	}
  
	feedforward(inputs) {
		// Calculate the outputs of the hidden layer
		const hiddenOutputs = new Array(this.hiddenSize).fill(0);
		for (let i = 0; i < this.hiddenSize; i++) {
			let sum = 0;
			for (let j = 0; j < this.inputSize; j++) {
				sum += inputs[j] * this.weights.inputToHidden[j][i];
			}
			for (let j = 0; j < this.hiddenSize; j++) {
				sum += this.previousHiddenState[j] * this.weights.hiddenToHidden[j][i];
			}
			hiddenOutputs[i] = this.tanh(sum + this.biases.hidden[i]);
		}
  
		// Calculate the outputs of the output layer
		const outputs = new Array(this.outputSize).fill(0);
		for (let i = 0; i < this.outputSize; i++) {
			let sum = 0;
			for (let j = 0; j < this.hiddenSize; j++) {
				sum += hiddenOutputs[j] * this.weights.hiddenToOutput[j][i];
			}
			outputs[i] = this.sigmoid(sum + this.biases.output[i]);
		}
  
		// Save the current hidden state as the previous hidden state for the next time step
		this.previousHiddenState = hiddenOutputs;
  
		return outputs;
	}
  
	train(inputs, targets) {
		// Feedforward to get the outputs
		const outputs = this.feedforward(inputs);
  
		// Calculate the error of the output layer
		const outputErrors = new Array(this.outputSize).fill(0);
		for (let i = 0; i < this.outputSize; i++) {
			outputErrors[i] = outputs[i] * (1 - outputs[i]) * (targets[i] - outputs[i]);
		}
  
		// Calculate the error of the hidden layer
		const hiddenErrors = new Array(this.hiddenSize).fill(0);
		for (let i = 0; i < this.hiddenSize; i++) {
			let sum = 0;
			for (let j = 0; j < this.outputSize; j++) {
				sum += outputErrors[j] * this.weights.hiddenToOutput[i][j];
			}
			hiddenErrors[i] = (1 - this.previousHiddenState[i] ** 2) * sum;
		}
  
		// Update the weights and biases of the neural network
		for (let i = 0; i < this.inputSize; i++) {
			for (let j = 0; j < this.hiddenSize; j++) {
				this.weights.inputToHidden[i][j] += this.learningRate * inputs[i] * hiddenErrors[j];
			}
		}
		for (let i = 0; i < this.hiddenSize; i++) {
			for (let j = 0; j < this.hiddenSize; j++) {
				this.weights.hiddenToHidden[i][j] += this.learningRate * this.previousHiddenState[i] * hiddenErrors[j];
			}
		}
		for (let i = 0; i < this.hiddenSize; i++) {
			for (let j = 0; j < this.outputSize; j++) {
				this.weights.hiddenToOutput[i][j] += this.learningRate * this.previousHiddenState[i] * outputErrors[j];
			}
		}
		for (let i = 0; i < this.hiddenSize; i++) {
			this.biases.hidden[i] += this.learningRate * hiddenErrors[i];
		}
		for (let i = 0; i < this.outputSize; i++) {
			this.biases.output[i] += this.learningRate * outputErrors[i];
		}
	}
}

export default RNN;
