class CanvasRecorder {
    constructor(canvas) {
        this.canvas = canvas;
        this.state = 'STOPPED';
        this.videoStream = null;
        this.chunks = [];
        this.mediaRecorder = null;
    }

    createVideoStream() {
        console.log(this.canvas);
        this.videoStream = this.canvas.captureStream(60);
        this.mediaRecorder = new MediaRecorder(this.videoStream);
        this.mediaRecorder.ondataavailable = (event) => {
            this.chunks.push(event.data);
        }
        this.mediaRecorder.onstop = () => {
            const blob = new Blob(this.chunks, { type: 'video/mp4' });
            this.chunks = [];
            this.video = URL.createObjectURL(blob);
            window.open(this.video, '_blank').focus();
            console.log(this.video);
        }
    }

    startRecording() {
        this.state = 'RECORDING';
        this.createVideoStream();
        this.mediaRecorder.start();
    }

    stopRecording() {
        this.state = 'STOPPED';
        this.mediaRecorder.stop();
    }
}

export default CanvasRecorder;