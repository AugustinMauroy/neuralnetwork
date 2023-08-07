// it's should work but i can't test it because i don't know how to use it
import CNN from './lib/cnn.js';

// Create a new CNN with 3 filters of size 3x3, stride 1 and padding 1
const cnn = new CNN(5, 3, 3, 1, 1);

// Create a random input image of size 5x5
const input = new Array(5).fill(0).map(() => new Array(5).fill(0).map(() => Math.random()));

// Perform convolution on the input image
const output = cnn.convolve(input);

// Print the output
console.log(output);
