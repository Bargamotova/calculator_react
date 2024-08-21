import { useState } from "react";

function App() {
  const [answer, setAnswer] = useState("");
  const [expression, setExpression] = useState("");
  const et = expression.trim();

  const isOperator = (symbol) => {
    return /[*/+-]/.test(symbol);
  };

  const display = (symbol) => {
    if (symbol === "clear") {
      setAnswer("");
      setExpression("0");
    } else if (symbol === "negative") {
      if (answer === "") return;
      setAnswer(
        answer.toString().charAt(0) === "-" ? answer.slice(1) : "-" + answer
      );
    } else if (symbol === "percent") {
      if (answer === "") return;
      setAnswer((parseFloat(answer) / 100).toString());
    } else if (isOperator(symbol)) {
      setExpression(et + " " + symbol + " ");
    } else if (symbol === "=") {
      calculate();
    } else if (symbol === "0") {
      if (expression.charAt(0) !== "0") {
        setExpression(expression + symbol);
      }
    } else if (symbol === ".") {
      // split by operators and get last number
      const lastNumber = expression.split(/[-+/*]/g).pop();
      if (!lastNumber) return;
      // if last number already has a decimal, don't add another
      if (lastNumber?.includes(".")) return;
      setExpression(expression + symbol);
    } else {
      if (expression.charAt(0) === "0") {
        setExpression(expression.slice(1) + symbol);
      } else {
        setExpression(expression + symbol);
      }
    }
  };
  const calculate = () => {
    // if last char is an operator, do nothing
    if (isOperator(et.charAt(et.length - 1))) return;
    // clean the expression so that two operators in a row uses the last operator
    // 5 * - + 5 = 10
    const parts = et.split(" ");
    const newParts = [];

    // go through parts backwards
    for (let i = parts.length - 1; i >= 0; i--) {
      if (["*", "/", "+"].includes(parts[i]) && isOperator(parts[i - 1])) {
        newParts.unshift(parts[i]);
        let j = 0;
        let k = i - 1;
        while (isOperator(parts[k])) {
          k--;
          j++;
        }
        i -= j;
      } else {
        newParts.unshift(parts[i]);
      }
    }
    const newExpression = newParts.join(" ");
    if (isOperator(newExpression.charAt(0))) {
      setAnswer(eval(answer + newExpression));
    } else {
      setAnswer(eval(newExpression));
    }
    setExpression("");
  };

  return (
    <div className="container">
      <h1 className="title">Calculator</h1>
      <div className="grid">
        <div id="display" className="display-box">
          <div id="answer">{answer}</div>
          <div id="expression">{expression}</div>
        </div>

        <div
          onClick={() => display("clear")}
          className="btn btn--coral"
          id="clear"
        >
          AC
        </div>
        <div
          onClick={() => display("negative")}
          className="btn btn--gray"
          id="negative"
        >
          +/-
        </div>

        <div onClick={() => display("/")} className="btn btn--gray" id="divide">
          /
        </div>
        <div
          onClick={() => display("*")}
          className="btn btn--gray"
          id="multiply"
        >
          *
        </div>
        <div onClick={() => display("7")} className="btn" id="seven">
          7
        </div>
        <div onClick={() => display("8")} className="btn" id="eight">
          8
        </div>
        <div onClick={() => display("9")} className="btn" id="nine">
          9
        </div>
        <div
          onClick={() => display("-")}
          className="btn btn--gray"
          id="subtract"
        >
          -
        </div>
        <div onClick={() => display("4")} className="btn" id="four">
          4
        </div>
        <div onClick={() => display("5")} className="btn" id="five">
          5
        </div>
        <div onClick={() => display("6")} className="btn " id="six">
          6
        </div>
        <div onClick={() => display("+")} className="btn btn--gray" id="add">
          +
        </div>
        <div onClick={() => display("1")} className="btn" id="one">
          1
        </div>
        <div onClick={() => display("2")} className="btn" id="two">
          2
        </div>
        <div onClick={() => display("3")} className="btn" id="three">
          3
        </div>
        <div onClick={() => display("=")} className="btn btn--blue" id="equals">
          =
        </div>
        <div onClick={() => display("0")} className="btn btn--zero" id="zero">
          0
        </div>
        <div
          onClick={() => display(".")}
          className="btn btn--gray"
          id="decimal"
        >
          .
        </div>
      </div>
    </div>
  );
}

export default App;
