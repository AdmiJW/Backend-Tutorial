
import Cursor from './Cursor.js';

const LEFT_ALIGN = 'flex-start';
const CENTER_ALIGN = 'center';
const RIGHT_ALIGN = 'flex-end';

class TextBox {
    textboxHTML;
    currentLineHTML;
    currentTextNode;
    cursorObject;
    fontSize;
    alignment;
    typingSpeed;

    constructor( divHTML, fontSize='1rem', alignment=LEFT_ALIGN, typingSpeed=400 ) {
        this.fontSize = fontSize;
        this.alignment = alignment;
        this.textboxHTML = divHTML;
        this.typingSpeed = 60000 / typingSpeed; //  Convert typing speed (CPM) into milliseconds per char
        this.createLine();
        this.cursorObject = new Cursor();

        divHTML.appendChild( this.currentLineHTML );    //      Attach the first Line
        this.currentLineHTML.appendChild( this.cursorObject.getCursor() );      //  Attach the cursor
        this.cursorObject.startIdle();
    };


    appendChar( char ) {
        this.cursorObject.stopIdle();
        this.currentTextNode.textContent += char;
        this.cursorObject.startIdle();
    }

    appendText( text ) {
        let idx = 0;
        let interval = setInterval(() => {
            if (idx >= text.length) {
                clearInterval(interval);
                return;
            }
            this.appendChar( text.charAt(idx++) );
        }, this.typingSpeed);
    }


    //=====================
    //  Helper methods
    //=====================
    createLine = function() {
        this.currentLineHTML = document.createElement('p');
        this.currentTextNode = document.createTextNode('');
        this.currentLineHTML.appendChild( this.currentTextNode );

        this.currentLineHTML.style.fontSize = this.fontSize;
        this.currentLineHTML.style.minHeight = this.fontSize;
        this.currentLineHTML.style.display = 'flex';
        this.currentLineHTML.style.justifyContent = this.alignment;
        this.currentLineHTML.style.whiteSpace = 'pre';
    }

}

document.addEventListener('DOMContentLoaded',()=> {

    console.dir( document.querySelector('#cmd') )

    const div = document.querySelector('#cmd');
    const txtbox = new TextBox(div);

    txtbox.appendText("Hello    World!!!");

});