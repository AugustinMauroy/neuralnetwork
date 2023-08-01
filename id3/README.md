# Decision Tree Learning with ID3 Algorithm

This code implements the ID3 algorithm for decision tree learning in JavaScript. The ID3 algorithm is a popular algorithm for building decision trees from a dataset of examples with known classifications. The decision tree can then be used to predict the classification of new examples.

## Usage

To use the code, you need to provide a dataset and a target attribute to train the decision tree. You can then use the predict function to predict the target attribute for new examples.

## Here's an example usage

```js
// Example dataset
const dataset = [
  { outlook: 'sunny', temperature: 'hot', humidity: 'high', windy: 'false', play: 'no' },
  { outlook: 'sunny', temperature: 'hot', humidity: 'high', windy: 'true', play: 'no' },
  { outlook: 'overcast', temperature: 'hot', humidity: 'high', windy: 'false', play: 'yes' },
  { outlook: 'rainy', temperature: 'mild', humidity: 'high', windy: 'false', play: 'yes' },
  { outlook: 'rainy', temperature: 'cool', humidity: 'normal', windy: 'false', play: 'yes' },
  { outlook: 'rainy', temperature: 'cool', humidity: 'normal', windy: 'true', play: 'no' },
  { outlook: 'overcast', temperature: 'cool', humidity: 'normal', windy: 'true', play: 'yes' },
  { outlook: 'sunny', temperature: 'mild', humidity: 'high', windy: 'false', play: 'no' },
  { outlook: 'sunny', temperature: 'cool', humidity: 'normal', windy: 'false', play: 'yes' },
  { outlook: 'rainy', temperature: 'mild', humidity: 'normal', windy: 'false', play: 'yes' },
  { outlook: 'sunny', temperature: 'mild', humidity: 'normal', windy: 'true', play: 'yes' },
  { outlook: 'overcast', temperature: 'mild', humidity: 'high', windy: 'true', play: 'yes' },
  { outlook: 'overcast', temperature: 'hot', humidity: 'normal', windy: 'false', play: 'yes' },
  { outlook: 'rainy', temperature: 'mild', humidity: 'high', windy: 'true', play: 'no' },
];

// Target attribute
const targetAttribute = 'play';

// Train the decision tree with the dataset
const attributes = Object.keys(dataset[0]).filter(attribute => attribute !== targetAttribute);
const tree = id3(dataset, attributes, targetAttribute);

// Test the decision tree with some examples
const example1 = { outlook: 'sunny', temperature: 'hot', humidity: 'high', windy: 'false' };
const prediction1 = predict(example1, tree);

const example2 = { outlook: 'overcast', temperature: 'cool', humidity: 'normal', windy: 'false' };
const prediction2 = predict(example2, tree);
```

### Classes and Functions

The code defines the following classes and functions:

`DecisionTreeNode`
A class representing a node in the decision tree. Each node has an attribute being tested, a value of the attribute that leads to the node, child nodes (branches), and a classification (if it's a leaf node).

`id3(examples, attributes, targetAttribute)`
A function that implements the ID3 algorithm for decision tree learning. It takes a dataset of examples, a list of attributes to test, and a target attribute to predict. It returns a decision tree that can be used to predict the target attribute for new examples.

`entropy(examples)`
A function that calculates the entropy of a dataset of examples. The entropy is a measure of the impurity of the dataset with respect to the target attribute.

`predict(example, tree)`
A function that predicts the target attribute for a new example using a decision tree. It takes an example object and a decision tree, and returns the predicted target attribute.
