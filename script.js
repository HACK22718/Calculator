const display = document.getElementById("display");
const buttons = document.querySelector(".buttons");

buttons.addEventListener("click", function (event) {
  const btn = event.target.closest("button");
  if (!btn) return;

  const value = btn.dataset.value;
  // console.log("saved value:", value);

  if (value === "AC") {
    clearDisplay();
  } else if (value === "DEL") {
    deleteLast();
  } else if (value === "=") {
    calculate();
  } else {
    addTodisplay(value);
  }

  // addTodisplay(btn.dataset.value);
});

function addTodisplay(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = "";
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  if (display.value === "") return;

  const expr = display.value.replace(/\s/g, "");
  const match = expr.match(/^(-?\d+\.?\d*)([+\-*\/%])(-?\d+\.?\d*)$/);

  if (!match) {
    display.value = "Error";
    return;
  }

  const a = Number(match[1]);
  const op = match[2];
  const b = Number(match[3]);

  let result;
  switch (op) {
    case "+":
      result = a + b;
      break;
    case "-":
      result = a - b;
      break;
    case "*":
      result = a * b;
      break;
    case "/":
      result = a / b;
      break;
    case "%":
      result = a % b;
      break;
  }
  display.value = isFinite(result) ? parseFloat(result.toFixed(10)) : "Error";
}
