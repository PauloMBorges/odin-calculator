let displayValue = '0';
let firstOperand = null;
let secondOperand = null;
let currentOperation = null;

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
    display.textContent = displayValue; 
}

updateDisplay();

function clearDisplay() {
    displayValue = '0';
    firstOperand = null;
    secondOperand = null;
    currentOperation = null;
    updateDisplay();
}

function populateOperand(operand) {
    if (displayValue === '0' && operand === '0') {
        return;
    } else if (displayValue === '0' && operand !== '0') {
        displayValue = operand; 
    } else {
        displayValue += operand;
    }
    updateDisplay();
}

// Event Listeners
document.querySelector('.clear').addEventListener('click', clearDisplay);
document.querySelectorAll('.operand').forEach(button => {
    button.addEventListener('click', () => populateOperand(button.textContent));
});

