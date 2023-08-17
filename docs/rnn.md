# Recurrent Neural Network

The **Recurrent Neural Network (RNN)** is an implementation of a simple recurrent neural network in JavaScript. It includes methods for creating the network, performing feedforward operations, and training the network using backpropagation through time.

## Class: RNN

Represents a simple recurrent neural network.

### Constructor

Creates a new instance of the RNN class.

```js
new RNN(inputSize, hiddenSize, outputSize, learningRate)
```

* `inputSize` (number): The number of input neurons.
* `hiddenSize` (number): The number of neurons in the hidden layer.
* `outputSize` (number): The number of output neurons.
* `learningRate` (number): The learning rate for weight updates during tsaining.

### Methods

`.sigmoid(x)`

Calculates the sigmoid activation function value for a given input.

* `x` (number): The input value.
* Returns: The sigmoid output.

`.tanh(x)`

Calculates the hyperbolic tangent activation function value for a given input.

* `x` (number): The input value.
* Returns: The hyperbolic tangent output.

`.forward(inputs)`
Performs a feedforward pass through the recurrent neural network.

* `inputs` (number[]): The input values.
* Returns: The output values.

`.train(inputs, targets)`

Trains the recurrent neural network using the provided inputs and targets.

* `inputs` (number[]): The input values.
* `targets` (number[]): The target values.

## Properties

`.inputSize`

The number of input neurons.

`.hiddenSize`

The number of neurons in the hidden layer.

`.outputSize`

The number of output neurons.

`.learningRate`

The learning rate for weight updates during training.