# Neural Network

The **Neural Network** is a simple feedforward neural network implementation in JavaScript. It consists of methods for creating, training, testing, saving, and loading a neural network model.

## Class: NeuralNetwork

Represents a feedforward neural network with customizable architecture and learning parameters.

### Constructor

Creates a new instance of the NeuralNetwork class.

```js
new NeuralNetwork(inputSize, hiddenSize, outputSize, learningRate)
```

* `inputSize` (number): The number of input neurons.
* `hiddenSize` (number): The number of neurons in the hidden layer.
* `outputSize` (number): The number of output neurons.
* `learningRate` (number): The learning rate for weight updates during training.

### Methods

`.sigmoid(x)`

Calculates the sigmoid activation function value for a given input.

* `x` (number): The input value.
* Returns: The sigmoid output.

`.feedforward(inputs)`

Performs a feedforward pass through the neural network.

* `inputs` (number[]): The input values.
* Returns: The output values.

`.backpropagation(inputs, targets)`

Performs backpropagation to update the network's weights based on error.

* `inputs` (number[]): The input values.
* `targets` (number[]): The target output values.

`.train(inputs, targets)`

Trains the neural network using the provided training data.

* `trainingData` (Array<[number[], number[]]>): An array of input-target pairs for training.
* `numberOfIterations` (number): The number of training iterations.

`.test(input)`

Tests the neural network using the provided input and displays the output.

* `input` (number[]): The input values.

`.saveModel(filePath)`

Saves the model's weights to a JSON file.

* `filePath` (string): The file path to save the model to.

`.loadModel(filePath)`

Loads the model's weights from a JSON file.

* `filePath` (string): The file path to load the model from.
