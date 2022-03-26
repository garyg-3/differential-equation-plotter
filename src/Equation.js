class Equation {
    constructor(coefficients) {
        this.coefficients = coefficients;
        this.coefficientsIncrementers = document.querySelectorAll(".equation__coefficient-inc");
        this.coefficientsDecrementers = document.querySelectorAll(".equation__coefficient-dec");

        this.registerEventListeners();
    }

    handleDecrement(index) {
        this.coefficients[index]--;
        console.log(this.coefficients);
    }

    handleIncrement(index) {
        this.coefficients[index]++;
        console.log(this.coefficients);
    }

    registerEventListeners() {
        this.coefficientsIncrementers.forEach((element, index) => {
            element.addEventListener('click', () => {
                this.handleIncrement(index);
            });
        })
        this.coefficientsDecrementers.forEach((element, index) => {
            element.addEventListener('click', () => {
                this.handleDecrement(index);
            });
        })
    }
}

export default Equation;