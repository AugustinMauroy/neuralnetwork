import fs from 'node:fs';

class GPTModel {
	/**
	 * Creates a new GPTModel instance.
	 * @param {Array} data - An array of objects containing question-answer pairs.
	 */
	constructor(data) {
	  this.data = data;
	  this.model = this.createGPTModel();
	}
  
	/**
	 * Tokenizes a given text into an array of lowercase words.
	 * @param {string} text - The text to tokenize.
	 * @returns {Array} An array of lowercase words.
	 */
	tokenizeText(text) {
	  return text.toLowerCase().split(/\s+/);
	}
  
	/**
	 * Creates a GPT model based on the data provided in the constructor.
	 * @returns {Object} A GPT model object.
	 */
	createGPTModel() {
	  const model = {};
  
	  this.data.forEach((entry) => {
			const questionWords = this.tokenizeText(entry.question);
			const answerWords = this.tokenizeText(entry.answer);
  
			for (let i = 0; i < questionWords.length; i++) {
		  const currentWord = questionWords[i];
		  const nextWord = answerWords[i];
		  if (!model[currentWord]) {
					model[currentWord] = [];
		  }
		  model[currentWord].push(nextWord);
			}
	  });
  
	  return model;
	}
  
	/**
	 * Generates a response based on the input question and desired length.
	 * @param {string} question - The input question.
	 * @param {number} length - The desired length of the response.
	 * @returns {string} The generated response.
	 */
	generateResponse(question, length, context = '') {
		if (!question || length < 1) {
		  throw new Error('Invalid input');
		}
	  
		const questionWords = this.tokenizeText(question);
		let currentWord = context || questionWords[0];
		let generatedText = currentWord;
	  
		for (let i = 0; i < length; i++) {
		  const nextWordOptions = this.model[currentWord];
		  if (!nextWordOptions || nextWordOptions.length === 0) break;
		  const nextIndex = Math.floor(Math.random() * nextWordOptions.length);
		  const nextWord = nextWordOptions[nextIndex];
		  generatedText += ' ' + nextWord;
		  currentWord = nextWord;
		}
	  
		return generatedText;
	  }
  
	/**
	 * Learns the model based on new data.
	 * @param {Array} newData - An array of objects containing question-answer pairs.
	 */
	learnModel(newData) {
	  this.data = this.data.concat(newData);
	  this.model = this.createGPTModel();
	}
  
	/**
	 * Saves the current model to a file.
	 * @param {string} filename - The name of the file to save the model to.
	 */
	saveModel(filename) {
	  const modelJSON = JSON.stringify(this.model);
	  fs.writeFileSync(filename, modelJSON);
	}
  
	/**
	 * Loads a model from a file.
	 * @param {string} filename - The name of the file to load the model from.
	 */
	loadModel(filename) {
	  const modelJSON = fs.readFileSync(filename);
	  this.model = JSON.parse(modelJSON);
	}
}

export default GPTModel;
