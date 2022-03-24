class HelpMenu {
    constructor() {
        this.openButton = document.getElementById('help-menu-open');
        this.closeButton = document.getElementById('help-menu-close');
        this.htmlElement = document.getElementById('help-menu');

        this.registerEventListeners();
    }

    handleOpen() {
        this.openButton.style.display = 'none';
        this.htmlElement.style.display = 'block';
    }

    handleClose() {
        // TODO: Use animation end event to close the element
        this.openButton.style.display = 'grid';
        // this.htmlElement.style.display = 'none';
        this.animateClose();
    }

    animateClose() {
        this.htmlElement.animate([
            { 
                transform: 'translate(0, 0)',
                opacity: '1'
            },
            { 
                transform: 'translate(-20px, -20px)',
                opacity: '0'
            }
        ], {
            fill: 'forwards',
            duration: 1000
        })
    }

    registerEventListeners() {
        this.openButton.addEventListener('click', this.handleOpen.bind(this));
        this.closeButton.addEventListener('click', this.handleClose.bind(this));
    }
}

export default HelpMenu;