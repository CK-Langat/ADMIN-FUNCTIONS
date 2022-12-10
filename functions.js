



// const history = document.getElementById('history');
const input = document.getElementById('input1');
let positioninput = document.getElementById("input2");
const cursor = document.getElementById('cursor');
let cursorPosition = -1
function focusAndMoveCursorToTheEnd(e) {
    input.focus();


    const range = document.createRange();
    const selection = window.getSelection();
    const { childNodes } = input;
    const lastChildNode = childNodes && childNodes.length - 1;

    range.selectNodeContents(lastChildNode === -1 ? input : childNodes[lastChildNode]);
    range.collapse(false);

    selection.removeAllRanges();
    selection.addRange(range);
}

function handleCommand(command) {
    const line = document.createElement('DIV');

    line.textContent = `C:\\WIKIPEDIA > ${command}`;

    // history.appendChild(line);
}

// Every time the selection changes, add or remove the .noCursor
// class to show or hide, respectively, the bug square cursor.
// Note this function could also be used to enforce showing always
// a big square cursor by always selecting 1 chracter from the current
// cursor position, unless it's already at the end, in which case the
// #cursor element should be displayed instead.
document.addEventListener('selectionchange', (e) => {
    //     if (document.activeElement.id !== 'input2') return;
    let select = 'selectionchange'


    // console.log(select, positioninput)
    const range = window.getSelection().getRangeAt(0);
    const start = $('#input1')[0].selectionStart;;
    cursorPosition = start
    const end = $('#input1')[0].selectionEnd;;


    const length = input.value.length;
    console.log("selection changed...")


    let temp = ""
    for (let i = 0; i < positioninput.children.length; i++) {
        // if(start == positioninput.children.length){
        // continue
        // }
        if (i == start || (start != end && (i < end && i >= start))) {
            temp += `<span class="black">${positioninput.children[i].textContent}</span>`
            // positioninput.children[i].classList.add('black')
            // console.log(positioninput.children[i].textContent)
        }
        else {
            temp += `<span>${positioninput.children[i].textContent}</span>`
            // positioninput.children[i].classList.remove('black')

        }

    }
    positioninput.innerHTML = temp
    if (end < length) {
        positioninput.classList.add('noCaret');
    } else {
        positioninput.classList.remove('noCaret');
    }
});

input.addEventListener('input', (e) => {
    // If we paste HTML, format it as plain text and break it up
    // input individual lines/commands:
    refresh()
    // If we press delete key, re-render the output
    // so that it reflects the current state of the 
    // input
    // also check if we are deleting backwards or
    // deleteing forwards
    if (e.inputType.match('delete')) {
        if (cursorPosition > 0 && e.inputType == 'deleteContentBackward') {
            cursorPosition--
        }
        refresh()
    }
    if (input.childElementCount > 0) {
        const lines = input.innerText.replace(/\n$/, '').split('\n');
        const lastLine = lines[lines.length - 1];

        for (let i = 0; i <= lines.length - 2; ++i) {
            handleCommand(lines[i]);
        }

        input.textContent = lastLine;

        focusAndMoveCursorToTheEnd();
    }

    // If we delete everything, display the square caret again:
    if (input.value === 0) {
        input.classList.remove('noCaret');
        positioninput.classList.remove('noCaret');
    }
});

document.addEventListener('keydown', (e) => {
    // If some key is pressed outside the input, focus it and move the cursor
    // to the end:
    // if (e.target !== input) focusAndMoveCursorToTheEnd();
});

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();

        handleCommand(input.textContent);
        input.textContent = '';
        focusAndMoveCursorToTheEnd();
    }
});

// Set the focus to the input so that you can start typing straigh away:
input.focus();


function refresh() {


    positioninput.innerHTML = ''
    const inputText = input.value
    console.log({ inputText })
    for (let i = 0; i < inputText.length; i++) {
        var textspan = document.createElement("span");
        textspan.innerText = inputText[i]
        if (i == cursorPosition) {
            textspan.classList.add('black')
        }
        positioninput.appendChild(textspan)
    }

    const end = $('#input1')[0].selectionEnd;;


    const length = input.value.length;
    console.log({ end, length })
    if (end < length) {
        console.log('removing carret')
        positioninput.classList.add('noCaret');
        input.classList.add('noCaret');
    } else {
        positioninput.classList.remove('noCaret');
        input.classList.remove('noCaret');
    }
    console.log('Refreshed..')
    //console.log({length:positioninput.children.length})

}






