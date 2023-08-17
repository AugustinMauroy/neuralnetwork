# ID3 Decision Tree

The **ID3 Decision Tree** is an implementation of the ID3 algorithm for constructing decision trees in JavaScript. It builds a decision tree based on a given dataset and target attribute.

## Classes and Functions

### Class: DecisionTreeNode

Represents a node in the decision tree.

#### Constructor

Creates a new instance of the DecisionTreeNode class.

```js
new DecisionTreeNode(attribute, value, branches, classification)
```

* `attribute` (string): The attribute associated with the node.
* `value` (string): The attribute value associated with the node.
* `branches` (Array<[string, DecisionTreeNode]>): The branches of the node, where each branch is a value-node pair.
* `classification` (string): The classification of the node if it is a leaf node.

### Class: DecisionTree
Represents the decision tree.

#### Constructor

Creates a new instance of the DecisionTree class.

```js
new DecisionTree(dataset, targetAttribute)
```

* `dataset` (Array`<object>`): The dataset used to build the tree.
* `targetAttribute` (string): The attribute to predict.

#### Methods

.buildTree(examples, attributes, targetAttribute)

Builds the decision tree recursively using the ID3 algorithm.

* `examples` (Array`<object>`): The dataset for the current node.
* `attribute`s (string[]): The attributes available for splitting.
* `targetAttribute` (string): The target attribute to predict.
* Returns: A DecisionTreeNode representing the root of the decision tree.

`.predict(example)`

Predicts the classification of an example using the decision tree.

* `example` (object): The example to predict.
* Returns: The predicted classification.

### Function: id3

Constructs a decision tree using the ID3 algorithm.

* `dataset` (Array`<object>`): The dataset to build the tree from.
* `targetAttribute` (string): The attribute to predict.
* Returns: A DecisionTree instance.

### Function: entropy

Calculates the entropy of a dataset.
Entropy is a measure of the amount of uncertainty in a dataset. The higher the entropy, the more uncertain the dataset is.

* examples (Array<object>): The dataset to calculate entropy for.
* targetAttribute (string): The attribute to predict.
* Returns: The entropy value.

### Function: predict

Predicts the classification using a decision tree.

* `example` (object): The example to predict.
* `tree` (DecisionTreeNode): The decision tree to use.
* Returns: The predicted classification.
