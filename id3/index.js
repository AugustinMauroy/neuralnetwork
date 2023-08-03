import { id3, predict } from './lib.js';

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
