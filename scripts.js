function Calculator() {
    this.methods = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => {
            if (!b) return `Well we can't divide by that can we`;
            else return a / b;
            },
        '^': (a, b) => math.pow(a, b),
    };
    this.operate = function(op, a, b) {
        neg = false;
        operationHappened = true;
        let result = this.methods[op](a, b)
        lastOperation = op;
        lastB = b;
        if (typeof(result) === 'number') return Number(result.toFixed(2 + Number(dot)));
        else return result;
    }
}

const calc = new Calculator();
let a = null;
let b = null;
let o = null;
let dot = null;
const buffer = document.querySelector('#buffer');
// used to see if typing Numbers should reset rather than append a
// if true, a will reset upon adding a num
let operationHappened = false;
// saved for repeating last operation on = key press
let lastOperation = null;
let lastB = null;
// current number being added is < 0
let neg = false;

function nullVars () {
    a = null;
    b = null;
    o = null;
    operationHappened = false;
    dot = null;
    neg = false;
}

function clearBuffer() {
    nullVars();
    setBuffer('');
}


function appendNum(num) {
    if (operationHappened && o === null || typeof(a) !== 'number') clearBuffer();
    if (a !== null && o && b === null) buffer.value += ' ';
    if (dot) {
        if (a !== null && o !== null) {
            if (!neg && (b === null || b >= 0)) b += num * 10**(-dot);
            else b -= num * 10**(-dot);


        } 
        else {
            if (!neg && (a === null || a >= 0)) a += num * 10**(-dot);
            else a -= num * 10**(-dot);
        }
        dot++;
    } else {
        if (a !== null & o !== null) {
            if (b === 0) removeBufferSymbols(1);
            if (b === null || b >= 0) b = 10*b + +num;
            else b = 10*b - +num;

        }
        else { 
            if (a === 0) removeBufferSymbols(1);
            if (a === null || a >= 0) a = 10*a + +num;
            else a = 10*a - +num;
        }
    }
    appendBuffer(num);
}

function setBuffer(fstr) {
    buffer.value = fstr;
}

function appendBuffer(str) {
    if (a && o && b === null) buffer.value += str;
    else buffer.value += str;
}

function resetBufferWithAAndO() {
    setBuffer('');
    if (a === 0 && neg) appendBuffer('-');
    appendBuffer(a + ' ' + o);
}

function opClick(fo) {
    if (typeof(a) !== 'number') a = 0;
    if (a != null) {
        if (o && b !== null) {
            a = calc.operate(o, a, b);
            b = null;
        }
        o = fo;
        if (dot) {
            a = Number(a.toFixed(dot+2))
        }
        resetBufferWithAAndO();
    }
    dot = null;
}

function equals() {
    /*
    possibilities:
    (1) nothing
    (2) a 
    (3) a o
    (4) a o b
    */
   if (typeof(a) !== 'number') a = 0;
   dot = null;
   if (o !== null) {
    if (b === null) {
        a = calc.operate(o, a, a);
        o = null;
    } else {
        a = calc.operate(o, a, b);
        o = null;
        b = null;
    }
   setBuffer(a);
   } else if (lastOperation) {
        if (typeof(a)=== 'number') a = calc.operate(lastOperation, a, lastB);
        else a = calc.operate(lastOperation, 0, lastB);
        setBuffer(a);
   }
}

function addDot() {
   if (!dot) {
   // only do something if dot isn't there
    if (a === NaN || typeof(a) !== 'number') {
        // (1): buffer has no numbers
        a = 0;
        setBuffer(a);
        enableAndDisplayDot();
    } else if (b === null) {
        // (2: a !operationHappened) && (3 a operationHappened) & (4 a o)
        if (o === null) {
            // (2: a !operationHappened) && (3 a operationHappened):
            if (!operationHappened) {
                setBuffer(a);
                enableAndDisplayDot();
            } else {
                clearBuffer();
                a = 0;
                setBuffer(a);
                enableAndDisplayDot();
            }
        } else {
            // (4: a o)
            b = 0;
            appendBuffer(' ' + b);
            dot = 1;
            enableAndDisplayDot();
        }
    } else {
    // (5: a o b)
    enableAndDisplayDot();
   }
    }
}

//
function enableAndDisplayDot() {
    dot = 1;
    appendBuffer('.');
}

function backspace() {
    if (typeof(a) !== 'number') clearBuffer();
    // (0) if operationHappened & only a:(uncertain about this; check empirically):
    // do nothing
    if (a !== null && o === null) {
        if (!operationHappened) {
            a = backspaceNum(a);
        }
    } else if (b !== null) {
        b = backspaceNum(b);
    }
    // (3) a o
    // do nothing

}

function backspaceNum(num) {
    if (dot === null) {
        // two options:
        //(4) a o b
        //(1) a & op hasn't happened
        removeBufferSymbols(1);
        if (!o && Math.abs(a) >= 0 && Math.abs(a) < 10) setBuffer(0);
        else if (o && Math.abs(b) >= 0 && Math.abs(b) < 10) {
            if (b < 0) removeBufferSymbols(1);
            appendBuffer(0);
        } 


        if (num >= 0) return Math.floor(num/10);
        else return Math.ceil(num/10);
    } else if (b === null) {
        //(2) a. & op hasn't happened
        if (dot === 1 && Math.abs(a) < 1) {
            setBuffer(0);
        } else removeBufferSymbols(1);
        return backspaceDotNum(num);
    } else {
        //(5) a o b.
        if (dot === 1 && Math.abs(b) < 1) {
            resetBufferWithAAndO();
            appendBuffer (' ' + 0);
        } else removeBufferSymbols(1);
        return backspaceDotNum(num);
    } 
}

function backspaceDotNum (num) {
    dot--;
    if (dot < 1) dot = null;
    if (dot !== null) {
        num = num.toFixed(dot);
         return parseFloat(num.toString().slice(0, -1));
    } else {
        neg = false;
        if (b === null) {

        }
        return num;
    } 
}

function removeBufferSymbols(n) {
    if (buffer.value.length > n) setBuffer(buffer.value.slice(0, -n));
    else setBuffer('');
}

function plusMinus() {
    if (typeof(a) !== 'number') clearBuffer();
    if (a !== null && o === null) {
        neg = !neg;
        a = -a;
        if (dot !== null) a = Number(a.toFixed((2 + dot))); 
        setBufferToOnlyA();
    } else if (b !== null) {
        neg = !neg;
        b = -b;
        if (dot !== null) b = Number(b.toFixed((2 + dot))); 
        resetBufferWithAAndO();
        appendB();

    }
}

function setBufferToOnlyA() {
    setBuffer('');
    if (neg && a === 0) appendBuffer('-');
    appendBuffer(a);
    if (dot !== null) 
    {
        if (!buffer.value.includes('.')) appendBuffer('.');
        let lackingZeroesCount = buffer.value.lastIndexOf('.') + dot - buffer.value.length; 
        for (let i = 0; i < lackingZeroesCount; i++) appendBuffer(0);
    }
}

function appendB () {
    appendBuffer(' ');
    if (neg && b === 0) appendBuffer('-');
    appendBuffer(b);
    if (dot !== null) {
        if (!buffer.value.split(' ')[2].includes('.')) appendBuffer('.');
        let lackingZeroesCount = buffer.value.lastIndexOf('.') + dot - buffer.value.length; 
        for (let i = 0; i < lackingZeroesCount; i++) appendBuffer(0);
    } 
}