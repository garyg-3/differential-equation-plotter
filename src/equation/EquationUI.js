class EquationUI {
    constructor(equation) {
        this.equation = equation;
        this.coefficientElements = document.querySelectorAll(".equation__coefficient");
        this.coefficientsIncrementers = document.querySelectorAll(".equation__coefficient-inc");
        this.coefficientsDecrementers = document.querySelectorAll(".equation__coefficient-dec");
        this.registerEventListeners();
    }

    handleDecrement(index) {
        this.equation.decrementCoefficient(index);
        this.coefficientElements[index].innerText = this.equation.coefficients[index];
        console.log(this.coefficients);
    }

    handleIncrement(index) {
        this.equation.incrementCoefficient(index);
        this.coefficientElements[index].innerText = this.equation.coefficients[index];
        console.log(this.coefficients);
    }

    update() {
        this.coefficientElements.forEach((element, index) => {
            element.innerText = this.equation.coefficients[index];
        })
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

export default EquationUI;