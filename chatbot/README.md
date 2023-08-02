# Naive Bayes Classifier Chatbot

This is a simple chatbot built using a Naive Bayes classifier in JavaScript. The chatbot is trained on a small dataset of questions and answers related to the weather.

## Usage

To start the chatbot, run the following command:

```bash
# You nedd to be on root of this repo
npm run chatbot
```

This will start a REPL (Read-Eval-Print Loop) interface where you can input questions and receive answers from the chatbot.

## How it works

The chatbot uses a Naive Bayes classifier to classify input questions into categories. The categories in this case are the possible answers to the questions related to the weather. The classifier is trained on a small dataset of questions and answers related to the weather.

The chatbot preprocesses the input questions by converting them to lowercase and removing any non-alphanumeric characters. The preprocessed questions are then classified using the Naive Bayes classifier.

## Docs

If you want to have an better knowing of the project take a look at the [docs](./docs/README.md).
