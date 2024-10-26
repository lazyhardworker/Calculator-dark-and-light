function changeTheme(){
    document.body.classList.toggle("lightmode");
}
window.addEventListener("load", () => {
    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("lightmode");
        document.getElementById("check").checked = true;
    }
});

function changeTheme() {
    document.body.classList.toggle("lightmode");
    // Save theme choice
    if (document.body.classList.contains("lightmode")) {
        localStorage.setItem("theme", "light");
    } else {
        localStorage.setItem("theme", "dark");
    }
}

//display
let currentInput = "";      // The current number being typed
let previousInput = "";     // Stores the previous number (for calculations)
let operator = null;        // Stores the selected operator
let currentEquation = "";   // Stores the equation being formed

const display = document.querySelector(".display");

function updateDisplay() {
    display.textContent = currentEquation || "0";
}

function appendNumber(number) {
    if (number === "." && currentInput.includes(".")) return;
    currentInput += number;
    currentEquation += number; // Add the number to the equation string
    updateDisplay();
}

function chooseOperator(op) {
    if (currentInput === "") return; // Prevent setting an operator without a number
    if (previousInput !== "") {
        calculate(); // Calculate result if there's already a previous input
    }
    operator = op;
    previousInput = currentInput;
    currentInput = "";

    currentEquation += ` ${op} `; // Add operator to the equation string
    updateDisplay();
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case "+":
            result = prev + current;
            break;
        case "-":
            result = prev - current;
            break;
        case "*":
            result = prev * current;
            break;
        case "/":
            result = current === 0 ? "Error" : prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    currentEquation = currentInput;  // Reset equation to the result
    operator = null;
    previousInput = "";
    updateDisplay();
}

document.getElementById("equals").addEventListener("click", calculate);

function clearAll() {
    currentInput = "";
    previousInput = "";
    operator = null;
    currentEquation = "";
    updateDisplay();
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    currentEquation = currentEquation.slice(0, -1); // Update equation string
    updateDisplay();
}

document.getElementById("delete").addEventListener("click", deleteLast);
document.getElementById("square").addEventListener("click", squareNumber);

function squareNumber() {
    const num = parseFloat(currentInput);
    if (isNaN(num)) return;
    currentInput = (num * num).toString();
    currentEquation = currentInput;
    updateDisplay();
}
