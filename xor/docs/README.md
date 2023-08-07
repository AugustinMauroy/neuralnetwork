# NeuralNetwork Class Documentation

The `NeuralNetwork` class is a simple implementation of a feedforward neural network with backpropagation for supervised learning. It allows you to create a neural network with a specified number of input, hidden, and output nodes. The network is trained using backpropagation and can be used for making predictions on new data.

## Class: NeuralNetwork

### Constructor

#### `NeuralNetwork(inputSize, hiddenSize, outputSize, learningRate)`

Creates a new instance of the `NeuralNetwork` class.

- `inputSize` (number): The number of input nodes in the neural network.
- `hiddenSize` (number): The number of nodes in the hidden layer of the neural network.
- `outputSize` (number): The number of output nodes in the neural network.
- `learningRate` (number): The learning rate for adjusting the weights during training.

The constructor initializes the weights of the neural network with random values between 0 and 1.

### Instance Methods

#### `sigmoid(x)`

Applies the sigmoid activation function to a given input.

- `x` (number): The input to the sigmoid function.

Returns:
- The output after applying the sigmoid function.

#### `feedforward(inputs)`

Performs a feedforward pass through the neural network to calculate the output for a given set of inputs.

- `inputs` (Array): An array of input values for the neural network.

Returns:
- An array representing the output of the neural network.

#### `backpropagation(inputs, targets)`

Performs the backpropagation algorithm to update the weights of the neural network based on the given inputs and target outputs.

- `inputs` (Array): An array of input values for the neural network.
- `targets` (Array): An array of target output values for the corresponding inputs.

#### `train(trainingData, numberOfIterations)`

Trains the neural network using backpropagation and a given set of training data for a specified number of iterations.

- `trainingData` (Array): An array of training data where each element is a tuple containing the input array and the target output array.
- `numberOfIterations` (number): The number of iterations for training.

#### `test(input)`

Tests the trained neural network by making predictions on a given input.

- `input` (Array): An array of input values to be used for testing.
