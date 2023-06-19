import { select, selectAll } from "./utils.js";

export const resultDisplay = select(".display-result");
export const formulaDisplay = select(".display-formula");
const keys = selectAll(".key");
export const numberKeys = keys.filter(
  (key) =>
    !key.classList.contains(["key-clear"]) &&
    !key.classList.contains(["key-equals"]) &&
    !key.classList.contains(["key-operation"])
);
export const operationKeys = selectAll(".key-operation");
export const clearKey = select(".key-clear");
export const equalsKey = select(".key-equals");
