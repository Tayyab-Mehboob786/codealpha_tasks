let display = document.getElementById('result');

function appendToDisplay(value) {
    display.value += value;
}

function clearScreen() {
    display.value = '';
}

function calculate() {
    try {
        // Replace × with * and ÷ with / for evaluation
        let expression = display.value.replace(/×/g, '*').replace(/÷/g, '/');
        display.value = eval(expression);
    } catch (error) {
        display.value = 'Error';
    }
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (/[0-9\.\+\-\*\/]/.test(key)) {
        appendToDisplay(key);
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Escape') {
        clearScreen();
    } else if (key === 'Backspace') {
        display.value = display.value.slice(0, -1);
    } else if (key.toLowerCase() === 'c') {
        clearScreen();
    }
});