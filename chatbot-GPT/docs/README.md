# Chatbot Class Documentation

The `Chatbot` class represents a simple chatbot implementation that uses the `GPTModel` class to generate responses based on user input. The chatbot can be run in two modes: Read-Evaluate-Print Loop (REPL) mode for interactive command-line chat and API mode for serving responses over HTTP.

## Class: Chatbot

### Constructor

#### `Chatbot(data)`

Creates a new instance of the `Chatbot` class.

- `data` (Array): An array of objects containing question-answer pairs used to initialize the underlying GPTModel.

### Attributes

- `classifier` (GPTModel): An instance of the GPTModel class used for text classification and response generation.
- `rl` (readline.Interface): A `readline.Interface` instance for reading input from the command line in REPL mode.
- `context` (Array): An array to store the conversation context, including the user's input and the chatbot's response.

## Methods

### `classify(doc)`

Classifies the input document using the underlying GPTModel and generates a response.

- `doc` (string): The input document (user's message) to be classified.

Returns:
- A generated response as a string.

### `saveModel(filename)`

Saves the current GPTModel to a file.

- `filename` (string): The name of the file to save the model to.

### `loadModel(filename)`

Loads a GPTModel from a file.

- `filename` (string): The name of the file to load the model from.

### `REPLstart()`

Starts the chatbot in Read-Evaluate-Print Loop (REPL) mode for interactive command-line chat. The chatbot will repeatedly prompt the user for input and generate responses based on the GPTModel.

### `APIstart()`

Starts the chatbot in API mode, where it serves responses over HTTP. The chatbot creates an HTTP server on `localhost:3000` and handles API requests for generating responses based on the GPTModel. The chatbot provides a basic web page for testing the API and handling CORS headers.

**Note:** The API mode is marked as experimental and not recommended for production use.

# GPTModel Class Documentation

The `GPTModel` class represents a simple implementation of a Generative Pre-trained Transformer (GPT) language model. It generates responses based on question-answer pairs provided during initialization and learns from new data to improve the model.

## Class: GPTModel

### Constructor

#### `GPTModel(data)`

Creates a new instance of the `GPTModel` class.

- `data` (Array): An array of objects containing question-answer pairs used to create the GPT model.

### Attributes

- `data` (Array): An array of objects containing question-answer pairs used to create the GPT model.
- `model` (Object): The GPT model object generated based on the provided data. It is a dictionary where each key is a question word, and the corresponding value is an array of possible answer words.

## Methods

### `tokenizeText(text)`

Tokenizes the given text into an array of lowercase words.

- `text` (string): The text to tokenize.

Returns:
- An array of lowercase words extracted from the input text.

### `createGPTModel()`

Creates the GPT model based on the data provided in the constructor.

Returns:
- An object representing the GPT model with keys as question words and values as arrays of corresponding answer words.

### `generateResponse(question, length, context = '')`

Generates a response based on the input question and the desired length of the response.

- `question` (string): The input question for which a response needs to be generated.
- `length` (number): The desired length of the response (number of words).
- `context` (string, optional): Optional context to start the response generation. Defaults to an empty string.

Returns:
- A generated response as a string based on the input question and model.

### `learnModel(newData)`

Learns the model based on new data by adding the new question-answer pairs to the existing data and recreating the GPT model.

- `newData` (Array): An array of objects containing new question-answer pairs to be added to the model.

### `saveModel(filename)`

Saves the current GPT model to a file.

- `filename` (string): The name of the file to save the model to.

### `loadModel(filename)`

Loads a GPT model from a file.

- `filename` (string): The name of the file to load the model from.
