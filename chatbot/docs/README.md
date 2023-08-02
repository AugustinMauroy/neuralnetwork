# Chat bot documentation

## `ChatBot.js`

This is a JavaScript class definition for a chatbot. The chatbot uses the natural language processing library natural to classify user input into categories. The chatbot stores the conversation context in an array and limits the context to a reasonable number of interactions. The chatbot prompts the user for input and responds with a classification result. The chatbot also handles errors that may occur during processing.

### Class Methods

The constructor method initializes the chatbot by creating a `natural.BayesClassifier()` instance, a readline interface, and an empty array to store the conversation context.

#### `constructor()`

The constructor method initializes the chatbot by creating a `natural.BayesClassifier()` instance, a readline interface, and an empty array to store the conversation context.

#### `addDocument(doc, category)`

The `addDocument()` method adds a document to the classifier with the specified category. The doc parameter is the document to be added, and the category parameter is the category to which the document belongs.

#### `train()`

The `train()` method trains the classifier with the documents that have been added using the `addDocument()` method.

#### `classify(doc)`

The `classify()` method classifies the input document into a category using the trained classifier. The doc parameter is the input document to be classified. The method returns the category that the input document belongs to.

##### `start()`

The `start()` method starts the chatbot by prompting the user for input and responding with a classification result. The method uses the readline interface to prompt the user for input and the `classify()` method to classify the input document. The method also stores the conversation context in an array and limits the context to a reasonable number of interactions.

### Helper Functions

#### `textColor(colorCode, text)`

The `textColor()` function takes a color code and a text string as parameters and returns the text string with the specified color. The colorCode parameter is the ANSI color code to be applied to the text, and the text parameter is the text string to be colored.

### Dependencies

The chatbot class depends on the following libraries:

* `node:readline`: A built-in Node.js module that provides an interface for reading input from the command line.
* [`./natural.js`](#naturaljs): A custom module that exports the natural library.

## `natural.js`

This is a JavaScript module that exports a `BayesClassifier` class. The `BayesClassifier` class is used for training and classifying documents using the Naive Bayes algorithm.

### `BayesClassifier` Class

#### `constructor()`

The constructor method initializes the `BayesClassifier` instance by creating empty arrays, sets, and maps to store the documents, features, categories, and counts.

#### `addDocument(doc, category)`

The `addDocument()` method adds a document to the classifier with the specified category. The doc parameter is the document to be added, and the category parameter is the category to which the document belongs.

#### `train()`

The `train()` method trains the classifier with the documents that have been added using the `addDocument()` method. The method calculates the probability of each feature in each category and stores the probabilities in a map.

#### `classify(doc)`

The `classify()` method classifies the input document into a category using the trained classifier. The doc parameter is the input document to be classified. The method returns an array of categories that the input document belongs to.

#### `featureCountInCategory(category)`

The `featureCountInCategory()` method returns the total count of features in the specified category.

#### `featureCountNotInCategory(category)`

The `featureCountNotInCategory()` method returns the total count of features that are not in the specified category.

### Dependencies

The BayesClassifier class does not have any external dependencies.
