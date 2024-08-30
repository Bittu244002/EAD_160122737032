document.addEventListener("DOMContentLoaded", () => {
  const display = document.querySelector(".display p");
  const buttons = Array.from(document.querySelectorAll("button"));

  let currentInput = "";
  let operator = "";
  let previousValue = "";

  const updateDisplay = () => {
    display.textContent = currentInput || "";
  };

  const handleNumberClick = (value) => {
    currentInput += value;
    updateDisplay();
  };

  const handleOperatorClick = (op) => {
    if (currentInput === "") return;
    if (previousValue !== "") {
      currentInput = calculate(previousValue, currentInput, operator);
    }
    operator = op;
    previousValue = currentInput;
    currentInput = "";
    updateDisplay();
  };

  const handleEqualClick = () => {
    if (previousValue !== "" && currentInput !== "") {
      currentInput = calculate(previousValue, currentInput, operator);
      operator = "";
      previousValue = "";
      updateDisplay();
    }
  };

  const handleClearClick = () => {
    currentInput = "";
    operator = "";
    previousValue = "";
    updateDisplay();
  };

  const handleToggleSignClick = () => {
    if (currentInput !== "") {
      currentInput = (parseFloat(currentInput) * -1).toString();
      updateDisplay();
    }
  };

  const handlePercentageClick = () => {
    if (currentInput !== "") {
      currentInput = (parseFloat(currentInput) / 100).toString();
      updateDisplay();
    }
  };
  const calculate = (a, b, op) => {
    const num1 = parseFloat(a);
    const num2 = parseFloat(b);

    switch (op) {
      case "+":
        return (num1 + num2).toString();
      case "-":
        return (num1 - num2).toString();
      case "X":
        return (num1 * num2).toString();
      case "/":
        return (num1 / num2).toString();
      default:
        return b;
    }
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.textContent;
      if ((value >= "0" && value <= "9") || value === ".") {
        handleNumberClick(value);
      } else if (value === "AC") {
        handleClearClick();
      } else if (value === "+/-") {
        handleToggleSignClick();
      } else if (value === "%") {
        handlePercentageClick();
      } else if (value === "=") {
        handleEqualClick();
      } else {
        handleOperatorClick(value);
      }
    });
  });
});
