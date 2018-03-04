let currentWindow = "0";
let input1;
let input2;
let currentEntry = "0";
let operation;
let last_operation;
let newEntryFlag = true;
let operationFlag = false;
let multiOperations = 0;
let equalFlag = false;
let lastKey;
let isDecimal = false;
let operators = ["+", "-", "X", "/", "^", "root", "%"];  

$("document").ready(function(){
  
       $("button").bind("click", function(event){
         calculator(this.id)
       });
}); 

                    
function calculator(keyEntry){

  console.log('Key Pressed', keyEntry);
  
  if(Number.isInteger(Number(keyEntry)) || keyEntry == "."){
  //NUMBER ENTRY  
    
    //multi decimal catch
    if(keyEntry == '.' && isDecimal == false && newEntryFlag == false){
      
      isDecimal = true;
      currentEntry += keyEntry
      updateWindow(currentEntry);
      newEntryFlag = false;

    } else if(keyEntry == '.' && isDecimal == true) {

    } else {

      //Is it a new number? 
      if(newEntryFlag){
        newEntryFlag = false;
        
        currentEntry = keyEntry;
        
      } else {
        
        currentEntry += keyEntry
        
      }
      
      updateWindow(currentEntry);
    
    }
    

  } else if(keyEntry == "C") {
  //CLEAR  
      currentWindow = null;
      input1 = null;
      input2 = null;
      currentEntry = "0";
      operation = null;
      newEntryFlag = true;
      currentWindow = "0";
      equalFlag = false;
      updateWindow(currentEntry);
      updateOperation('');
      isDecimal = false;
      
    
  } else if(operators.includes(keyEntry)) {
    //OPERATIONS
    newEntryFlag = true;
    isDecimal = false;

    if(operators.includes(lastKey) && operators.includes(keyEntry)){
      //update the operation, but nothing else.

    } else {

      if(input1){

        if(equalFlag == true){
          input2 = null;
          equalFlag = false;

        } else {

          if(input2){
    
            input2 = currentEntry;
            input1 = calculate();
            updateWindow(input1);
            input2 = null;
    
    
          } else {
            input2 = currentEntry
            input1 = calculate();
            updateWindow(input1);
          }

        }
  1
      } else {
        input1 = currentEntry;
  
      }

    }

    operation = keyEntry;
    updateOperation(operation);
    
  } else if(keyEntry == '=') {
    //EQUALS
    input2 = currentEntry;
    input1 = calculate();
    updateWindow(input1);
    updateOperation('');
    equalFlag = true;
    newEntryFlag = true;

  } else {

  }
 

  lastKey = keyEntry;

}

function duplicateOperationCheck(){
  if(operators.includes(lastKey) && operators.includes(keyEntry)){
    return true;
  }
  return false;
}


function calculate(){
  
  let num1 = Number(input1);
  let num2 = Number(input2);
  let result;
  
  switch(operation){
    case '+':
      //console.log('Case +');
      result = sum(Number(input1),Number(input2));
      break;
      
    case '-':
      //console.log('Case -');
      result = difference(Number(input1),Number(input2));
      break;
      
    case 'X':
      //console.log('Case X');
      result = product(Number(input1),Number(input2));
      break;
      
    case '/':
      //console.log('Case /');
      result = quotient(Number(input1),Number(input2)); 
      break;

    case '^':
    //console.log('Case /');
    result = power(Number(input1),Number(input2)); 
    break;

    case 'root':
    //console.log('Case /');
    result = root(Number(input1)); 
    break;
      
    //console.log('Case /');
    case '%':
    result = percent(Number(input1)); 
    break;
      
  }
 
  last_operation = operation;
  console.log('Result:', result);
  result = roundResult(result);

  return result;
      
}


function updateWindow(newVal){

  if(newVal == '.'){
    newVal = '0.';
    currentEntry = '0.'
  } 

  let lengthChecker = String(newVal)

  if(lengthChecker.length > 7){

    $('#calcValue').text("TOO BIG");

  } else {

    $('#calcValue').text(newVal);

  }
}

function updateOperation(newOp){

  if(newOp == 'root'){

    $('#calcOperation').text('rt');

  }else if(newOp == '^'){

    $('#calcOperation').text('p^');

  } else {
  
    $('#calcOperation').text(newOp);
  
  }
}

function sum(a,b){11
  return a+b;
}

function difference(a,b){
  return a-b;
}

function product(a,b){
  return a*b;
}

function quotient(a,b){
  return a/b;
}

function root(a){
  return Math.sqrt(a);11
}

function power(a,b){
  return Math.pow(a, b);
}

function percent(a){
  return a * .01;
}
1
function isInt(n) {
  return n % 1 === 0;
}

function roundResult(a){
  
  let rounded;
  
  if(isInt(a)){

    rounded = a;

  } else {

    rounded = a.toFixed(3);

  }

  return rounded;
  
}