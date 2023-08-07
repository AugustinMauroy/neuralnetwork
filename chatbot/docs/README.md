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

##### `REPLstart()`

The `REPLstart()` method starts the chatbot in a REPL (Read-Eval-Print Loop) mode. The method prompts the user for input and responds with a classification result. The method uses the readline interface to prompt the user for input and the `classify()` method to classify the input document. The method also stores the conversation context in an array and limits the context to a reasonable number of interactions.

##### `APIstart()`

The `APIstart()` method starts the chatbot in an API mode. The method creates an HTTP server that listens for incoming requests. The method handles two types of requests: a GET request to the root URL that returns an HTML page with a form to submit input, and a GET request to the `/api` URL that expects a query parameter `input` with the input to classify. The method responds with a JSON object that contains the input and the classification result.

#### `saveModel(filePath)`

The `saveModel()` method saves the trained classifier to a file. The filePath parameter is the path to the file where the classifier should be saved.

#### `loadModel(filePath)`

The `loadModel()` method loads a trained classifier from a file. The filePath parameter is the path to the file where the classifier is saved.

### Dependencies

The chatbot class depends on the following libraries:

* `node:readline`: A built-in Node.js module that provides an interface for reading input from the command line.
* `node:http`: A built-in Node.js module that provides an interface for creating HTTP servers.
* `node:fs`: A built-in Node.js module that provides an interface for working with the file system.
* [`./natural.js`](#naturaljs): A custom module that exports the natural library.

## `naturel.js`

### `NaturalLanguageClassifier` Class

#### `constructor()`

The constructor method initializes the `NaturalLanguageClassifier` instance by creating empty data structures to store the documents, features, categories, and counts needed for the classifier.

#### `addDocument(document, category)`

The `addDocument()` method adds a document to the classifier with the specified category. The `document` parameter is the text document to be added, and the `category` parameter is the category to which the document belongs.

#### `train()`

The `train()` method trains the classifier with the documents that have been added using the `addDocument()` method. The method calculates the probability of each feature in each category and stores the probabilities in the `featureProbabilities` map and the category probabilities in the `categoryProbabilities` map.

#### `classify(document, context)`

The `classify()` method classifies the input document into one or more categories using the trained classifier. The `document` parameter is the input text document to be classified, and the optional `context` parameter can provide additional context if needed. The method returns an array of categories that the input document likely belongs to.

#### `featureCountInCategory(category)`

The `featureCountInCategory()` method returns the total count of features in the specified category. It takes the `category` parameter as input and returns the count of features present in documents belonging to that category.

#### `featureCountNotInCategory(category)`

The `featureCountNotInCategory()` method returns the total count of features that are not present in the specified category. It takes the `category` parameter as input and returns the count of features not found in documents belonging to that category.

#### `loadModelFromFile(filePath)`

The `loadModelFromFile()` method loads the classifier's model data from a file specified by the `filePath`. It reads the JSON data containing the classifier's documents, features, categories, category counts, feature counts, feature probabilities, and category probabilities. After loading the data, the classifier is ready for classification without requiring further training.

#### `saveModelToFile(filePath)`

The `saveModelToFile()` method saves the classifier's model data to a file specified by the `filePath`. It creates a JSON representation of the classifier's documents, features, categories, category counts, feature counts, feature probabilities, and category probabilities, and writes this data to the specified file.

Note: The `loadModelFromFile()` and `saveModelToFile()` methods are useful for persisting the classifier's trained model to disk, allowing it to be reused without retraining whenever the application is restarted.


### Dependencies

The BayesClassifier class does not have any external dependencies.
