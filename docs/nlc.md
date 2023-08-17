# Natural Language Classifier

The **Natural Language Classifier** is an implementation of a simple text classification system based on the Naive Bayes algorithm in JavaScript. It can be used to classify text documents into predefined categories.

## Class: NaturalLanguageClassifier

Represents a simple natural language classifier.

### Constructor

Creates a new instance of the NaturalLanguageClassifier class.

```js
new NaturalLanguageClassifier()
```

### Methods

`.addDocument(document, category)`

Adds a document to the classifier with the given category.

* `document` (string): The text content of the document.
* `category` (string): The category of the document.

`.train()`

Trains the classifier by calculating feature and category probabilities.

.classify(document, context)

* `document` (string): The text content of the document to classify.
* `context` (string): Additional context for better classification accuracy.
* Returns: An array of predicted categories for the input document.

`.loadModelFromFile(filePath)`

Loads the classifier's model data from a JSON file.

* `filePath` (string): The path to the JSON file containing the model data.

`.saveModelToFile(filePath)`

Saves the classifier's model data to a JSON file.

* `filePath` (string): The path to the JSON file to save the model data.
