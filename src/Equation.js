class Equation {
    constructor(coefficients) {
        this.coefficients = coefficients;
    }

    incrementCoefficient(index) {
        this.coefficients[index]++;
    }

    decrementCoefficient(index) {
        this.coefficients[index]--;
    }
}

export default Equation;