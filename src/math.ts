function sigmoid(x: number) {

    return 1 / (1 + Math.exp(-x));

}

export = {
    sigmoid
};
