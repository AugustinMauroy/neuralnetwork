import { DecisionTree } from '@augustinmauroy/neuralnetwork';

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
const tree = new DecisionTree(dataset, targetAttribute);

// Test the decision tree with some examples
const example1 = { outlook: 'sunny', temperature: 'hot', humidity: 'high', windy: 'false' };
const prediction1 = tree.predict(example1);

const example2 = { outlook: 'overcast', temperature: 'cool', humidity: 'normal', windy: 'false' };
const prediction2 = tree.predict(example2);

console.log(prediction1);
console.log(prediction2);
