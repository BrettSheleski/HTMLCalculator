let textbox = document.getElementById("result");

if (!textbox) {
    alert("Textbox not found!");
    throw "Textbox not found"
    exit;
}



let pendingOperation = null;
let operand1 = null;
let operand2 = null;
let doItAgain = false;
let clearOnInput = false;




function setOperation(operation) {
    pendingOperation = operation;

    doItAgain = false;

    operand1 = getCurrentNumberFromInput();
    clearOnInput = true;
}

function getCurrentNumberFromInput() {
    let num;

    if (!textbox.value)
        num = 0;
    else
        num = parseFloat(textbox.value);

    if (Number.isNaN(num)) {
        throw "not a valid number!"
    }

    return num;
}

function add() {
    setOperation((a, b) => { return a + b; });
}

function subtract() {
    setOperation((a, b) => { return a - b; });
}

function multiply() {
    setOperation((a, b) => { return a * b; });
}

function divide() {
    setOperation((a, b) => { return a / b; });
}


function execute() {


    if (!pendingOperation)
        return;

    let result;

    if (doItAgain) {

        let op1 = getCurrentNumberFromInput();

        result = pendingOperation(op1, operand2);
    }
    else {
        doItAgain = true;

        operand2 = getCurrentNumberFromInput();

        result = pendingOperation(operand1, operand2);
    }

    textbox.value = result.toString();
    clearOnInput = true;
}

function numberPress(n) {

    if (clearOnInput)
        textbox.value = null;

    let num = textbox.value;

    if (Number.isNaN(num))
        num = "";

    num += n.toString();

    textbox.value = num;

    clearOnInput = false;
}


function clear() {
    clearEntry();

    pendingOperation = null;
    operand1 = null;
    operand2 = null;
    doItAgain = false;
    clearOnInput = false;

}

function clearEntry() {
    textbox.value = null;
}


function executeUnaryOperation(operation) {

    let num = getCurrentNumberFromInput();

    num = operation(num);

    textbox.value = num.toString();
}

function percent() {
    executeUnaryOperation(n => n / 100);
}

function inverse() {
    executeUnaryOperation(n => 1 / n);
}

function backspace() {
    let num = textbox.value;

    if (num.length > 0) {
        num = num.substring(0, num.length - 1);
    }

    textbox.value = num;
}

function square() {
    executeUnaryOperation(n => n * n);
}

function squareRoot() {
    executeUnaryOperation(n => Math.sqrt(n));
}

function plusMinus(){
    executeUnaryOperation(n => -1 * n);
}

function decimal(){
    if (!textbox.value){
        textbox.value = "0.";
    }
    else if (textbox.value.indexOf('.') < 0){
        textbox.value = textbox.value + '.';
    }
}