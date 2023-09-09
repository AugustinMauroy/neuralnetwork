// @TODO: fix this (i have do something wrong with my brain)
// explore using worker threads to train the network
import { RecurrentNeuralNetwork } from '@augustinmauroy/neuralnetwork';

const rnn = new RecurrentNeuralNetwork(2, 4, 1, 0.1);

// Train the network on a set of inputs and targets
const inputs = [[0, 0], [0, 1], [1, 0], [1, 1]];
const targets = [[0], [1], [1], [0]];
for (let i = 0; i < 10000000; i++) {

    const index = i % inputs.length;
    rnn.train(inputs[index], targets[index]);

}

// Test the network on a new input
console.log([0, 0], rnn.feedforward([0, 0]));
console.log([1, 0], rnn.feedforward([1, 0]));
console.log([1, 1], rnn.feedforward([1, 1]));
console.log([0, 1], rnn.feedforward([0, 1]));
