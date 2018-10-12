  var arr = [[1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 0]];
  const arrowRight = 37;
  const arrowDown = 38;
  const arrowLeft = 39;
  const arrowUp = 40;
  var btn = document.querySelector(".shuffle");
  btn.addEventListener("click", function () {
    shuffle()
  });
  function renderEl() {
    var main = document.querySelector(".main__box");
    main.innerHTML = "";
    for (var i = 0; i < arr.length; i++) {
      var outer = arr[i];
      for (var j = 0; j < outer.length; j++) {
        var span = document.createElement("span");
        if (outer[j] == 0) {
          span.innerHTML = " ";
          main.appendChild(span);
          span.classList.add("itmNumber", "empty");
        }
        else if (outer[j] == undefined || outer[j] == " ") {
          outer.splice(outer[j], 1)
        }
        else {
          span.innerHTML = outer[j];
          main.appendChild(span);
          span.classList.add("itmNumber");
        }
      }
    }
  }
  renderEl();
  function shuffle() {
    for (var i = 0; i < arr.length; i++) {
      var outer = arr[i];
      for (var j = 0; j < outer.length; j++) {
        var currentPass = outer.length
        var index, temp;
        while (currentPass > 0) {
          index = Math.floor(Math.random() * currentPass);
          currentPass--;
          temp = outer[currentPass];
          outer[currentPass] = outer[index];
          outer[index] = temp;
        }
      }
    }
    var currentPass = arr.length
    var index, temp;
    while (currentPass > 0) {
      index = Math.floor(Math.random() * currentPass);
      currentPass--;
      temp = arr[currentPass];
      arr[currentPass] = arr[index];
      arr[index] = temp;
    }
    renderEl();
  };


  function moveLeft() {
    arr.map(el => {
      var index = el.indexOf(0);
      var prevElem = index - 1;
      if (prevElem < 0) {
        return;
      }
      el[index] = el[prevElem];
      el[prevElem] = 0;
    })
  }

  function moveUp() {
    arr.map(el => {
      var index = el.indexOf(0);
      if (index !== -1) {
        var arrIndex = arr.indexOf(el);
        var prevArr = arrIndex - 1;
        var prevArrValue = arr[prevArr][index];
        var zeroNumIndex = arr[prevArr].indexOf(prevArrValue);
        el[index] = arr[prevArr][zeroNumIndex];
        arr[prevArr][zeroNumIndex] = 0;
      }
    })
  };
  function moveDown() {
    var index = arr.findIndex(el => {
      return el.indexOf(0) !== -1
    });
    var nexrArr = index + 1;
    var zeroIndex = arr[index].indexOf(0);
    arr[index][zeroIndex] = arr[nexrArr][zeroIndex];
    arr[nexrArr][zeroIndex] = 0;
  };
  function moveRight() {
    arr.map(el => {
      if (el.indexOf(0) != -1
        && el.indexOf(0) >= 0
        && el.indexOf(0) <= el.length) {
        var index = el.indexOf(0);
        var prevElem = index + 1;
        if (prevElem < el.length) {
          el[index] = el[prevElem];
          el[prevElem] = 0;
          return
        } else {
          return
        }
      }
    })
  };
  function arrowKeyMovement() {
    window.addEventListener("keydown", moveSomething, false);
    function moveSomething(e) {
      switch (e.keyCode) {
        case arrowRight:
          moveRight();
          renderEl()
          break;
        case arrowDown:
          moveDown();
          renderEl();
          break;
        case arrowLeft:
          moveLeft()
          renderEl()
          break;
        case arrowUp:
          moveUp();
          renderEl();
          break;
      }
    }
  }
  arrowKeyMovement();