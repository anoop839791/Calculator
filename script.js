let current = "";
let previous = "";
let operator = null;

const currentDisplay = document.getElementById("current");
const previousDisplay = document.getElementById("previous");

function updateDisplay() {
    currentDisplay.innerText = current || "0";

    if (operator && previous !== "") {
        previousDisplay.innerText = `${previous} ${getOperatorSymbol(operator)}`;
    } else {
        previousDisplay.innerText = "";
    }
}

function appendValue(value) {
    if (value === "." && current.includes(".")) {
        return;
    }

    if (value === "%" && current !== "") {
        current = String(parseFloat(current) / 100);
    } else {
        current += value;
    }

    updateDisplay();
}

function chooseOperator(selectedOperator) {
    if (current === "" && previous === "") {
        return;
    }

    if (current !== "") {
        if (previous !== "") {
            calculate();
        }

        previous = current;
        current = "";
    }

    operator = selectedOperator;
    updateDisplay();
}

function calculate() {
    if (previous === "" || current === "" || operator === null) {
        return;
    }

    const num1 = parseFloat(previous);
    const num2 = parseFloat(current);

    let result;

    switch (operator) {
        case "+":
            result = num1 + num2;
            break;

        case "-":
            result = num1 - num2;
            break;

        case "*":
            result = num1 * num2;
            break;

        case "/":
            if (num2 === 0) {
                current = "Error";
                previous = "";
                operator = null;
                updateDisplay();
                return;
            }

            result = num1 / num2;
            break;
    }

    current = String(result);
    previous = "";
    operator = null;

    updateDisplay();
}

function clearDisplay() {
    current = "";
    previous = "";
    operator = null;

    updateDisplay();
}

function deleteNumber() {
    current = current.slice(0, -1);

    updateDisplay();
}

function getOperatorSymbol(operator) {
    switch (operator) {
        case "+":
            return "+";

        case "-":
            return "−";

        case "*":
            return "×";

        case "/":
            return "÷";

        default:
            return "";
    }
}


// Keyboard Support
document.addEventListener("keydown", function (event) {

    const key = event.key;

    if (!isNaN(key) || key === ".") {
        appendValue(key);
    }

    if (key === "+") {
        chooseOperator("+");
    }

    if (key === "-") {
        chooseOperator("-");
    }

    if (key === "*") {
        chooseOperator("*");
    }

    if (key === "/") {
        chooseOperator("/");
    }

    if (key === "Enter" || key === "=") {
        calculate();
    }

    if (key === "Escape") {
        clearDisplay();
    }

    if (key === "Backspace") {
        deleteNumber();
    }

});