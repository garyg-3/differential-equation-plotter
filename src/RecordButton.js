import CanvasRecorder from "./CanvasRecorder.js";

class RecordButton {
    constructor(htmlElement) {
        this.htmlElement = htmlElement;
        this.state = 'STOPPED';
        this.canvasRecorder = new CanvasRecorder(
            document.getElementById('canvas')
        );
        this.recordingInterval = null;
        this.recordingTextStates = ['Recording.', 'Recording..', 'Recording...'];
        this.activeRecordingTextState = 0;

        this.registerEventListeners();
    }

    handleClick() {
        if (this.state === 'STOPPED') {
            this.state = 'RECORDING';
            this.canvasRecorder.startRecording();
            this.playRecordingDotsAnimation();
        } else {
            this.state = 'STOPPED';
            this.canvasRecorder.stopRecording();
            this.stopRecordingDotsAnimation();
        }
        console.log(
            this.state
        )
        this.updateElement(this.state);
        this.updateText(this.state);
    }

    updateText(state) {
        if (state === 'RECORDING') {
            this.htmlElement.innerText = this.recordingTextStates[this.activeRecordingTextState];
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

    incrementRecordingTextState() {
        this.activeRecordingTextState
            = (this.activeRecordingTextState + 1) % this.recordingTextStates.length;
    }

    playRecordingDotsAnimation() {
        this.recordingInterval = setInterval(() => {
            this.incrementRecordingTextState();
            this.updateText(this.state);
        }, 1000);
    }

    stopRecordingDotsAnimation() {
        clearInterval(this.recordingInterval);
    }

    registerEventListeners() {
        this.htmlElement.addEventListener(
            'click',
            this.handleClick.bind(this)
        );
    }
}

export default RecordButton;