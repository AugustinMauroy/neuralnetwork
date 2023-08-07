import RNN from './lib/rnn.js';

// Create an RNN with input size 2, hidden size 3, output size 1, and learning rate 0.1
const rnn = new RNN(2, 3, 1, 0.1);

// Train the network on a set of inputs and targets
const inputs = [[0, 0], [0, 1], [1, 0], [1, 1]];
const targets = [[0], [1], [1], [0]];
for (let i = 0; i < 10000; i++) {
	const index = i % inputs.length;
	rnn.train(inputs[index], targets[index]);
}

// Test the network on a new input
console.log(rnn.feedforward([0, 0]));
console.log(rnn.feedforward([1, 0]));
console.log(rnn.feedforward([1, 1]));
console.log(rnn.feedforward([0, 1]));
