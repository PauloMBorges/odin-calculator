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

// This function saves the first operand and the operation to be performed, then clears the display for the next input
// Operator is a parameter so that when the desired operator button is clicked, an event listener will call the function with it
function setOperation(operator) {
    if (currentOperation !== null) {
        doOperation(); // If an operator is already set, compute the result first
    }
    firstOperand = displayValue; // Save the current display value (1st operand)
    currentOperation = operator; // Save operator 
    displayValue = ''; // Clear the display value for next number
}

// When the "=" button is clicked, this function calculates the result using the stored operator and operands, then updates the display.
function doOperation() {
    secondOperand = displayValue;
    displayValue = operate(firstOperand, secondOperand, currentOperation);
    currentOperation = null;
    updateDisplay();
}


// Event Listeners
document.querySelector('.clear').addEventListener('click', clearDisplay);
document.querySelectorAll('.operand').forEach(button => {
    button.addEventListener('click', () => populateOperand(button.textContent));
});
document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', () => setOperation(button.textContent))
});
document.querySelector('.equals').addEventListener('click', doOperation);