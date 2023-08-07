# Natural Language Chatbot

This project implements a simple natural language chatbot that can be trained on a set of preprocessed data and then used to classify user input into specific categories. The chatbot can be run in two different modes:

1. REPL Mode: In this mode, the chatbot operates as a command-line interface, where users can interact with the chatbot by typing in their queries, and the chatbot responds with the most likely category or asks for clarification if it's unsure.
2. API Mode (Experimental): In this mode, the chatbot operates as an HTTP server, exposing an API to receive user input and respond with the most likely category. The API accepts input through the URL query parameter input, and the response is returned in JSON format.

## Getting Started

To run the chatbot you need to modify the `index.js` to uncomment the desired mode and comment the other one. Then, you can run the chatbot with the following command:

```bash
# in the root of this repository
npm run chatbot
```

## Technical Docs

To learn more about the chatbot, check out the [technical documentation](./docs/README.md).
