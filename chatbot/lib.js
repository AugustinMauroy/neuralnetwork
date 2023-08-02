class natural {
	static BayesClassifier() {
		return new BayesClassifier();
	}
}

class BayesClassifier {
	constructor() {
		this.docs = [];
		this.features = new Set();
		this.categories = new Set();
		this.categoryCount = new Map();
		this.featureCount = new Map();
		this.featureProb = new Map();
		this.categoryProb = new Map();
	}

	addDocument(doc, category) {
		this.docs.push({ doc, category });
		this.categories.add(category);
		doc.split(/\s+/).forEach(word => {
			this.features.add(word);
			const featureCountKey = `${word}:${category}`;
			this.featureCount.set(featureCountKey, (this.featureCount.get(featureCountKey) || 0) + 1);
		});
		this.categoryCount.set(category, (this.categoryCount.get(category) || 0) + 1);
	}

	train() {
		this.categories.forEach(category => {
			const docsInCategory = this.docs.filter(doc => doc.category === category);
			const docsNotInCategory = this.docs.filter(doc => doc.category !== category);
			const featureCountInCategory = this.featureCountInCategory(category);
			const featureCountNotInCategory = this.featureCountNotInCategory(category);
			const totalDocsInCategory = docsInCategory.length;
			const totalDocsNotInCategory = docsNotInCategory.length;
			this.features.forEach(feature => {
				const featureCountKey = `${feature}:${category}`;
				const featureCount = this.featureCount.get(featureCountKey) || 0;
				const featureProbInCategory = (featureCount + 1) / (featureCountInCategory + this.features.size);
				const featureProbNotInCategory = ((featureCountNotInCategory - featureCount) + 1) / (totalDocsNotInCategory - featureCountInCategory + this.features.size);
				const featureProb = featureProbInCategory / (featureProbInCategory + featureProbNotInCategory);
				const featureProbKey = `${feature}:${category}`;
				this.featureProb.set(featureProbKey, featureProb);
			});
			const categoryProb = totalDocsInCategory / this.docs.length;
			this.categoryProb.set(category, categoryProb);
		});
	}

	classify(doc) {
		const processedInput = doc.toLowerCase().replace(/[^\w\s]/gi, '');
		const words = processedInput.split(/\s+/);

		const probs = new Map();
		this.categories.forEach(category => {
			let prob = this.categoryProb.get(category);
			words.forEach(word => {
				const featureProbKey = `${word}:${category}`;
				if (this.featureProb.has(featureProbKey)) {
					prob *= this.featureProb.get(featureProbKey);
				}
			});
			probs.set(category, prob);
		});

		const sortedProbs = Array.from(probs.entries()).sort((a, b) => b[1] - a[1]);
		const maxProb = sortedProbs[0][1];
		const threshold = 0.1; // Set a threshold for response selection
		const topCategories = sortedProbs.filter(entry => entry[1] >= maxProb * threshold);
		const responseCategories = topCategories.map(entry => entry[0]);

		// If the classifier is not confident, return a default response or ask for clarification.
		const ambiguous = responseCategories.length === 1 && maxProb < 0.5;
		return ambiguous ? 'I\'m not sure. Can you please provide more context?' : responseCategories;
	}

	featureCountInCategory(category) {
		let count = 0;
		this.features.forEach(feature => {
			const featureCountKey = `${feature}:${category}`;
			count += this.featureCount.get(featureCountKey) || 0;
		});
		return count;
	}

	featureCountNotInCategory(category) {
		let count = 0;
		this.features.forEach(feature => {
			const featureCountKey = `${feature}:${category}`;
			if (!this.featureCount.has(featureCountKey)) {
				count += 1;
			}
		});
		return count;
	}
}

export default natural;
