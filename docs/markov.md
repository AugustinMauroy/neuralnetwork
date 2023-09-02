# Markov Model

The **Markov Model** is a text generation model implemented in TypeScript. It creates responses by learning from question-answer pairs provided during construction. This model utilizes a Markov-like architecture to generate text based on the patterns observed in the training data.

## Class: `MarkovModel``

Represents a generative model based on a Markov-like architecture.

### Constructor

Creates a new instance of the MarkovModel class

```js
new MarkovModel(data)
```

* `data` (Array): An array of objects containing question-answer pairs for training.

### Methods

`.tokenizeText(text)`

Tokenizes the given text into an array of lowercase words.

* `text` (string): The text to tokenize.
* Returns: An array of lowercase words.

`.createMarkovModel()`

Creates a Markov-like model based on the provided data.

Returns: An object representing the Markov model.

`.generateResponse(question, length, context)`

Generates a response based on the input question, desired response length, and optional context.

* `question` (string): The input question.
* `length` (number): The desired length of the response.
* `context` (string, optional): Optional context for generating a response.
* `Returns: The generated response.

`.learnModel(newData)`

Learns the model based on new question-answer pairs.

* `newData` (Array): An array of objects containing additional question-answer pairs for learning.

`.saveModel(filename)`

Saves the current model to a file.

* `filename` (string): The name of the file to save the model to.

`.loadModel(filename)`

Loads a model from a file.

* `filename` (string): The name of the file to load the model from.