# Chatbot Class Documentation

The `Chatbot` class is a simple chatbot implementation in JavaScript. It uses a Natural Language Classifier to understand user input and respond accordingly. The class provides methods to add training documents, train the classifier, and classify user inputs. Additionally, it supports two modes of interaction: a Read-Eval-Print Loop (REPL) mode for interactive console-based conversations and an API mode for serving responses over HTTP.

## Class: Chatbot

### Constructor

#### `Chatbot()`

Creates a new instance of the `Chatbot` class. Initializes the Natural Language Classifier and sets up a Readline interface for console interaction.

### Instance Methods

#### `addDocument(doc, category)`

Adds a training document to the Natural Language Classifier for a given category.

- `doc` (string): The text of the training document.
- `category` (string): The category label associated with the training document.

#### `train()`

Trains the Natural Language Classifier with the added training documents.

#### `classify(doc)`

Classifies a user input using the trained Natural Language Classifier and returns the chatbot's response category.

- `doc` (string): The user's input to be classified.

Returns:
- A string representing the chatbot's response category based on the input.

#### `saveModel(filePath)`

Saves the trained model of the Natural Language Classifier to a file.

- `filePath` (string): The path to the file where the model will be saved.

#### `loadModel(filePath)`

Loads a previously saved model of the Natural Language Classifier from a file.

- `filePath` (string): The path to the file containing the saved model.

#### `REPLstart()`

Starts the chatbot in REPL mode for interactive console-based conversations. The chatbot will continuously prompt the user for input and provide responses until the user exits the REPL.

#### `APIstart()`

Starts the chatbot in API mode for serving responses over HTTP. It sets up an HTTP server listening on port 3000. The API accepts input queries as HTTP GET requests with the `input` query parameter. The chatbot responds with the classification result in JSON format.

**Note**: The `APIstart` method is marked as experimental and not recommended for production use.

# NaturalLanguageClassifier Class Documentation

The `NaturalLanguageClassifier` class is a simple implementation of a Naive Bayes classifier for natural language processing. It allows you to add training documents with associated categories, train the classifier to calculate feature and category probabilities, and classify new documents based on their likelihood of belonging to different categories.

## Class: NaturalLanguageClassifier

### Constructor

#### `NaturalLanguageClassifier()`

Creates a new instance of the `NaturalLanguageClassifier` class. Initializes the classifier with empty data structures.

### Instance Methods

#### `addDocument(document, category)`

Adds a training document to the classifier with the given category.

- `document` (string): The text of the training document.
- `category` (string): The category label associated with the training document.

#### `train()`

Trains the classifier by calculating feature and category probabilities based on the added training documents.

#### `classify(document, context)`

Classifies a document and returns the most likely categories it belongs to.

- `document` (string): The text of the document to be classified.
- `context` (string): The context to be considered along with the document during classification.

Returns:
- An array of strings representing the most likely categories for the document.

#### `loadModelFromFile(filePath)`

Loads a previously saved model of the classifier from a file.

- `filePath` (string): The path to the file containing the saved model.

#### `saveModelToFile(filePath)`

Saves the trained model of the classifier to a file.

- `filePath` (string): The path to the file where the model will be saved.

### Helper Methods

These methods are used internally by the `NaturalLanguageClassifier` class.

#### `countFeaturesInCategory(category)`

Counts the number of times each feature appears in documents of the given category.

- `category` (string): The category for which feature counts are calculated.

Returns:
- The count of features in the specified category.

#### `countFeaturesNotInCategory(category)`

Counts the number of times each feature does not appear in documents of the given category.

- `category` (string): The category for which feature counts are calculated.

Returns:
- The count of features not present in the specified category.
