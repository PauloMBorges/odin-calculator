let displayValue = 0;

const display = document.getElementById("display");

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b) {
    if (b === 0) return "Math ERROR"
    return a / b;
}

function operate(a, b, op) {
    a = Number(a);
    b = Number(b);
    switch(op) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return null;
    }
}

function updateDisplay() {
    display.innerText = displayValue; 
}

updateDisplay();