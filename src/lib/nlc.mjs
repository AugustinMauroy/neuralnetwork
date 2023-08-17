import fs from 'node:fs';

class NaturalLanguageClassifier {
	constructor() {
	  // Initialize the classifier with empty data structures
	  this.documents = [];
	  this.features = new Set();
	  this.categories = new Set();
	  this.categoryCount = new Map();
	  this.featureCount = new Map();
	  this.featureProbabilities = new Map();
	  this.categoryProbabilities = new Map();
	}
  
	// Add a document to the classifier with the given category
	addDocument(document, category) {
	  this.documents.push({ document, category });
	  this.categories.add(category);
	  document.split(/\s+/).forEach(word => {
			this.features.add(word);
			const featureCountKey = `${word}:${category}`;
			this.featureCount.set(featureCountKey, (this.featureCount.get(featureCountKey) || 0) + 1);
	  });
	  this.categoryCount.set(category, (this.categoryCount.get(category) || 0) + 1);
	}
  
	// Train the classifier by calculating feature and category probabilities
	train() {
	  this.categories.forEach(category => {
			const documentsInCategory = this.documents.filter(doc => doc.category === category);
			const documentsNotInCategory = this.documents.filter(doc => doc.category !== category);
			const featureCountInCategory = this.countFeaturesInCategory(category);
			const featureCountNotInCategory = this.countFeaturesNotInCategory(category);
			const totalDocumentsInCategory = documentsInCategory.length;
			const totalDocumentsNotInCategory = documentsNotInCategory.length;
			this.features.forEach(feature => {
		  const featureCountKey = `${feature}:${category}`;
		  const featureCount = this.featureCount.get(featureCountKey) || 0;
		  const featureProbInCategory = (featureCount + 1) / (featureCountInCategory + this.features.size);
		  const featureProbNotInCategory = ((featureCountNotInCategory - featureCount) + 1) / (totalDocumentsNotInCategory - featureCountInCategory + this.features.size);
		  const featureProb = featureProbInCategory / (featureProbInCategory + featureProbNotInCategory);
		  const featureProbKey = `${feature}:${category}`;
		  this.featureProbabilities.set(featureProbKey, featureProb);
			});
			const categoryProb = totalDocumentsInCategory / this.documents.length;
			this.categoryProbabilities.set(category, categoryProb);
	  });
	}
  
	// Classify a document and return the most likely categories
	classify(document, context) {
		const processedInput = (context + ' ' + document).toLowerCase().replace(/[^\w\s]/gi, '');
		const words = processedInput.split(/\s+/);

		const probabilities = new Map();
		this.categories.forEach(category => {
			let prob = this.categoryProbabilities.get(category);
			words.forEach(word => {
				const featureProbKey = `${word}:${category}`;
				if (this.featureProbabilities.has(featureProbKey)) {
					prob *= this.featureProbabilities.get(featureProbKey);
				}
			});
			probabilities.set(category, prob);
		});

		const sortedProbs = Array.from(probabilities.entries()).sort((a, b) => b[1] - a[1]);
		const maxProb = sortedProbs[0][1];
		const threshold = 0.1; // Set a threshold for response selection
		const topCategories = sortedProbs.filter(entry => entry[1] >= maxProb * threshold);
		const responseCategories = topCategories.map(entry => entry[0]);

		// If the classifier is not confident, return a default response or ask for clarification.
		const ambiguous = responseCategories.length === 1 && maxProb < 0.5;
		return ambiguous ? 'I\'m not sure. Can you please provide more context?' : responseCategories;
	}
  
	// Count the number of times each feature appears in documents of the given category
	countFeaturesInCategory(category) {
	  let count = 0;
	  this.features.forEach(feature => {
			const featureCountKey = `${feature}:${category}`;
			count += this.featureCount.get(featureCountKey) || 0;
	  });
	  return count;
	}
  
	// Count the number of times each feature does not appear in documents of the given category
	countFeaturesNotInCategory(category) {
	  let count = 0;
	  this.features.forEach(feature => {
			const featureCountKey = `${feature}:${category}`;
			if (!this.featureCount.has(featureCountKey)) {
		  count += 1;
			}
	  });
	  return count;
	}

	loadModelFromFile(filePath) {
		const jsonData = fs.readFileSync(filePath, 'utf8');
		const modelData = JSON.parse(jsonData);
	
		this.documents = modelData.documents;
		this.features = new Set(modelData.features);
		this.categories = new Set(modelData.categories);
		this.categoryCount = new Map(modelData.categoryCount);
		this.featureCount = new Map(modelData.featureCount);
		// ... load other necessary data
	
		// Recalculate probabilities and other parameters as needed
		this.train();
	  }

	  saveModelToFile(filePath) {
		const modelData = {
		  documents: this.documents,
		  features: Array.from(this.features),
		  categories: Array.from(this.categories),
		  categoryCount: Array.from(this.categoryCount),
		  featureCount: Array.from(this.featureCount),
		  featureProbabilities: Array.from(this.featureProbabilities),
		  categoryProbabilities: Array.from(this.categoryProbabilities),
		};
	
		const jsonData = JSON.stringify(modelData, null, 2);
	
		// check if the file exists
		fs.writeFile(filePath, jsonData, (err) => {
			if (err) throw err;
		});
	  }

}
  
export default NaturalLanguageClassifier;
