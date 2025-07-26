const display = document.querySelector('#display');
const buttons = document.querySelectorAll('button')


// variables to hold numbers, operator and result
let previousNumber = '';
let currentNumber = '';
let mathOperator = '';
let displayValue;
let result;

// addition function
const add = (a, b) => a + b;

// subtraction function
const subtract = (a, b) => a - b;

// multiplication function
const multiply = (a, b) => a * b;

// division function
const divide = (a, b) => {
   if (b === 0) {
     return 'LOL';
   } else {
     return a / b;
   } 
};


// function operator that call one of the above functions 
function operate(operator, num1, num2) {
   let a = parseFloat(num1);
   let b = parseFloat(num2);

   switch (operator) {
    case '+':
        return add(a, b);
    case '-':
        return subtract(a, b);
    case '*':
        return multiply(a, b);
    case '/':
        return divide(a, b);    
    default:
        return null;
   }
}



// function that update display value
function updateDisplay(value) {
   display.textContent = value; 
}



buttons.forEach((button) => {
   button.addEventListener('click', () => {
     let isNumber = button.classList.contains('number');
     let isOperator = button.classList.contains('operator');
     let isEqual = button.classList.contains('equal');
     let isClear = button.classList.contains('clear');

     
      // Handle first number
      if (isNumber) {
         // Determine which number we are working on
         let activeNumber = mathOperator ? currentNumber : previousNumber;

         // Prevent multiple decimal points
         if (button.textContent === '.' && activeNumber.includes('.')) return;
        
         if (!mathOperator) {
            // No operator yet, we are building the first number
            previousNumber += button.textContent;
            displayValue = previousNumber;
         } else {
            // operator is chosen, build second number
            currentNumber += button.textContent;
            displayValue = currentNumber;
         }

         updateDisplay(displayValue);
      }


      //   Handle operators
      if (isOperator) {
        // If user hits another operator after a full expression, evaluate first
        if (mathOperator && currentNumber) {
            result = operate(mathOperator, previousNumber, currentNumber);
            previousNumber = result.toString();
            currentNumber = '';
            displayValue = previousNumber;
            updateDisplay(displayValue);
        }

         // Only set operator if it's not already set
         if(!mathOperator) { 
            mathOperator = button.textContent;
         }   
      }


       // Handle equal
       if (isEqual) {
         // evaluate only when both numbers and operator are present
         if (!previousNumber || !currentNumber || !mathOperator) return;
         
          if (previousNumber && currentNumber && mathOperator) {
             result = operate(mathOperator, previousNumber, currentNumber);
             updateDisplay(result.toString());
             previousNumber = result.toString();
             currentNumber = '';
             mathOperator = '';
          }
       } 


       //  Handle clear
       if (isClear) {
          previousNumber = '';
          currentNumber = '';
          mathOperator = '';
          result = '';
          displayValue = '';
          updateDisplay('');
       }

    
   });
});