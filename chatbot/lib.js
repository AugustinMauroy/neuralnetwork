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
		this.featureProb = new Map(); // Add this line to initialize the featureProb map
		this.categoryProb = new Map(); // You should also add this line to initialize the categoryProb map
	}

	addDocument(doc, category) {
		this.docs.push({ doc, category });
		this.categories.add(category);
		doc.split(' ').forEach(word => {
			this.features.add(word);
			const featureCountKey = `${word}:${category}`;
			if (this.featureCount.has(featureCountKey)) {
				this.featureCount.set(featureCountKey, this.featureCount.get(featureCountKey) + 1);
			} else {
				this.featureCount.set(featureCountKey, 1);
			}
		});
		if (this.categoryCount.has(category)) {
			this.categoryCount.set(category, this.categoryCount.get(category) + 1);
		} else {
			this.categoryCount.set(category, 1);
		}
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
				const featureCount = this.featureCount.has(featureCountKey) ? this.featureCount.get(featureCountKey) : 0;
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
		const probs = new Map();
		this.categories.forEach(category => {
			let prob = this.categoryProb.get(category);
			doc.split(' ').forEach(word => {
				const featureProbKey = `${word}:${category}`;
				if (this.featureProb.has(featureProbKey)) {
					prob *= this.featureProb.get(featureProbKey);
				}
			});
			probs.set(category, prob);
		});
		let maxProb = 0;
		let maxCategory = null;
		probs.forEach((prob, category) => {
			if (prob > maxProb) {
				maxProb = prob;
				maxCategory = category;
			}
		});
		return maxCategory;
	}

	featureCountInCategory(category) {
		let count = 0;
		this.features.forEach(feature => {
			const featureCountKey = `${feature}:${category}`;
			if (this.featureCount.has(featureCountKey)) {
				count += this.featureCount.get(featureCountKey);
			}
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

module.exports = natural;
