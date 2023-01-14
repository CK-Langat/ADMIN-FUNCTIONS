


//BEGINING OF OUTPUTSTYLE CODE//

// const history = document.getElementById('history');



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
const submitfield1 = document.getElementById("submitfield")
const reject1 = document.getElementById("reject1")
let submited = false

let positioninput = document.getElementById("input2");
let positioninput1 = document.getElementById("input21");
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
    // console.log('selectionchange func called')

    //     if (document.activeElement.id !== 'input2') return;
    let select = 'selectionchange'


    // console.log(select, positioninput)
    // const range = window.getSelection().getRangeAt(0);
    // console.log('currently at', e.target.activeElement.id)
    const active = e.target.activeElement.id
    removeBlinkingCursor(active)
    const id = "#" + active
    const start = $(id)[0].selectionStart;;
    cursorPosition = start
    const end = $(id)[0].selectionEnd;;

    let inputSource = active == 'input1' ? input : input1


    const length = inputSource.value.length;
    // console.log("selection changed...")

    let currentOutput = null


    currentOutput = active == 'input1' ? positioninput : positioninput1
    inactiveOutput = active == 'input1' ? positioninput1 : positioninput

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
    if (end < length) {
        currentOutput.classList.add('noCaret');
    } else {
        currentOutput.classList.remove('noCaret');
    }
});

input.addEventListener('input', onInputFunc);
input.addEventListener('blur', hideCarret);
input.addEventListener('focus', onfocus);
input1.addEventListener('input', onInputFunc);
input1.addEventListener('keydown', onKeyDown);
input1.addEventListener('blur', hideCarret);
input1.addEventListener('focus', onfocus);
copyClick.addEventListener('click', copyToClipboard);
copyClick1.addEventListener('click', copyToClipboard);
reject1.addEventListener('click', function(){
    submited = false
    input.value = ''
    input1.value = ''
    positioninput.innerHTML = ''
    positioninput1.innerHTML = ''
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

    console.log(e)
    if (e.key == 'Enter' && origin == 'input11') {
        submitfield1.click()
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

    console.log(e)
    if (e.key == 'Enter' && origin == 'input11') {
        submitfield1.click()
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


function refresh(id) {

    removeBlinkingCursor(id)
    let outputToTarget = null
    outputToTarget = id == 'input1' ? positioninput : positioninput1
    inputSource = id == 'input1' ? input : input1

    inactiveOutput = id == 'input1' ? positioninput1 : positioninput
    inactiveOutput.classList.add('noCaret')

    outputToTarget.innerHTML = ''
    const inputText = inputSource.value
    // console.log({ inputText })
    for (let i = 0; i < inputText.length; i++) {
        var textspan = document.createElement("span");
        textspan.innerText = inputText[i]
        if (i == cursorPosition) {
            textspan.classList.add('black')
        }
        outputToTarget.appendChild(textspan)
    }

    const end = $(`#${id}`)[0].selectionEnd;;


    const length = inputSource.value.length;
    // console.log({ end, length })
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
    outputToTarget = id == 'input1' ? positioninput : positioninput1
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
    const id = e.target.id
    const outputWithData = id == 'copyclick' ? positioninput : positioninput1

    const text = outputWithData.textContent
    console.log('copying the following data: ', text)

    navigator.clipboard.writeText(text).then(function () {
        console.log('copied to clipboard: ', text)
        // The text has been successfully written to the clipboard
    }, function (err) {
        console.log('There was an error copyting text: ', err)
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
        target.scrollIntoView({block: 'start' })
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


const observer = new IntersectionObserver(async function(entries) {
  if (entries[0].isIntersecting) {
        console.log('disable scrolling')
        disableScroll()
        divscroll.scrollIntoView({ block: "end" });
        await new Promise(r => setTimeout(r, 500));
        console.log('enables scrolling')
        enableScroll()
       

  }
});

observer.observe(ender);



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
            console.log(slider)
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
        console.log({current, previous})
        document.getElementById(current).classList.add('active')
        document.getElementById(previous).classList.remove('active')
    }
    const prev = function () {
        let current = ''
        let previous = ''
        for (let i = 0; i < numSliders; i++) {
            const slider = state[i]
            if (!slider.active) continue
            console.log(slider)
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
      var notification = new Audio("https://od.lk/d/NjNfMjY2Njc3Mzdf/five.mpeg" );
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
      const redirectsound = document.getElementById("redirect");
      redirectsound.addEventListener("click", function () {
        rejectsound.play();
      });
      const proceed = document.getElementById("proceed");
      proceed.addEventListener("click", function () {
        acceptsound.play();
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

// let i = 0;
let counters = 1
let inputs2data = ""
let outputData = {}

inputs1.forEach((inp, index) => inp.oninput = function (e) {
  // If the entered input is valid, replace what's already in input
  // Else, retain what was there
  this.value = e.data ? e.data : this.value;
  // On delete key press, the this.value will be empty, hence
  // dont focus on next element
  if (this.value) {
    //console.log(this.id)
    if(index < inputs1.length - 1) inputs1[index + 1].focus()
    // inputs12data = inputs1[i+1].value
    outputData[this.id] = this.value
    refreshOutput()
  }
  // console.log(outputData)
})

function refreshOutput() {
    outputs.forEach(e => {
        //we are at 1c1 wanting to access 1c2
        const dataForInput = outputData[e.id.substring(0,2)+"1"]
        e.value = dataForInput ? dataForInput : ""
        // if (age>18) {issueID} else {sendHOme}
        // age>18 ? issueID : sendHome
        // console.log('this is output',e.id.substring(0,2)+"1","this is input", e.id)
    })
}


function keyPressedAuth(TB, e) {
  console.log(e.target.value)
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
 if (e.keyCode == 8) {
  // 1c1 or 1c2 -> ['1','1'] ['1','2']
  const elem = TB.split("b")[0]
    if (counters<1 && elem > 1) {
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

inputs1.forEach(function(input) {
    input.addEventListener('focus', activeState)
})

// Get all the children of the output container
const outputParents = $("#output_container").children();

// when active state is called
function activeState(e) {
    console.log("Changing the focus..")
    const id = e.target.id // 1c1

    // calculate the ID of the target output input
    const target = id.substring(0,2)+"2" // 1c2

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
            console.log("changing styles for ", target);
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



//END OF AUTH CODE//
