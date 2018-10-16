(function () {
  var currentState = [];
  const DEFAULT_STATE = [[1, 2, 3, 4],
                        [5, 6, 7, 8],
                        [9, 10, 11, 12],
                        [13, 14, 15, 0]];
  const ARROW_RIGHT = 37;
  const ARROW_DOWN = 38;
  const ARROW_LEFT = 39;
  const ARROW_UP = 40;
  var shuffleBtn = document.querySelector(".shuffle");
  function copyArr() {
    for (var i = 0; i < DEFAULT_STATE.length; i++) {
      currentState[i] = [];
      for(var j=0;j<DEFAULT_STATE[i].length;j++){
        currentState[i].push(DEFAULT_STATE[i][j]);
      }
    }
  }
  copyArr();

  var renderBoard = function () {
    var main = document.querySelector(".main__box");
    main.innerHTML = "";
    for (var i = 0; i < currentState.length; i++) {
      var outer = currentState[i];
      for (var j = 0; j < outer.length; j++) {
        var span = document.createElement("span");
        if (outer[j] == 0) {
          span.innerHTML = " ";
          main.appendChild(span);
          span.classList.add("itemNumber", "empty");
        } else if (outer[j] == undefined || outer[j] == " ") {
          outer.splice(outer[j], 1);
        } else {
          span.innerHTML = outer[j];
          main.appendChild(span);
          span.classList.add("itemNumber");
        }
      }
    }
  }
  renderBoard();

  var shuffle = function () {
    for (var i = 0; i < currentState.length; i++) {
      var outer = currentState[i];
      var currentPass = currentState[i].length;
      var index, temp;
      while (currentPass > 0) {
        index = Math.floor(Math.random() * currentPass);
        currentPass--;
        temp = outer[currentPass];
        outer[currentPass] = outer[index];
        outer[index] = temp;
      }
    }
    var currentPass = currentState.length
    var index, temp;
    while (currentPass > 0) {
      index = Math.floor(Math.random() * currentPass);
      currentPass--;
      temp = currentState[currentPass];
      currentState[currentPass] = currentState[index];
      currentState[index] = temp;
    }
    renderBoard();
  };

function getEmptyCellRow() {
  var rowWithEmptyIndex = currentState.findIndex(el => {
    return el.indexOf(0) !== -1;
  });
  return rowWithEmptyIndex;
}
function getEmptyCell(){
  var emptyCellRow = getEmptyCellRow();
  var indexOfEmptyCell = currentState[emptyCellRow].indexOf(0);
  return indexOfEmptyCell;
}

  function fromUpDown(rowWithEmptyIndex, indexOfEmptyCell, indexOfPrevious) {
    currentState[rowWithEmptyIndex][indexOfEmptyCell] =
      currentState[indexOfPrevious][indexOfEmptyCell];
    currentState[indexOfPrevious][indexOfEmptyCell] = 0;
  }

  function fromLeftRight(rowWithEmptyIndex, indexOfEmptyCell, indexOfPrevious) {
    currentState[rowWithEmptyIndex][indexOfEmptyCell] =
      currentState[rowWithEmptyIndex][indexOfPrevious];
    currentState[rowWithEmptyIndex][indexOfPrevious] = 0;
  }

  function moveLeft() {
    var rowWithEmptyIndex = getEmptyCellRow()
    var indexOfEmptyCell = getEmptyCell()
    var indexOfPrevious = currentState[rowWithEmptyIndex].indexOf(0) - 1;
    if(indexOfPrevious < 0){
      return
    }
    fromLeftRight(rowWithEmptyIndex, indexOfEmptyCell, indexOfPrevious)
  }

  function moveUp() {
    var rowWithEmptyIndex = getEmptyCellRow();
    var indexOfEmptyCell = getEmptyCell();
    var indexOfPrevious = rowWithEmptyIndex -1;
    if (indexOfPrevious < 0){
      return
    }
    fromUpDown(rowWithEmptyIndex, indexOfEmptyCell, indexOfPrevious)
  };
  function moveDown() {
    var rowWithEmptyIndex = getEmptyCellRow();
    var indexOfEmptyCell = getEmptyCell();
    var indexOfPrevious = rowWithEmptyIndex + 1;
    if (indexOfPrevious > currentState.length-1) {
      return
    };
    fromUpDown(rowWithEmptyIndex, indexOfEmptyCell, indexOfPrevious);
  };

  function moveRight() {
    var rowWithEmptyIndex = getEmptyCellRow();
    var indexOfEmptyCell = getEmptyCell();
    var indexOfPrevious = currentState[rowWithEmptyIndex].indexOf(0) + 1;
    if (indexOfPrevious < currentState[rowWithEmptyIndex].length) {
      fromLeftRight(rowWithEmptyIndex, indexOfEmptyCell, indexOfPrevious);
    }
  };

  function moveSomething(e) {
    switch (e.keyCode) {
      case ARROW_RIGHT:
        moveRight();
        break;
      case ARROW_DOWN:
        moveDown();
        break;
      case ARROW_LEFT:
        moveLeft()
        break;
      case ARROW_UP:
        moveUp();
        break;
    }
    
    renderBoard();
    compareArray();
  }
  function compareArray(){
    for (var i = 0; i < DEFAULT_STATE.length; i++) {
      for (var j = 0; j < currentState.length; j++) {
        if (currentState[i][j] === DEFAULT_STATE[i][j]) {
          console.log("true")
        } else {
          console.log("false")
        }
      }
    }
   

  }
  
  shuffleBtn.addEventListener("click", shuffle);
  window.addEventListener("keydown", moveSomething, false);
})()