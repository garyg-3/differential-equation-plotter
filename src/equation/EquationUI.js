class EquationUI {
    constructor(equation) {
        this.equation = equation;
        this.coefficientElements = document.querySelectorAll(".equation__coefficient");
        this.coefficientsIncrementers = document.querySelectorAll(".equation__coefficient-inc");
        this.coefficientsDecrementers = document.querySelectorAll(".equation__coefficient-dec");
        this.equationRandomizer = document.getElementById('button-randomise');
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

    handleRandomize() {
        this.equation.randomize(2);
        this.update();
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

        this.equationRandomizer.addEventListener('click', this.handleRandomize.bind(this));
    }
}

export default EquationUI;