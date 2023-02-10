document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const width = 8;
  const squares = [];
  const candyColors = ["red", "yellow", "orange", "green", "blue"];

  //   create Board
  function createBoard() {
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement("div");
      square.setAttribute("draggable", true);
      square.setAttribute("id", i);
      let randomColor = Math.floor(Math.random() * candyColors.length);
      square.style.backgroundColor = candyColors[randomColor];
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
    colorBeingDragged = this.style.backgroundColor;
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
    colorBeingReplaced = this.style.backgroundColor;
    squares[squareIdBeingDragged].style.backgroundColor = colorBeingReplaced;
    this.style.backgroundColor = colorBeingDragged;
    // squares[squareIdBeingReplaced].style.backgroundColor = colorBeingDragged;
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
      squares[squareIdBeingReplaced].style.backgroundColor = colorBeingReplaced;
      squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged;
    } else {
      squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged;
    }
  }
});
