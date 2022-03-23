class RecordButton {
    constructor(htmlElement) {
        this.htmlElement = htmlElement;
        this.state = 'STOPPED';

        this.registerEventListeners();
    }

    handleClick() {
        if (this.state === 'STOPPED') {
            this.state = 'RECORDING';
        } else {
            this.state = 'STOPPED';
        }
        console.log(
            this.state
        )
        this.updateElement(this.state);
        this.updateText(this.state);
    }

    updateText(state) {
        if (state === 'RECORDING') {
            this.htmlElement.innerText = 'Recording';
        } else {
            this.htmlElement.innerText = 'Record';
        }
    }

    updateElement(state) {
        if (state === 'RECORDING') {
            this.htmlElement.setAttribute('recording', '');
        } else {
            this.htmlElement.removeAttribute('recording');
        }
    }

    registerEventListeners() {
        this.htmlElement.addEventListener(
            'click',
            this.handleClick.bind(this)
        );
    }
}

export default RecordButton;