import { NeuralNetwork } from 'neuralnetwork-js';

const numberOfIterations = 100000;

const trainingData = [
    [[0, 0], [0]],
    [[0, 1], [1]],
    [[1, 0], [1]],
    [[1, 1], [0]]
];

const nn = new NeuralNetwork(2, 3, 1, 0.1);

nn.train(trainingData, numberOfIterations);

nn.test([0, 0]);
nn.test([0, 1]);
nn.test([1, 0]);
nn.test([1, 1]);

