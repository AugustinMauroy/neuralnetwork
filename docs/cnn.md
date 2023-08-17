# Convolutional Neural Network

The **Convolutional Neural Network (CNN)** is an implementation of a basic convolutional neural network in JavaScript. It performs convolution operations on input data using filters.

## Class: CNN

Represents a basic convolutional neural network.

### Constructor

Creates a new instance of the CNN class.

```js
new CNN(inputSize, numFilters, filterSize, stride, padding)
```

* `inputSize` (number): The size of the input data (assuming square input).
* `numFilters` (number): The number of filters to apply.
* `filterSize` (number): The size of each filter (assuming square filter).
* `stride` (number): The stride value for the convolution operation.
* `padding` (number): The padding value for the convolution operation.

### Methods

`.convolve(input)`

Performs the convolution operation on the input data using the defined filters.

* `input` (Array<Array<number>>): The input data to perform convolution on.
* Returns: An array representing the convolved output.
