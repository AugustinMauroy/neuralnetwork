# RNN (Recurrent Neural Network) Class Documentation

The `RNN` class is a simple implementation of a Recurrent Neural Network (RNN) with a single hidden layer. The RNN allows you to create a network with a specified number of input, hidden, and output nodes. The network is trained using backpropagation through time and can be used for making predictions on sequential data.

## Class: RNN

### Constructor

#### `RNN(inputSize, hiddenSize, outputSize, learningRate)`

Creates a new instance of the `RNN` class.

- `inputSize` (number): The number of input nodes in the RNN.
- `hiddenSize` (number): The number of nodes in the hidden layer of the RNN.
- `outputSize` (number): The number of output nodes in the RNN.
- `learningRate` (number): The learning rate for adjusting the weights during training.

The constructor initializes the weights and biases of the RNN with random values between 0 and 1. It also initializes the previous hidden state to zeros.

### Instance Methods

#### `sigmoid(x)`

Applies the sigmoid activation function to a given input.

- `x` (number): The input to the sigmoid function.

Returns:
- The output after applying the sigmoid function.

#### `tanh(x)`

Applies the hyperbolic tangent activation function to a given input.

- `x` (number): The input to the tanh function.

Returns:
- The output after applying the tanh function.

#### `feedforward(inputs)`

Performs a feedforward pass through the RNN to calculate the output for a given set of inputs.

- `inputs` (Array): An array of input values for the RNN.

Returns:
- An array representing the output of the RNN.

#### `train(inputs, targets)`

Trains the RNN using backpropagation through time (BPTT) and a given set of inputs and corresponding target outputs.

- `inputs` (Array): An array of input values for the RNN.
- `targets` (Array): An array of target output values for the corresponding inputs.

#### Note on Training:

The `train` method updates the weights and biases of the RNN based on the current input and target outputs. Since the RNN is designed to handle sequential data, it is essential to feed data in the correct order during training.
