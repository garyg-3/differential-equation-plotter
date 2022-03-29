class Canvas {

    constructor(canvasID) {
        this.element = document.getElementById(canvasID);
        if (!this.element) {
            throw new Error(`Could not get HTML canvas element with id ${canvasID}`);
        }

        this.context = this.element.getContext("2d");
        this.transparency = 0.1;
        this.resize();
        this.resizeObserver = new ResizeObserver(this.resize.bind(this));
        this.resizeObserver.observe(this.element);
        this.setupPosition();
    }

    resize() {
        const { width, height } = this.element.getBoundingClientRect();
        this.width = this.element.width = width;
        this.height = this.element.height = height;
        this.setupPosition();
    }

    getDimensions() {
        return {
            width: this.width,
            height: this.height
        };
    }

    getMaxDimension() {
        return Math.max(this.height, this.width);
    }

    setupPosition() {
        this.context.translate(
            Math.floor(this.width/2),
            Math.floor(this.height/2)
        );
    }

    clear() {
        this.context.fillStyle = `rgba(0, 0, 0, ${this.transparency})`; // Creates trajectory motion blur
        this.context.fillRect(-this.width, -this.height, 2 * this.width, 2 * this.height);
    }

    reset() {
        this.context.fillStyle = "black";
        this.context.fillRect(-this.width, -this.height, 2 * this.width, 2 * this.height);
    }
}

export default Canvas;