

export default class Cursor {
    cursorHTML = null;
    interval;
    shadowBlur = 0;
    shadowSpread = 0;
    intervalObject = null;


    /**
     * Constructs a cursor which the HTML div element representing the cursor is created
     * @param {Number|String} width Width of the cursor. If it is number, it is inferred to be in px unit. Default to 3px
     * @param {String} color Color of the cursor. Any value that can be accepted in CSS rule. Default to black
     * @param {Number} interval The time in milliseconds for the cursor to blink. Default to 500ms
     */
    constructor(width = '3px', color = 'black', interval = 500) {
        this.cursorHTML = document.createElement('div');
        this.cursorHTML.style.margin = '0 .2em';
        this.interval = interval;
        this.setWidth( width );
        this.setColor( color );
    }


    /**
     * @returns The HTML element representing the cursor
     */
    getCursor = function() { return this.cursorHTML; };


    /**
     * Sets the width of the cursor
     * @param {Number|String} width The width of the cursor to set. If it is number, it is inferred to be in px unit
     */
    setWidth = function( width ) {
        if ( !Number(width) ) this.cursorHTML.style.width = width;
        else this.cursorHTML.style.width = `${width}px`; 
    };


    /**
     * @param {String} color Color of the cursor. Any value that can be accepted in CSS rule 
     */
    setColor = function( color ) { 
        this.cursorHTML.style.backgroundColor = color; 
        this.setGlow( this.shadowBlur, this.shadowSpread );     //   Since the color is reset, the shadow need to as well
    };


    /**
     * Sets the interval time for the cursor to blink
     * @param {Number} interval The time in milliseconds for the cursor to blink
     */
    setInterval = function( interval ) {
        stopIdle();
        this.interval = interval;
    }


    /**
     * Applies box shadow CSS to the cursor to simulate a glow effect
     * @param {Number} blur The amount of blur to be applied to box shadow. Defaults to 10px
     * @param {Number} spread The amount of spread to be applied to box shadow. Defaults to 3px
     */
    setGlow = function( blur=10, spread=3 ) {
        this.shadowBlur = blur;
        this.shadowSpread = spread;
        this.cursorHTML.style.boxShadow = `0 0 ${this.shadowBlur}px ${this.shadowSpread}px 
            ${this.cursorHTML.style.backgroundColor}`;
    }


    /**
     * Start blinking the cursor at interval time set
     */
    startIdle = function() {
        this.intervalObject = window.setInterval( () => {
            this.blink();
        }, this.interval);
    };


    /**
     * Stop blinking the cursor
     */
    stopIdle = function() { 
        clearInterval( this.intervalObject );
        this.cursorHTML.style.opacity = 1;
    }
    

    //  Helper methods
    blink = function() { 
        this.cursorHTML.style.opacity = ( Number(this.cursorHTML.style.opacity) + 1) % 2;
    }

}
