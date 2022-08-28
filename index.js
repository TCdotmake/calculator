const nonSense = [
  "dog butt",
  "dehydration water",
  "asdflkjfghas;dlkjf",
  "Instruction unclear, deleting root",
];

const display = document.getElementById("display");
const operandSpan = document.getElementById("operand");
const total = document.getElementById("total");
const numB = document.getElementById("numB");

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
  return (parseFloat(state.total) * parseFloat(state.b)).toFixed(4);
}
function divide(a, b) {
  if (parseInt(b) === 0) {
    return nonSense[Math.floor(Math.random() * nonSense.length)];
  }
  return (parseFloat(state.total) / parseFloat(state.b)).toFixed(4);
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
  updateState(parseFloat(display.dataset.value));
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
  updateState(display.dataset.value);
}

function parseOperandInput(e) {
  const operand = e.target.dataset.value;

  display.dataset.value = "";

  if (state.ready()) {
    updateLog();
    display.innerText = operate(state);
    state.reset();

    updateState(parseFloat(display.innerText));

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
  updateState(value);
}

function updateState(num) {
  if (state.operand === null) {
    state.total = num;
  } else {
    state.b = num;
  }
}

function updateLog() {
  total.innerText = state.total;
  operandSpan.innerText = state.operand;
  numB.innerText = state.b;
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

/*****canvas bg ********/
const canvas = document.getElementById("canvasBg");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", (e) => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

function drawCircle() {
  c.beginPath();
  c.fillStyle = "red";
  c.arc(200, 200, 80, 0, 2 * Math.PI);
  c.fill();
}

class Orb {
  constructor() {
    this.x = Math.floor(Math.random() * canvas.width);
    this.y = Math.floor(Math.random() * canvas.height);
    this.xSp = Math.random() * 6 - 3;
    this.ySp = Math.random() * 6 - 3;
    this.color = Math.floor(Math.random() * 360);
    this.radius = 10 + Math.floor(Math.random() * 200);
  }
  drawCircle() {
    c.beginPath();
    c.fillStyle = `hsla(${this.color}, 75%, 75%, 0.5)`;
    c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    c.fill();
  }
  update() {
    if (this.x + this.xSp > canvas.width || this.x + this.xSp < 0) {
      this.xSp *= -1;
    }
    if (this.y + this.ySp > canvas.height || this.y + this.ySp < 0) {
      this.ySp *= -1;
    }
    this.x += this.xSp;
    this.y += this.ySp;
    this.drawCircle();
  }
}

const orbArr = [];
for (let i = 0; i < 20; i++) {
  orbArr.push(new Orb());
}

function updateArr(orbArr) {
  for (let orb of orbArr) {
    orb.update();
  }
}

function animate() {
  c.fillStyle = "rgb(201, 190, 235)";
  c.fillRect(0, 0, canvas.width, canvas.height);
  updateArr(orbArr);
  requestAnimationFrame(animate);
}

animate();
