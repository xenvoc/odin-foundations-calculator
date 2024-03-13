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
let a = 3;
let b = 9;
let o = '*';
console.log(calc.operate(o, a, b));
a = 8;
b = 4;
o = '/';
console.log(calc.operate(o, a, b));
a = 8;
b = 0;
o = '/';
console.log(calc.operate(o, a, b));