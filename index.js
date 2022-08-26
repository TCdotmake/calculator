function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operation, a, b) {
  return operation(a, b);
}

let aVal = 0;

const numList = document.getElementsByClassName("num");
const display = document.getElementById("display");
console.log("display", display);

console.log("numList", numList);
for (let i = 0; i < numList.length; i++) {
  const element = numList[i];
  element.setAttribute("data-value", element.innerHTML);
  element.addEventListener("click", (e) => {
    const dArr = display.dataset.value.split("");
    if (!dArr.includes(".") || e.target.dataset.value !== ".")
      dArr.push(e.target.dataset.value);
    if (dArr.length > 1 && dArr[0] === "0" && dArr[1] !== ".") {
      dArr.splice(0, 1);
      console.log("dArr", dArr);
    }
    display.dataset.value = dArr.join("");
    display.innerText = display.dataset.value;
  });
}
