const nonSense = [
  "dog butt",
  "dehydration water",
  "asdflkjfghas;dlkjf",
  "Instruction unclear, deleting root",
];

let state = {
  total: 0,
  b: null,
  operand: null,
  ready() {
    return this.total !== null && this.b !== null && this.operand !== null;
  },
  reset() {
    this.total = null;
    this.b = null;
    this.operand = null;
  },
};

function add() {
  return parseFloat(state.total) + parseFloat(state.b);
}

function subtract(a, b) {
  return parseFloat(state.total) - parseFloat(state.b);
}

function multiply(a, b) {
  return parseFloat(state.total) * parseFloat(state.b);
}

function divide(a, b) {
  if (parseInt(b) === 0) {
    return nonSense[Math.floor(Math.random() * nonSense.length)];
  }
  return parseFloat(state.total) / parseFloat(state.b);
}

function operate(state) {
  if (state.total === null) {
    return;
  }
  console.table(state);
  switch (state.operand) {
    case "+":
      return add();
      break;
    case "-":
      return subtract();
      break;
    case "*":
      return multiply();
      break;
    case "/":
      return divide();
      break;
  }
}

function parseNumInput(e) {
  const dArr = display.dataset.value.split("");
  if (!dArr.includes(".") || e.target.dataset.value !== ".")
    dArr.push(e.target.dataset.value);
  if (dArr.length > 1 && dArr[0] === "0" && dArr[1] !== ".") {
    dArr.splice(0, 1);
  }
  display.dataset.value = dArr.join("");
  display.innerText = display.dataset.value;
  if (state.operand !== null) {
    state.b = display.dataset.value;
  } else {
    state.total = display.dataset.value;
  }
}

function parseOperandInput(e) {
  const operand = e.target.dataset.value;

  display.dataset.value = "";

  if (state.ready()) {
    display.innerText = operate(state);
    state.reset();
    state.total = parseFloat(display.innerText);
    display.dataset.value = 0;
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

const numList = document.getElementsByClassName("num");
const display = document.getElementById("display");

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
