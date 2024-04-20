//button text / roll counter
let buttonText = document.querySelector('.buttonText');
let sum = 0;
let sumArray = [0, 0, 0, 0, 0, 0];
let counter = 1;
let rollCounter = 3;
let newConditionNumber1 = 1;
let newConditionNumber2 = 1;
let bonusCounter = [0, 0, 0, 0];
let bonusRepeat = [0, 0, 0, 0];
let allDice = [1, 2, 3, 4, 5];
let scoreSum = [0, 0, 0, 0, 0];
const conditionTable = Array.from({ length: 16 }, () => Array(5).fill(true));
buttonText.textContent = 'Roll ' + rollCounter + '/3';

//saving the table into a matrix, edit DOM with tableData[x,y].textContent
function tableToArray(table) {
  let result = [];
  let rows = table.rows;
  let cells;
  // Iterate over rows
  for (let i = 0, iLen = rows.length; i < iLen; i++) {
    cells = rows[i].cells;
    let rowArray = [];
    // Iterate over cells
    for (let j = 0, jLen = cells.length; j < jLen; j++) {
      rowArray.push(cells[j]);
    }
    result.push(rowArray);
  }
  return result;
}
//call of the function
let tableData = tableToArray(document.getElementsByClassName('scoreboard')[0]);

//NEW ROUND - function that resets stats
function newRound() {
  rollCounter = 3;
  placeholderRemove();
  buttonText.textContent = 'Roll ' + rollCounter + '/3';
  document.querySelectorAll('.die').forEach((die) => {
    die.classList.remove('save1', 'save2', 'save3', 'save4', 'save5');
  });
  document.querySelector('.btnEl').removeAttribute('disabled');
}
//makes rows clickable and unclickable
//8th row is a spacer so we skip it
//also we skip everything in [0][x], [x][1], [7][x] and [16-17][x]
function clickableCell() {
  for (let i = 1; i <= 15; i++) {
    if (i !== 8) {
      if (counter == 1) {
        j = 4;
      } else {
        j = counter - 1;
      }
      tableData[i][j].removeEventListener('click', playerCounter);
    }
  }
  for (i = 1; i <= 15; i++) {
    if (i !== 8 && conditionTable[i][counter] && i !== 7) {
      tableData[i][counter].addEventListener('click', playerCounter);
    }
  }
}

function fullHouseTest() {
  for (i = 0; i < 6; i++) {
    if (sumArray[i] == 3) {
      for (j = 0; j < 6; j++) {
        if (j != i && sumArray[j] == 2) {
          return true;
        }
      }
    }
  }
}

function straightRollTest() {
  if (sumArray[0] > 0 || sumArray[5] > 0) return true;
}

function straightTest() {
  for (i = 0; i < 6; i++) {
    if (
      sumArray[1] > 0 &&
      sumArray[2] > 0 &&
      sumArray[3] > 0 &&
      sumArray[4] > 0 &&
      straightRollTest()
    ) {
      return true;
    } else {
      return false;
    }
  }
}

function sStraightTest() {
  let tester1 = [1, 2, 3, 4];
  let tester2 = [2, 3, 4, 5];
  let tester3 = [3, 4, 5, 6];

  if (
    tester1.every((i) => allDice.includes(i)) ||
    tester2.every((i) => allDice.includes(i)) ||
    tester3.every((i) => allDice.includes(i))
  )
    return true;
  else return false;
}

// defines sum (score?) of each cell
function diceScore() {
  //filling array to check how many numbers are the same
  for (i = 0; i < 5; i++) {
    switch (allDice[i]) {
      case 1:
        sumArray[0]++;
        break;
      case 2:
        sumArray[1]++;
        break;
      case 3:
        sumArray[2]++;
        break;
      case 4:
        sumArray[3]++;
        break;
      case 5:
        sumArray[4]++;
        break;
      case 6:
        sumArray[5]++;
        break;
    }
  }
  if (newConditionNumber1 == 1) {
    for (i = 0; i < 5; i++) {
      if (allDice[i] == 1) sum++;
    }
  } else if (newConditionNumber1 == 2) {
    for (i = 0; i < 5; i++) {
      if (allDice[i] == 2) sum += 2;
    }
  } else if (newConditionNumber1 == 3) {
    for (i = 0; i < 5; i++) {
      if (allDice[i] == 3) sum += 3;
    }
  } else if (newConditionNumber1 == 4) {
    for (i = 0; i < 5; i++) {
      if (allDice[i] == 4) sum += 4;
    }
  } else if (newConditionNumber1 == 5) {
    for (i = 0; i < 5; i++) {
      if (allDice[i] == 5) sum += 5;
    }
  } else if (newConditionNumber1 == 6) {
    for (i = 0; i < 5; i++) {
      if (allDice[i] == 6) sum += 6;
    }
  } else if (newConditionNumber1 == 9) {
    for (i = 0; i < 6; i++) {
      if (sumArray[i] >= 3) {
        for (j = 0; j < 5; j++) {
          sum += allDice[j];
        }
      }
    }
  } else if (newConditionNumber1 == 10) {
    for (i = 0; i < 6; i++) {
      if (sumArray[i] >= 4) {
        for (j = 0; j < 5; j++) {
          sum += allDice[j];
        }
      }
    }
  } else if (newConditionNumber1 == 11) {
    if (fullHouseTest()) sum = 25;
  } else if (newConditionNumber1 == 12) {
    if (sStraightTest()) sum = 30;
  } else if (newConditionNumber1 == 13) {
    if (straightTest()) sum = 40;
  } else if (newConditionNumber1 == 14) {
    for (i = 0; i < 6; i++) {
      if (sumArray[i] == 5) sum = 50;
    }
  } else if (newConditionNumber1 == 15) {
    for (i = 0; i < 5; i++) {
      sum += allDice[i];
    }
  } else {
    tableData[newConditionNumber1][newConditionNumber2].textContent = 0;
  }
  if (newConditionNumber1 < 7) {
    bonusCounter[newConditionNumber2 - 1] += sum;
  }
}

//removes placeholders from inactive players
function placeholderRemove() {
  for (n = 1; n < 16; n++) {
    if (n == 7 || n == 8) continue;
    if (counter == 1) {
      m = 4;
    } else {
      m = counter - 1;
    }
    if (conditionTable[n][m]) tableData[n][m].textContent = '';
  }
}

//writes down placeholders of the sum in every cell
function placeholder() {
  for (n = 1; n < 16; n++) {
    if (n == 7 || n == 8) continue;
    if (counter == 1) {
      m = 4;
    } else {
      m = counter - 1;
    }
    if (!conditionTable[n][m]) continue;
    tableData[n][m].classList.add('placehold');
    sum = 0;
    sumArray = [0, 0, 0, 0, 0, 0];
    for (i = 0; i < 5; i++) {
      switch (allDice[i]) {
        case 1:
          sumArray[0]++;
          break;
        case 2:
          sumArray[1]++;
          break;
        case 3:
          sumArray[2]++;
          break;
        case 4:
          sumArray[3]++;
          break;
        case 5:
          sumArray[4]++;
          break;
        case 6:
          sumArray[5]++;
          break;
      }
    }
    if (n == 1) {
      for (i = 0; i < 5; i++) {
        if (allDice[i] == 1) {
          sum++;
        }
      }
    } else if (n == 2) {
      for (i = 0; i < 5; i++) {
        if (allDice[i] == 2) {
          sum += 2;
        }
      }
    } else if (n == 3) {
      for (i = 0; i < 5; i++) {
        if (allDice[i] == 3) {
          sum += 3;
        }
      }
    } else if (n == 4) {
      for (i = 0; i < 5; i++) {
        if (allDice[i] == 4) {
          sum += 4;
        }
      }
    } else if (n == 5) {
      for (i = 0; i < 5; i++) {
        if (allDice[i] == 5) {
          sum += 5;
        }
      }
    } else if (n == 6) {
      for (i = 0; i < 5; i++) {
        if (allDice[i] == 6) {
          sum += 6;
        }
      }
    } else if (n == 9) {
      for (i = 0; i < 6; i++) {
        if (sumArray[i] >= 3) {
          for (j = 0; j < 5; j++) {
            sum += allDice[j];
          }
        }
      }
    } else if (n == 10) {
      for (i = 0; i < 6; i++) {
        if (sumArray[i] >= 4) {
          for (j = 0; j < 5; j++) {
            sum += allDice[j];
          }
        }
      }
    } else if (n == 11) {
      if (fullHouseTest()) sum = 25;
    } else if (n == 12) {
      if (sStraightTest()) sum = 30;
    } else if (n == 13) {
      if (straightTest()) sum = 40;
    } else if (n == 14) {
      for (i = 0; i < 6; i++) {
        if (sumArray[i] == 5) sum = 50;
      }
    } else if (n == 15) {
      for (i = 0; i < 5; i++) {
        sum += allDice[i];
      }
    } else {
      sum = 0;
      tableData[n][m].textContent = 0;
    }
    tableData[n][m].textContent = sum;
  }
}

tableData[7][1].textContent = '0/63';
tableData[7][2].textContent = '0/63';
tableData[7][3].textContent = '0/63';
tableData[7][4].textContent = '0/63';
function bonus() {
  for (i = 1; i < 5; i++) {
    if (bonusRepeat[i - 1] == 0) {
      tableData[7][i].textContent = bonusCounter[i - 1] + '/63';
      if (bonusCounter[i - 1] >= 63) {
        scoreSum[i] += 35;
        bonusRepeat[i]++;
      }
    }
  }
}

//INPUT / PLAYER COUNTER and Active player marker
//conditions for disabling cells and score input
playerCounter();
function playerCounter(event) {
  if (event) {
    newConditionNumber1 = event.target.classList.item(2).slice(3); //row
    newConditionNumber2 = event.target.classList.item(1).slice(3); //column
    conditionTable[newConditionNumber1][newConditionNumber2] = false;
    if (rollCounter == 3) {
      tableData[newConditionNumber1][newConditionNumber2].textContent = 0;
      tableData[newConditionNumber1][newConditionNumber2].classList.remove(
        'placehold',
      );
    } else {
      //check what's up
      sum = 0;
      sumArray = [0, 0, 0, 0, 0, 0];
      diceScore();
      scoreSum[newConditionNumber2] += sum;
      tableData[18][newConditionNumber2].textContent =
        scoreSum[newConditionNumber2];
      tableData[newConditionNumber1][newConditionNumber2].textContent = sum;
      tableData[newConditionNumber1][newConditionNumber2].classList.remove(
        'placehold',
      );
    }
  }
  bonus();
  //Changing player turns (column change, activation and deactivation of event listeners and new round reset)
  if (counter == 1) {
    tableData[0][counter].classList.toggle('activePlayer');
    tableData[0][4].classList.remove('activePlayer');
    newRound();
    clickableCell();
    counter++;
  } else if (counter == 2 || counter == 3) {
    tableData[0][counter - 1].classList.toggle('activePlayer');
    tableData[0][counter].classList.toggle('activePlayer');
    newRound();
    clickableCell();
    counter++;
  } else if (counter == 4) {
    tableData[0][counter - 1].classList.toggle('activePlayer');
    tableData[0][counter].classList.toggle('activePlayer');
    newRound();
    clickableCell();
    counter = 1;
  }
}

//counter text change - called in buttonPress below
function buttonTextChange() {
  if (rollCounter > 1) {
    --rollCounter;
    buttonText.textContent = 'Roll ' + rollCounter + '/3';
  } else {
    --rollCounter;
    buttonText.textContent = 'Roll ' + rollCounter + '/3';
    document.querySelector('.btnEl').setAttribute('disabled', true);
  }
}

//dice roll - random number generator 0-6 - called in buttonPress below
function diceRoll() {
  function dieValue() {
    return Math.ceil(Math.random() * 6);
  }
  //img src change
  let allDiceImgChange = ['.one', '.two', '.three', '.four', '.five', '.six'];
  let allDiceSaveCheck = ['save1', 'save2', 'save3', 'save4', 'save5'];
  for (k = 0; k <= 4; k++) {
    if (
      document.querySelectorAll('.die')[k].classList.item(3) !==
      allDiceSaveCheck[k]
    ) {
      //changes dice value
      allDice[k] = dieValue();
      //changes dice img src so image changes
      document
        .querySelector(allDiceImgChange[k])
        .setAttribute('src', 'images/' + allDice[k] + '.png');
    }
  }
}

//button event listener
document.querySelector('.btnEl').addEventListener('click', () => {
  buttonPress();
});
function buttonPress() {
  diceRoll();
  buttonTextChange();
  //loop through all dice upon a button press for animation
  document.querySelectorAll('.die').forEach((die) => {
    //if it doesn't have save class, it can roll
    if (!die.classList.contains('save1')) {
      //then if it already finished roll animation, it should toggle the class twice
      if (die.classList.contains('rollOne')) {
        if (die.classList.contains('one')) {
          die.classList.remove('rollOne');
          //executes css code right away so it doesn't all get executed at once/ triggers animation
          void die.offsetWidth;
          die.classList.add('rollOne');
        }
      } else {
        if (die.classList.contains('one')) die.classList.toggle('rollOne');
      }
    }
    //repeat for other dice
    if (!die.classList.contains('save2')) {
      if (die.classList.contains('rollTwo')) {
        if (die.classList.contains('two')) {
          die.classList.remove('rollTwo');
          void die.offsetWidth;
          die.classList.add('rollTwo');
        }
      } else {
        if (die.classList.contains('two')) die.classList.toggle('rollTwo');
      }
    }
    if (!die.classList.contains('save3')) {
      if (die.classList.contains('rollThree')) {
        if (die.classList.contains('three')) {
          die.classList.remove('rollThree');
          void die.offsetWidth;
          die.classList.add('rollThree');
        }
      } else {
        if (die.classList.contains('three')) die.classList.toggle('rollThree');
      }
    }
    if (!die.classList.contains('save4')) {
      if (die.classList.contains('rollFour')) {
        if (die.classList.contains('four')) {
          die.classList.remove('rollFour');
          void die.offsetWidth;
          die.classList.add('rollFour');
        }
      } else {
        if (die.classList.contains('four')) die.classList.toggle('rollFour');
      }
    }
    if (!die.classList.contains('save5')) {
      if (die.classList.contains('rollFive')) {
        if (die.classList.contains('five')) {
          die.classList.remove('rollFive');
          void die.offsetWidth;
          die.classList.add('rollFive');
        }
      } else {
        if (die.classList.contains('five')) die.classList.toggle('rollFive');
      }
    }
  });
  placeholderRemove();
  setTimeout(placeholder, 2500);
}

//save die function, selects each die and runs through a check
document.querySelectorAll('.die').forEach((die) => {
  die.addEventListener('click', () => {
    // depending on what die is clicked, move the die to the top of the screen
    let classChecker = die.classList.item(0);
    if (rollCounter !== 3) {
      switch (classChecker) {
        case 'one':
          die.classList.toggle('save1');
          break;
        case 'two':
          die.classList.toggle('save2');
          break;
        case 'three':
          die.classList.toggle('save3');
          break;
        case 'four':
          die.classList.toggle('save4');
          break;
        case 'five':
          die.classList.toggle('save5');
          break;
      }
    }
  });
});
