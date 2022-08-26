const nonSense = [
  "dog butt",
  "dehydration water",
  "asdflkjfghas;dlkjf",
  "Instruction unclear, deleting root",
];

const display = document.getElementById("display");

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

function toggleSign() {
  display.dataset.value = parseFloat(display.dataset.value * -1);
  display.innerText = display.dataset.value;
  if (state.operand === null) {
    state.total = parseFloat(display.dataset.value);
  } else {
    state.b = parseFloat(display.dataset.value);
  }
}

function parseNumInput(e) {
  const dArr = display.dataset.value.split("");
  if (e.target.dataset.value === ".") {
    if (!dArr.includes(".")) {
      dArr.push(e.target.dataset.value);
    }
  } else {
    dArr.push(e.target.dataset.value);
  }

  if (dArr.length > 1 && dArr[0] === "0" && dArr[1] !== ".") {
    dArr.shift();
  }
  display.dataset.value = dArr.join("");
  display.innerText = display.dataset.value;
  if (state.operand !== null) {
    state.b = parseFloat(display.dataset.value);
  } else {
    state.total = parseFloat(display.dataset.value);
  }
}

function parseOperandInput(e) {
  const operand = e.target.dataset.value;

  display.dataset.value = "";

  if (state.ready()) {
    display.innerText = operate(state);
    state.reset();
    state.total = parseFloat(display.innerText);
    if (state.total < 0) {
      state.totalSign = -1;
    }
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

function deleteChar() {
  let value = parseFloat(display.dataset.value);
  const sign = value < 0 ? -1 : 1;
  const dArr = value.toString().split("");
  dArr.pop();
  if (
    dArr.length === 0 ||
    (dArr.length === 1 && (dArr[0] === "-" || dArr[0] === "."))
  ) {
    value = 0;
  } else {
    value = parseFloat(dArr.join(""));
  }
  display.dataset.value = value;
  display.innerText = value;
  if (state.operand === null) {
    state.total = value;
  } else {
    state.b = value;
  }
}

//numpad eventListeners
const numList = document.getElementsByClassName("num");
for (let i = 0; i < numList.length; i++) {
  const element = numList[i];
  element.setAttribute("data-value", element.innerHTML);
  element.addEventListener("click", (e) => {
    parseNumInput(e);
  });
}

//operands eventListeners
const operands = document.getElementsByClassName("operand");
for (let i = 0; i < operands.length; i++) {
  const element = operands[i];
  element.setAttribute("data-value", element.innerHTML);
  element.addEventListener("click", (e) => {
    parseOperandInput(e);
  });
}

//special function eventListeners

const clearBtn = document.getElementById("clear");
clearBtn.addEventListener("click", clear);

const toggleBtn = document.getElementById("toggle");
toggleBtn.addEventListener("click", toggleSign);

const deleteDigit = document.getElementById("del");
deleteDigit.addEventListener("click", deleteChar);
