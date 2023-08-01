const readline = require('readline');

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

// Collect data
const data = [
	{ question: 'What\'s the weather like today?', answer: 'It\'s sunny and warm.' },
	{ question: 'Will it rain tomorrow?', answer: 'Yes, there\'s a chance of rain tomorrow.' },
	{ question: 'What\'s the temperature in New York?', answer: 'It\'s currently 75 degrees in New York.' },
	{ question: 'Is it going to be hot this weekend?', answer: 'Yes, it\'s going to be very hot this weekend.' },
	{ question: 'What\'s the weather in Belgium?', answer: 'It\'s raining.' },
	{ question: 'Will it rain tomorrow in Belgium?', answer: 'Yes, it\'s will rain cad and dog.' },
	{ question: 'What are the best places to visit in Paris?', answer: 'Some of the best places to visit in Paris are the Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral.' },
	{ question: 'What time does the train to London depart?', answer: 'The train to London departs at 9:30 AM.' },
	{ question: 'How do I get to the nearest airport?', answer: 'You can take a taxi or use public transportation to get to the nearest airport.' },
	{ question: 'What\'s the capital of Japan?', answer: 'The capital of Japan is Tokyo.' },
	{ question: 'What\'s the population of India?', answer: 'As of my last update in 2021, the population of India is approximately 1.366 billion.' },
	{ question: 'Hi', answer: 'Hi! How are you?' },
	{ question: 'Hello', answer: 'Hello world!' },
	{ question: 'Hey', answer: 'Hey there! How can I assist you?' },
	{ question: 'How are you', answer: 'I\'m an AI, so I don\'t have feelings, but thanks for asking! How can I help you today?' },
	{ question: 'What\'s your name', answer: 'I\'m just an AI language model, so I don\'t have any name.' },
	{ question: 'Who created you', answer: 'I was created by Augustin Mauroy.' },
	{ question: 'Tell me a joke', answer: 'Sure, here\'s one: Why don\'t scientists trust atoms? Because they make up everything!' },
	{ question: 'What is the meaning of life', answer: 'The meaning of life is a complex philosophical question with no definitive answer. Different people and cultures have different perspectives on it.' },
	{ question: 'What is NOT the capital of France?', answer: 'The capital of France is Paris.' },
	{ question: 'What\'s the weather like in California?', answer: 'California has a diverse climate. In some regions, it\'s sunny and warm, while others may experience cooler temperatures.' },
	{ question: 'Tell me a fun fact about dogs.', answer: 'Dogs have an exceptional sense of smell, which makes them excellent sniffers for various purposes, including search and rescue.' },
	{ question: 'What is 12 times 17?', answer: 'The result of 12 multiplied by 17 is 204.' },
	{ question: 'When was the first computer invented?', answer: 'The first computer was invented in the 1940s.' },
	{ question: 'How can I lose weight?', answer: 'Weight loss involves a combination of a balanced diet, regular exercise, and a healthy lifestyle.' },
	{ question: 'What\'s the best way to learn a new language?', answer: 'The most effective way to learn a new language is through immersion and regular practice.' },
];

// Preprocess the data
const preprocessedData = data.map(item => {
	return {
		input: item.question,
		output: item.answer
	};
});

// Train the chatbot
const classifier = natural.BayesClassifier();
preprocessedData.forEach(item => {
	classifier.addDocument(item.input, item.output);
});
classifier.train();

// Create the readline interface
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

// REPL utilities
const textColor = (colorCode, text) => `\x1b[${colorCode}m${text}\x1b[0m`;

// Define the REPL prompt
const prompt = () => {
	rl.question(textColor(32, '[You]: '), input => {
		const processedInput = input.toLowerCase().replace(/[^\w\s]/gi, '');
		const output = classifier.classify(processedInput);
		console.log(`${textColor(31, '[Chatbot]:')} ${output}`);
		prompt();
	});
};

// Start the REPL
prompt();
