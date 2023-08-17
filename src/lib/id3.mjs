class DecisionTreeNode {
	constructor(attribute, value, branches, classification) {
		this.attribute = attribute;
		this.value = value;
		this.branches = branches;
		this.classification = classification;
	}
}

class DecisionTree {
	constructor(dataset, targetAttribute) {
		this.dataset = dataset;
		this.targetAttribute = targetAttribute;
		this.attributes = Object.keys(dataset[0]).filter(attribute => attribute !== targetAttribute);
		this.tree = this.buildTree(dataset, this.attributes, targetAttribute);
	}

	buildTree(examples, attributes, targetAttribute) {
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
			const informationGain = entropy(examples, targetAttribute) - entropies.reduce((sum, e) => sum + e, 0);
			return informationGain;
		});
		const bestAttributeIndex = informationGains.reduce((bestIndex, gain, index) => gain > informationGains[bestIndex] ? index : bestIndex, 0);
		const bestAttribute = attributes[bestAttributeIndex];

		// Create a new decision tree node with the best attribute and its branches
		const values = new Set(examples.map(example => example[bestAttribute]));
		const branches = Array.from(values, value => {
			const subset = examples.filter(example => example[bestAttribute] === value);
			const subtree = this.buildTree(subset, attributes.filter(attribute => attribute !== bestAttribute), targetAttribute);
			return [value, subtree];
		});
		return new DecisionTreeNode(bestAttribute, null, branches, null);
	}

	predict(example) {
		return predict(example, this.tree);
	}
}

function id3(dataset, targetAttribute) {
	const tree = new DecisionTree(dataset, targetAttribute);
	return tree;
}

function entropy(examples, targetAttribute) {
	const counts = {};
	for (const example of examples) {
		const classification = example[targetAttribute];
		counts[classification] = (counts[classification] || 0) + 1;
	}
	const probabilities = Object.values(counts).map(count => count / examples.length);
	const entropy = probabilities.reduce((sum, p) => sum - p * Math.log2(p), 0);
	return entropy;
}

function predict(example, tree) {
	if (tree.classification !== null) {
		return tree.classification;
	}
	const value = example[tree.attribute];
	const subtree = tree.branches.find(branch => branch[0] === value)[1];
	return predict(example, subtree);
}

export { id3, DecisionTree };
