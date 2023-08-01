// Define the decision tree node class
class DecisionTreeNode {
	constructor(attribute, value, branches, classification) {
		this.attribute = attribute; // The attribute being tested at this node
		this.value = value; // The value of the attribute that leads to this node
		this.branches = branches; // The child nodes of this node
		this.classification = classification; // The classification at this node (if it's a leaf node)
	}
}
  
// Define the ID3 algorithm function
function id3(examples, attributes, targetAttribute) {
	// If all examples have the same classification, return a leaf node with that classification
	const classifications = new Set(examples.map(example => example[targetAttribute]));
	if (classifications.size === 1) {
		return new DecisionTreeNode(null, null, null, classifications.values().next().value);
	}

	// If there are no attributes left to test, return a leaf node with the majority classification
	if (attributes.length === 0) {
		const counts = {};
		for (const example of examples) {
			const classification = example[targetAttribute];
			counts[classification] = (counts[classification] || 0) + 1;
		}
		const classification = Object.entries(counts).reduce((a, b) => a[1] > b[1] ? a : b)[0];
		return new DecisionTreeNode(null, null, null, classification);
	}

	// Choose the attribute with the highest information gain
	const informationGains = attributes.map(attribute => {
		const values = new Set(examples.map(example => example[attribute]));
		const subsets = Array.from(values, value => examples.filter(example => example[attribute] === value));
		const entropies = subsets.map(subset => {
			const counts = {};
			for (const example of subset) {
				const classification = example[targetAttribute];
				counts[classification] = (counts[classification] || 0) + 1;
			}
			const probabilities = Object.values(counts).map(count => count / subset.length);
			const entropy = probabilities.reduce((sum, p) => sum - p * Math.log2(p), 0);
			return entropy * subset.length / examples.length;
		});
		const informationGain = entropy(examples) - entropies.reduce((sum, e) => sum + e, 0);
		return informationGain;
	});
	const bestAttributeIndex = informationGains.reduce((bestIndex, gain, index) => gain > informationGains[bestIndex] ? index : bestIndex, 0);
	const bestAttribute = attributes[bestAttributeIndex];

	// Create a new decision tree node with the best attribute and its branches
	const values = new Set(examples.map(example => example[bestAttribute]));
	const branches = Array.from(values, value => {
		const subset = examples.filter(example => example[bestAttribute] === value);
		const subtree = id3(subset, attributes.filter(attribute => attribute !== bestAttribute), targetAttribute);
		return [value, subtree];
	});
	return new DecisionTreeNode(bestAttribute, null, branches, null);
}
  
// Define the entropy function
function entropy(examples) {
	const counts = {};
	for (const example of examples) {
		const classification = example[targetAttribute];
		counts[classification] = (counts[classification] || 0) + 1;
	}
	const probabilities = Object.values(counts).map(count => count / examples.length);
	const entropy = probabilities.reduce((sum, p) => sum - p * Math.log2(p), 0);
	return entropy;
}
  
// Define the predict function
function predict(example, tree) {
	if (tree.classification !== null) {
		return tree.classification;
	}
	const value = example[tree.attribute];
	const subtree = tree.branches.find(branch => branch[0] === value)[1];
	return predict(example, subtree);
}
  

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

console.log(prediction1);
console.log(prediction2);
