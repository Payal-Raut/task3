// script.js

let display = document.getElementById('display');
let currentInput = '';
let previousInput = '';
let operator = '';

function appendNumber(number) {
    if (currentInput === '' && number === '.') {
        currentInput = '0.';
    } else {
        currentInput += number;
    }
    updateDisplay();
}

function appendOperator(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '';
    updateDisplay();
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operator = '';
    updateDisplay();
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

function calculate() {
    if (currentInput === '' || previousInput === '') return;
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }
    currentInput = result.toString();
    operator = '';
    previousInput = '';
    updateDisplay();
}

function updateDisplay() {
    display.innerText = previousInput + ' ' + operator + ' ' + currentInput || '0';
}

function toggleSign() {
    if (currentInput) {
        currentInput = (parseFloat(currentInput) * -1).toString();
    } else if (previousInput && !currentInput && !operator) {
        previousInput = (parseFloat(previousInput) * -1).toString();
    }
    updateDisplay();
}
function appendParenthesis() {
    if (openParenthesesCount === 0 || expression.slice(-1).match(/[\+\-\*\/\(]$/)) {
        if (currentInput) {
            expression += currentInput + ' * ';
            currentInput = '';
        }
        expression += '(';
        openParenthesesCount++;
    } else if (openParenthesesCount > 0 && currentInput) {
        expression += currentInput + ')';
        currentInput = '';
        openParenthesesCount--;
    } else if (openParenthesesCount > 0) {
        expression += ')';
        openParenthesesCount--;
    }
    updateDisplay();
}