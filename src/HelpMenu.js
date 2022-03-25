const fadeInAnimation = [
    { 
        transform: 'translate(0, 0)',
        opacity: '1'
    },
    { 
        transform: 'translate(-20px, -20px)',
        opacity: '0'
    }
];

class HelpMenu {
    constructor() {
        this.openButton = document.getElementById('help-menu-open');
        this.closeButton = document.getElementById('help-menu-close');
        this.htmlElement = document.getElementById('help-menu');
        this.isOpen = false;

        this.registerEventListeners();
    }

    handleOpen() {
        this.openButton.style.display = 'none';
        this.htmlElement.style.display = 'block';
        this.animateOpen();
    }

    handleClose() {
        this.openButton.style.display = 'grid';
        this.animateClose();
    }

    async animateClose() {
        const animation = this.htmlElement.animate(fadeInAnimation, {
            duration: 1000
        })
        await animation.finished;
        this.handleAnimationEnd();
    }

    async animateOpen() {
        const animation = this.htmlElement.animate(fadeInAnimation, {
            direction: 'reverse',
            duration: 1000
        })
        await animation.finished;
        this.handleAnimationEnd();
    }

    handleAnimationEnd() {
        if (this.isOpen) {
            this.htmlElement.style.display = 'none';
            this.isOpen = false;
        } else {
            this.isOpen = true;
        }
    }

    registerEventListeners() {
        this.openButton.addEventListener('click', this.handleOpen.bind(this));
        this.closeButton.addEventListener('click', this.handleClose.bind(this));
        this.htmlElement.addEventListener('animationend', this.handleAnimationEnd.bind(this));
    }
}

export default HelpMenu;