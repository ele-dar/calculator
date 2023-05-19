const resultDisplay = select(".display-result");
const formulaDisplay = select(".display-formula");
const keys = selectAll(".key");
const numberKeys = keys.filter(
  (key) =>
    !key.classList.contains(["key-clear"]) &&
    !key.classList.contains(["key-equals"]) &&
    !key.classList.contains(["key-operation"])
);
const operationKeys = selectAll(".key-operation");
const clearKey = select(".key-clear");
const equalsKey = select(".key-equals");

let input = "";
let formula = [];
let result = "";
let isOperationKeyClicked = false;

numberKeys.forEach((key) => {
  key.addEventListener("click", () => {
    input = isOperationKeyClicked ? "" : input;

    // CASE: number is not allowed to begin with multiple zeros (a zero in the beginning of the number can be allowed if it is followed by a decimal point)
    if (key.innerHTML === "0" && input === "0") return;

    if (key.innerHTML === ".") {
      // CASE: number is not allowed to have multiple decimal pints
      if (input.indexOf(".") !== -1) return;
      // CASE: if user starts input with decimal point, a zero is added before it
      if (input === "") {
        input = "0";
      }
    }

    // CASE: input number has a limit of 22 digits // clearTimeout for alert???? limit formula length????
    if (input.length === 22) return customAlert("DIGIT LIMIT MET");

    // New digit is added to the end of input string
    input = input.concat(key.innerHTML);

    // CASE: number is not allowed to begin with a zero if it is not followed by a decimal point
    if (input.length > 1 && input[0] === "0" && input[1] !== ".") {
      input = input.slice(1);
    }

    // If operation key has been clicked before a digit, the input is added to the formula, otherwise last input saved in formula is updated.
    isOperationKeyClicked
      ? formula.push(input)
      : updateLastFormulaInput(formula, input);

    formulaDisplay.innerHTML = parseFormulaForDisplay(formula);
    resultDisplay.innerHTML = input;

    isOperationKeyClicked = false;
  });
});

operationKeys.forEach((key) => {
  key.addEventListener("click", () => {
    // EXTRA CASE: if first button clicked is division or multiplication - a zero is added before it
    if (
      formula.length === 0 &&
      (key.innerHTML === "/" || key.innerHTML === "x")
    ) {
      formula.push("0");
    }

    // CASE: if last key clicked before the operation key was not another operation - the operator is pushed to the formula otherwise it is updated (line 96)
    if (!isOperationKeyClicked) {
      input = key.innerHTML;
      formula.push(input);
    }

    if (isOperationKeyClicked) {
      if (key.innerHTML === "-") {
        // CASE: if "-" is clicked after another operator and there is already two operators in a row, nothing is added
        if (input.length > 1) return;
        // CASE: if "-" is clicked after another operator and there are no numbers before the operator, the operator is changed (e.g. "+", "-" -> "-")
        if (formula.length <= 1) {
          input = key.innerHTML;
        } else {
          // CASE: if "-" is clicked after another operator and there are numbers before the operator, the "-" operator is added
          input = input.concat("-");
        }
      } else {
        // CASE: if any other operator (not "-") is clicked after another operator, the operator is changed
        input = key.innerHTML;
      }
      updateLastFormulaInput(formula, input);
    }

    formulaDisplay.innerHTML = parseFormulaForDisplay(formula);
    resultDisplay.innerHTML = input;

    isOperationKeyClicked = true;
  });
});

// EQUALS
equalsKey.addEventListener("click", () => {
  input = "";
  result = calculate(formula);
  resultDisplay.innerHTML = result;

  formula.push(equalsKey.innerHTML, result);
  formulaDisplay.innerHTML = parseFormulaForDisplay(formula);

  formula = [result];
});

// CLEAR
clearKey.addEventListener("click", () => {
  formula = [];
  input = "";
  result = "";
  formulaDisplay.innerHTML = "";
  resultDisplay.innerHTML = "0";
  isOperationKeyClicked = false;
});
