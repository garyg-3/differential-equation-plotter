class Equation {
    constructor(coefficients) {
        this.coefficients = coefficients;
        this.originalCoefficients = [...coefficients];
    }

    setCoefficient(index, value) {
        this.coefficients[index] = value;
    }

    incrementCoefficient(index) {
        this.coefficients[index]++;
    }

    decrementCoefficient(index) {
        this.coefficients[index]--;
    }

    reset() {
        for (let i = 0; i < this.coefficients.length; i++) {
            this.setCoefficient(i, this.originalCoefficients[i]);
        }
    }

    randomize(range) {
        for (let i = 0; i < this.coefficients.length; i++) {
            const randomCoefficient = Math.floor(range * (2*Math.random() - 1));
            this.setCoefficient(i, randomCoefficient);
        }
    }
}

export default Equation;