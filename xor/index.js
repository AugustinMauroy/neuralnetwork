// Define the parameters of the neural network
const inputSize = 2;
const hiddenSize = 3;
const outputSize = 1;
const learningRate = 0.1;

// Initialize the weights of the neural network with random values
const weights = {
	inputToHidden: new Array(inputSize).fill().map(() => new Array(hiddenSize).fill().map(() => Math.random())),
	hiddenToOutput: new Array(hiddenSize).fill().map(() => new Array(outputSize).fill().map(() => Math.random()))
};

function sigmoid(x) {
	return 1 / (1 + Math.exp(-x));
}

function feedforward(inputs) {
	// Calculate the outputs of the hidden layer
	const hiddenOutputs = new Array(hiddenSize).fill(0);
	for (let i = 0; i < hiddenSize; i++) {
		let sum = 0;
		for (let j = 0; j < inputSize; j++) {
			sum += inputs[j] * weights.inputToHidden[j][i];
		}
		hiddenOutputs[i] = sigmoid(sum);
	}

	// Calculate the outputs of the hidden layer
	const outputs = new Array(outputSize).fill(0);
	for (let i = 0; i < outputSize; i++) {
		let sum = 0;
		for (let j = 0; j < hiddenSize; j++) {
			sum += hiddenOutputs[j] * weights.hiddenToOutput[j][i];
		}
		outputs[i] = sigmoid(sum);
	}

	return outputs;
}

function backpropagation(inputs, targets) {
	// Calculate the outputs of the hidden layer and the final output
	const hiddenOutputs = new Array(hiddenSize).fill(0);
	const outputs = new Array(outputSize).fill(0);
	for (let i = 0; i < hiddenSize; i++) {
		let sum = 0;
		for (let j = 0; j < inputSize; j++) {
			sum += inputs[j] * weights.inputToHidden[j][i];
		}
		hiddenOutputs[i] = sigmoid(sum);
	}
	for (let i = 0; i < outputSize; i++) {
		let sum = 0;
		for (let j = 0; j < hiddenSize; j++) {
			sum += hiddenOutputs[j] * weights.hiddenToOutput[j][i];
		}
		outputs[i] = sigmoid(sum);
	}

	// Calculate the output error
	const outputErrors = new Array(outputSize).fill(0);
	for (let i = 0; i < outputSize; i++) {
		outputErrors[i] = targets[i] - outputs[i];
	}

	// Calculer l'erreur de la couche cachée
	const hiddenErrors = new Array(hiddenSize).fill(0);
	for (let i = 0; i < hiddenSize; i++) {
		let sum = 0;
		for (let j = 0; j < outputSize; j++) {
			sum += outputErrors[j] * weights.hiddenToOutput[i][j];
		}
		hiddenErrors[i] = hiddenOutputs[i] * (1 - hiddenOutputs[i]) * sum;
	}

	// Update the weights from the hidden layer to the output
	for (let i = 0; i < hiddenSize; i++) {
		for (let j = 0; j < outputSize; j++) {
			weights.hiddenToOutput[i][j] += learningRate * outputErrors[j] * hiddenOutputs[i];
		}
	}

	// Update the weights from the input to the hidden layer
	for (let i = 0; i < inputSize; i++) {
		for (let j = 0; j < hiddenSize; j++) {
			weights.inputToHidden[i][j] += learningRate * hiddenErrors[j] * inputs[i];
		}
	}
}

// Training the neural network with data
for (let i = 0; i < 10000; i++) {
	backpropagation([0, 0], [0]);
	backpropagation([0, 1], [1]);
	backpropagation([1, 0], [1]);
	backpropagation([1, 1], [0]);
}

// Testing the neural network
console.log(feedforward([0, 0]));
console.log(feedforward([0, 1]));
console.log(feedforward([1, 0])); 
console.log(feedforward([1, 1]));
