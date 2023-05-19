const select = (selector) => document.querySelector(selector);
const selectAll = (selector) => Array.from(document.querySelectorAll(selector));

const addNewInputToFormula = (formula, input) => [...formula, input];

const updateLastFormulaInput = (formula, input) => {
  formula.pop();
  formula.push(input);
  return formula;
};

const parseFormulaForDisplay = (formula) => {
  return formula.join("").replace("x", "&#183;");
};

const parseFormulaForCalculation = (formula) => {
  return formula.join("").replace("x", "*").replace("--", "+");
};

const calculate = (formula) => {
  return Math.round(1e10 * eval(parseFormulaForCalculation(formula))) / 1e10;
};
