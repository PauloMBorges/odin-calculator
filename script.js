let displayValue = '0';
let firstOperand = null;
let secondOperand = null;
let currentOperation = null;
let isResultDisplayed = false; // Flag to track if the result is being displayed

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
    let result;
    switch(op) {
        case '+':
            result = add(a, b);
            break;
        case '-':
            result = subtract(a, b);
            break;
        case '*':
            result = multiply(a, b);
            break;
        case '/':
            result = divide(a, b);
            break;
        default:
            return null; 
    }

     // Check if the result is a number before calling toFixed
    if (typeof result === "number") {
        return Number(result.toFixed(5));
    } else {
        // If result is not a number, just return it (in case of "Math ERROR")
        return result;
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
    if (isResultDisplayed) {
        if (operand === '.') {
            displayValue = '0.'; // Start with "0." if result is displayed and '.' is clicked
        } else {
            clearDisplay();
            displayValue = operand; // Start fresh with the new number if a result is displayed
        }
        isResultDisplayed = false; // Reset the flag since new input begins
        updateDisplay();
        return; // Exit to avoid appending additional characters in this transaction
    }
    
    // Decimal point logic
    if (operand === '.') {
        if (displayValue.includes('.')) {
            return; // Prevent adding more than one decimal point
        }
        if (displayValue === '') {
            displayValue = '0.'; // Start with "0." if display is empty
        } else if (!displayValue.includes('.')) {
            displayValue += '.'; // Only add decimal if there isn't one already
        }
    } else {
        if (displayValue === '0' && operand === '0') {
            return; // Prevent multiple leading zeroes
        } else if (displayValue === '0.' && operand !== '0') {
            displayValue += operand; // Append number to "0."
        } else if (displayValue === '0' && operand !== '0') {
            displayValue = operand; // Replace leading zero if no decimal has been added
        } else {
            displayValue += operand; // Append number
        }
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
    isResultDisplayed = false; // Reset the flag
}

// When the "=" button is clicked, this function calculates the result using the stored operator and operands, then updates the display.
function doOperation() {
    if (!currentOperation) return // Exit if '=' is clicked without an operation set

    // if no second operand is set, secondOperand = firstOperand (works the same as iphone's calculator)
    if(displayValue === '') {
        secondOperand = firstOperand;
    // else, stores the displayValue to secondOperand and proceds to the operation normally
    } else {
        secondOperand = displayValue;
    }

    displayValue = operate(firstOperand, secondOperand, currentOperation);
    currentOperation = null;
    isResultDisplayed = true;
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