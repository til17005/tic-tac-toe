export default class Board {
  // construct default state of an empty game board
  constructor(state = ["", "", "", "", "", "", "", "", ""]) {
    this.state = state;
  }

  // create visual gamebaord within the console
  //TODO: rename function to consoleBoard
  printFormattedBoard() {
    let formattedString = "";
    this.state.forEach((cell, index) => {
      formattedString += cell ? ` ${cell} |` : "   |";
      if ((index + 1) % 3 === 0) {
        formattedString = formattedString.slice(0, -1);
        if (index < 8)
          formattedString +=
            "\n\u2015\u2015\u2015 \u2015\u2015\u2015 \u2015\u2015\u2015\n";
      }
    });
    console.log("%c" + formattedString, "color: #c11dd4;font-size:16px");
  }

  // this method checks to see if board is empty
  isEmpty() {
    return this.state.every((cell) => !cell);
  }

  // this methos checks to see if the board if full
  isFull() {
    return this.state.every((cell) => cell);
  }

  // insert game piece (x or o) in cell
  //TODO: rename function to insertGamePiece
  insert(symbol, position) {
    if (![0, 1, 2, 3, 4, 5, 6, 7, 8].includes(position)) {
      throw new Error("Cell index does not exist!");
    }
    if (!["x", "o"].includes(symbol)) {
      throw new Error("Only x's or o's allowed!");
    }
    if (this.state[position]) {
      return false;
    }
    this.state[position] = symbol;
    return true;
  }

  // return all available moves
  getAvailableMoves() {
    const moves = [];
    this.state.forEach((cell, index) => {
      if (!cell) moves.push(index);
    });
    return moves;
  }

  /*
   * check isEmpty and return false if the board is empty.
   * check for horizontal, vertical and diagonal wins.
   * if no win condition is true then check isFull.
   * if board is full and no winning conditions then it's a draw.
   */
  isTerminal() {
    // false if board in empty
    if (this.isEmpty()) return false;

    // check horizontal wins
    if (
      this.state[0] === this.state[1] &&
      this.state[0] === this.state[2] &&
      this.state[0]
    ) {
      return { winner: this.state[0], direction: "H", row: 1 };
    }
    if (
      this.state[3] === this.state[4] &&
      this.state[3] === this.state[5] &&
      this.state[3]
    ) {
      return { winner: this.state[3], direction: "H", row: 2 };
    }
    if (
      this.state[6] === this.state[7] &&
      this.state[6] === this.state[8] &&
      this.state[6]
    ) {
      return { winner: this.state[6], direction: "H", row: 3 };
    }

    // check vertical wins
    if (
      this.state[0] === this.state[3] &&
      this.state[0] === this.state[6] &&
      this.state[0]
    ) {
      return { winner: this.state[0], direction: "V", column: 1 };
    }
    if (
      this.state[1] === this.state[4] &&
      this.state[1] === this.state[7] &&
      this.state[1]
    ) {
      return { winner: this.state[1], direction: "V", column: 2 };
    }
    if (
      this.state[2] === this.state[5] &&
      this.state[2] === this.state[8] &&
      this.state[2]
    ) {
      return { winner: this.state[2], direction: "V", column: 3 };
    }

    // check diagonal wins
    if (
      this.state[0] === this.state[4] &&
      this.state[0] === this.state[8] &&
      this.state[0]
    ) {
      return { winner: this.state[0], direction: "D", diagonal: "main" };
    }
    if (
      this.state[2] === this.state[4] &&
      this.state[2] === this.state[6] &&
      this.state[2]
    ) {
      return { winner: this.state[2], direction: "D", diagonal: "counter" };
    }

    // if no wins but board isFull, it's a draw
    if (this.isFull()) {
      return { winner: "draw" };
    }

    // otherwise return false
    return false;
  }
}
