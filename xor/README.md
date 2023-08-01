# Neural Network XOR

This code defines a neural network that can learn to solve the XOR problem using backpropagation. The network has 2 input neurons, 3 hidden neurons, and 1 output neuron. The weights of the network are initialized with random values, and the sigmoid function is used as the activation function.

The feedforward function calculates the output of the network given an input. The backpropagation function updates the weights of the network based on the error between the output of the network and the target output. The network is trained with 10000 iterations of the XOR problem.

To test the network, the feedforward function is called with the inputs [0, 0], [0, 1], [1, 0], and [1, 1].

## Usage

To run the code, simply run the following command in the terminal:

```bash
node index.js
```
