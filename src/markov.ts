import fs from 'fs';

class MarkovModel {

    data: Array<{ question: string; answer: string }>;
    model: Record<string, string[]>;
    constructor(data: Array<{ question: string; answer: string }>) {

        this.data = data;
        this.model = this.createMarkovModel();
    
    }

    tokenizeText(text: string): string[] {

        return text.toLowerCase().split(/\s+/);
    
    }

    createMarkovModel(): Record<string, string[]> {

        const model: Record<string, string[]> = {};

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

    generateResponse(question: string, length: number, context = ''): string {

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

    learnModel(newData: Array<{ question: string; answer: string }>): void {

        this.data = this.data.concat(newData);
        this.model = this.createMarkovModel();
    
    }

    saveModel(filename: string): void {

        const modelJSON = JSON.stringify(this.model);
        fs.writeFileSync(filename, modelJSON);
    
    }

    loadModel(filename: string): void {

        const modelJSON = fs.readFileSync(filename, 'utf8');
        this.model = JSON.parse(modelJSON);
    
    }

}

export default MarkovModel;
