# Convolutional Neural Network (CNN) Documentation

This code defines a Convolutional Neural Network (CNN) class for performing convolutions on 2D input data.

## Class: CNN

### Constructor

#### `CNN(inputSize, numFilters, filterSize, stride, padding)`

Creates a new instance of the `CNN` class representing a Convolutional Neural Network.

- `inputSize` (number): The size (width and height) of the 2D input data.
- `numFilters` (number): The number of filters (also known as kernels or feature maps) to be applied during the convolution.
- `filterSize` (number): The size (width and height) of each filter.
- `stride` (number): The stride value, which represents the step size at which the filter moves over the input data.
- `padding` (number): The amount of zero-padding to be added around the input data before applying the convolution.

### Attributes

- `inputSize` (number): The size (width and height) of the 2D input data.
- `numFilters` (number): The number of filters (kernels) in the CNN.
- `filterSize` (number): The size (width and height) of each filter.
- `stride` (number): The stride value used during the convolution operation.
- `padding` (number): The amount of zero-padding added around the input data.
- `filters` (Array): An array containing the filters used in the CNN. Each filter is represented as a 2D array.

## Method: convolve

#### `convolve(input)`

Performs the convolution operation on the given 2D input data using the filters.

- `input` (Array): A 2D array representing the input data.

Returns:
- A 3D array containing the result of the convolution. The first dimension represents the filter number, and the other two dimensions represent the spatial dimensions of the output.
