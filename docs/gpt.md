# Generative Pre-trained Transformer Model

The **Generative Pre-trained Transformer (GPT) Model** is a simple implementation of a text generation model based on the GPT-like architecture. It generates responses by learning from question-answer pairs provided in the constructor.

## Class: GPTModel

Represents a generative model based on GPT-like architecture.

### Constructor

Creates a new instance of the GPTModel class.

```js
new GPTModel(data)
```

* data (Array): An array of objects containing question-answer pairs for training.

#### Methods

`.tokenizeText(text)`

Tokenizes the given text into an array of lowercase words.

* `text` (string): The text to tokenize.
* Returns: An array of lowercase words.

`.createGPTModel()`

Creates a GPT-like model based on the provided data.

* Returns: An object representing the GPT model.

`.generateResponse(question, length, context)`

* `question` (string): The input question.
* `length` (number): The desired length of the response.
* `context` (string, optional): The optional context for generating a response.
* Returns: The generated response.

`.learnModel(newData)`

Learns the model based on new question-answer pairs.

* `newData` (Array): An array of objects containing additional question-answer pairs for learning.

`.saveModel(filename)`

Saves the current model to a file.

* `filename` (string): The name of the file to save the model to.

`.loadModel(filename)`

Loads a model from a file.

* `filename` (string): The name of the file to load the model from.
