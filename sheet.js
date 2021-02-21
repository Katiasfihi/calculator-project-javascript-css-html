let runningTotal = 0;
let buffer = "0";
let previousoperator = null;

const screen = document.querySelector('.screen');

function buttonClick(innerTextFromClick) { 
    if ( isNaN(innerTextFromClick) ) {
        handleSymbol(innerTextFromClick);
    } else { 
        handleNumber(innerTextFromClick);
    };
    screen.innerText = buffer
}

console.log('buffer', buffer)


function handleSymbol(symbol) {

    switch (symbol) {
        case 'C' :
            buffer = 0;
            runningTotal = 0;
        break;
        case '-' :
        case '÷' :           
        case '×' :          
        case '+' :
            handleMath(symbol);
        break
        case '←' :
          if (buffer.length === 1) {
              buffer = '0';
          } else {
              buffer = buffer.substring(0, buffer.length -1);
          }
          break
        case '=' :
            if (previousOperator === null) {
                return;
            }
        flushOperation(parseInt(buffer));
        previousOperator = null;
        buffer = runningTotal;
        runningTotal = 0;
    }
}

function handleMath(symbol) {
    if (buffer === '0') {
        //nothing
        return
    } 

    const intBuffer = parseInt(buffer);

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {

        flushOperation(intBuffer);
    }

    previousOperator = symbol;

    buffer = '0';
}

function flushOperation(intBuffer) {

    if (previousOperator === '+') {
        runningTotal += intBuffer
    } else if (previousOperator === '-') {
        runningTotal -= intBuffer
    } else if (previousOperator === '×') {
        runningTotal *= intBuffer
    } else {
        runningTotal /= intBuffer
    }
    console.log('running total', runningTotal);
    buffer = runningTotal
}

function handleNumber(numberString) {
    
    if (buffer === '0') {
        buffer = numberString;
    } else {
        buffer += numberString;
    }

}

function init () {
    document.querySelector('.calc-buttons').addEventListener('click', function(event) {
     buttonClick(event.target.innerText);
    })
};

init() 

