document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const scoreDisplay = document.getElementById("score");
  const width = 8;
  const squares = [];
  const candyColors = [
    "url(images/alternative-blue.png)",
    "url(images/alternative-green.png)",
    "url(images/alternative-orange.png)",
    "url(images/alternative-purple.png)",
    "url(images/alternative-red.png)",
    "url(images/alternative-yellow.png)",
  ];
  const dropAudio = new Audio("audio/stone-dropping-6843.mp3");
  const swooshAudio = new Audio("audio/quick-swhooshing-noise-80898.mp3");
  let score = 0;

  //   create Board
  function createBoard() {
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement("div");
      square.setAttribute("draggable", true);
      square.setAttribute("id", i);
      let randomColor = Math.floor(Math.random() * candyColors.length);
      square.style.backgroundImage = candyColors[randomColor];
      grid.appendChild(square);

      squares.push(square);
    }
  }
  createBoard();
  // Drag the candies
  let colorBeingDragged;
  let colorBeingReplaced;
  let squareIdBeingDragged;
  let squareIdBeingReplaced;

  squares.forEach((square) => square.addEventListener("dragstart", dragStart));
  squares.forEach((square) => square.addEventListener("dragend", dragEnd));
  squares.forEach((square) => square.addEventListener("dragover", dragOver));
  squares.forEach((square) => square.addEventListener("dragenter", dragEnter));
  squares.forEach((square) => square.addEventListener("dragleave", dragLeave));
  squares.forEach((square) => square.addEventListener("drop", dragDrop));

  function dragStart() {
    colorBeingDragged = this.style.backgroundImage;
    squareIdBeingDragged = parseInt(this.id);
    console.log("this", this);
    console.log(colorBeingDragged);
    console.log(this.id, "dragstart");
  }
  function dragOver(e) {
    e.preventDefault();
    console.log(this.id, "dragOver");
  }
  function dragEnter(e) {
    e.preventDefault();
    console.log(this.id, "dragEnter");
  }
  function dragLeave(e) {
    e.preventDefault();
    console.log(this.id, "dragLeave");
  }
  function dragDrop(e) {
    // e.preventDefault();
    console.log(this.id, "dragDrop");
    squareIdBeingReplaced = +this.id;
    colorBeingReplaced = this.style.backgroundImage;
    squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced;
    this.style.backgroundImage = colorBeingDragged;
    dropAudio.play();
    // squares[squareIdBeingReplaced].style.backgroundImage = colorBeingDragged;
    // checkColumnForFour();
    // checkRowForFour();
    // checkRowForThree();
    // checkColumnForThree();
  }
  function dragEnd(e) {
    // e.preventDefault();
    console.log(this.id, "dragEnd");
    let validMoves = [
      squareIdBeingDragged - 1,
      squareIdBeingDragged - width,
      squareIdBeingDragged + 1,
      squareIdBeingDragged + width,
    ];
    let validMove = validMoves.includes(squareIdBeingReplaced);
    if (squareIdBeingReplaced && validMove) {
      squareIdBeingReplaced = null;
    } else if (squareIdBeingReplaced && !validMove) {
      squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced;
      squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
    } else {
      squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
    }
  }

  function moveDown() {
    for (i = 0; i < 55; i++) {
      if (squares[i + width].style.backgroundImage === "") {
        squares[i + width].style.backgroundImage =
          squares[i].style.backgroundImage;
        squares[i].style.backgroundImage = "";
        dropAudio.pause();
        swooshAudio.play();
        const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
        const isFirstRow = firstRow.includes(i);
        if (isFirstRow && squares[i].style.backgroundImage === "") {
          let randomColor = Math.floor(Math.random() * candyColors.length);
          squares[i].style.backgroundImage = candyColors[randomColor];
        }
      }
    }
  }
  // /check for matches
  // check for row of 3
  function checkRowForThree() {
    for (let i = 0; i < 61; i++) {
      let rowOfThree = [i, i + 1, i + 2];
      let decidedColor = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === "";
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31];
      if (notValid.includes(i)) continue;
      if (
        rowOfThree.every(
          (index) =>
            squares[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
        score += 3;
        scoreDisplay.innerHTML = score;
        rowOfThree.forEach((index) => {
          squares[index].style.backgroundImage = "";
        });
      }
    }
  }
  // check for column of 3
  function checkColumnForThree() {
    for (let i = 0; i < 47; i++) {
      let columnOfThree = [i, i + width, i + width * 2];
      let decidedColor = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === "";
      if (
        columnOfThree.every(
          (index) =>
            squares[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
        score += 3;
        scoreDisplay.innerHTML = score;
        columnOfThree.forEach((index) => {
          squares[index].style.backgroundImage = "";
        });
      }
    }
  }
  // check for row of 3
  function checkRowForFour() {
    for (let i = 0; i < 60; i++) {
      let rowOfFour = [i, i + 1, i + 2, i + 3];
      let decidedColor = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === "";
      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31];
      if (notValid.includes(i)) continue;
      if (
        rowOfFour.every(
          (index) =>
            squares[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
        score += 4;
        scoreDisplay.innerHTML = score;
        rowOfFour.forEach((index) => {
          squares[index].style.backgroundImage = "";
        });
      }
    }
  }
  // check for column of 4
  function checkColumnForFour() {
    for (let i = 0; i < 47; i++) {
      let columnOfFour = [i, i + width, i + width * 2, width * 3];
      let decidedColor = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === "";
      if (
        columnOfFour.every(
          (index) =>
            squares[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
        score += 4;
        scoreDisplay.innerHTML = score;
        columnOfFour.forEach((index) => {
          squares[index].style.backgroundImage = "";
        });
      }
    }
  }
  checkRowForThree();
  checkColumnForThree();
  checkRowForFour();
  checkColumnForFour();
  window.setInterval(() => {
    moveDown();
    checkRowForFour();
    checkColumnForFour();
    checkRowForThree();
    checkColumnForThree();
  }, 100);
});
