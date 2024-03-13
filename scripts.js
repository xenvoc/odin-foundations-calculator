function Calculator() {
    this.methods = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => {
            if (!b) return `Well we can't divide by that can we`;
            else return a / b;
            },
    };
    this.operate = function(op, a, b) {
        return this.methods[op](a, b);
    }

}

const calc = new Calculator();
let a = null;
let b = null;
let o = null;
const buffer = document.querySelector('#buffer');

function nullVars () {
    a = null;
    b = null;
    o = null;
}

function clearBuffer() {
    nullVars();
    buffer.value = '';
}
