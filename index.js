const nonSense = [
  "dog butt",
  "dehydration water",
  "asdflkjfghas;dlkjf",
  "Instruction unclear, deleting root",
];

function add(a, b) {
  return parseFloat(a) + parseFloat(b);
}

function subtract(a, b) {
  return parseFloat(a) - parseFloat(b);
}

function multiply(a, b) {
  return parseFloat(a) * parseFloat(b);
}

function divide(a, b) {
  if (parseInt(b) === 0) {
    return nonSense[Math.floor(Math.random() * nonSense.length)];
  }
  return parseFloat(a) / parseFloat(b);
}

function operate(state) {
  const { a, b, operand } = state;
  switch (operand) {
    case "+":
      return add(a, b);
      break;
    case "-":
      return subtract(a, b);
      break;
    case "*":
      return multiply(a, b);
      break;
    case "/":
      return divide(a, b);
      break;
  }
}

function parseNumInput(e) {
  const dArr = display.dataset.value.split("");
  if (!dArr.includes(".") || e.target.dataset.value !== ".")
    dArr.push(e.target.dataset.value);
  if (dArr.length > 1 && dArr[0] === "0" && dArr[1] !== ".") {
    dArr.splice(0, 1);
    console.log("dArr", dArr);
  }
  display.dataset.value = dArr.join("");
  display.innerText = display.dataset.value;
}

function parseOperandInput(e) {
  const operand = e.target.dataset.value;
  if (state.a === null) {
    state.a = parseFloat(display.dataset.value);
  } else {
    state.b = parseFloat(display.dataset.value);
  }
  display.dataset.value = "";
  console.table(state);
  if (state.ready()) {
    display.dataset.value = operate(state);
    display.innerText = display.dataset.value;
    state.reset();
    state.a = parseFloat(display.dataset.value);
  }
  if (operand !== "=") {
    state.operand = operand;
  }
}

function clear() {
  display.dataset.value = 0;
  display.innerText = display.dataset.value;
  state.reset();
}

let aVal = 0;
let state = {
  a: null,
  b: null,
  operand: null,
  ready() {
    return this.a !== null && this.b !== null && this.operand !== null;
  },
  reset() {
    this.a = null;
    this.b = null;
    this.operand = null;
  },
};

const numList = document.getElementsByClassName("num");
const display = document.getElementById("display");
console.log("display", display);

console.log("numList", numList);
for (let i = 0; i < numList.length; i++) {
  const element = numList[i];
  element.setAttribute("data-value", element.innerHTML);
  element.addEventListener("click", (e) => {
    parseNumInput(e);
  });
}

const operands = document.getElementsByClassName("operand");
for (let i = 0; i < operands.length; i++) {
  const element = operands[i];
  element.setAttribute("data-value", element.innerHTML);
  element.addEventListener("click", (e) => {
    parseOperandInput(e);
  });
}

const clearBtn = document.getElementById("clear");
clearBtn.addEventListener("click", clear);
