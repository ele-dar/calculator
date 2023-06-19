import { resultDisplay } from "./selectors.js";

export const select = (selector) => document.querySelector(selector);
export const selectAll = (selector) =>
  Array.from(document.querySelectorAll(selector));

export const addNewInputToFormula = (formula, input) => [...formula, input];

export const updateLastFormulaInput = (formula, input) => {
  formula.pop();
  formula.push(input);
  return formula;
};

export const parseFormulaForDisplay = (formula) => {
  return formula.join("").replace("x", "&#183;");
};

export const parseFormulaForCalculation = (formula) => {
  return formula.join("").replace("x", "*").replace("--", "+");
};

export const calculate = (formula) => {
  return Math.round(1e10 * eval(parseFormulaForCalculation(formula))) / 1e10;
};

export const displayAlert = (message, input) => {
  resultDisplay.innerHTML = message;
  setTimeout(() => {
    resultDisplay.innerHTML = input;
  }, 1000);
};
