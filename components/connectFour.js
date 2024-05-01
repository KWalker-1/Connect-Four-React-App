import React, { Component } from 'react';
import './connectFour.css'; // Import ConnectFour.css

class ConnectFour extends Component {
  constructor(props) {
    super(props);
    // Initialize state
    this.state = {
      initialMatrix: [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
      ],
      currentPlayer: 1
    };
  }

  fillBox = (e) => {
    const colValue = parseInt(e.target.getAttribute("data-col"));
    const { initialMatrix, currentPlayer } = this.state;
    const rows = document.querySelectorAll(".grid-row");

    try {
      let startCount = 5;
      while (startCount >= 0) {
        if (initialMatrix[startCount][colValue] === 0) {
          const currentRow = rows[startCount].querySelectorAll(".grid-box");
          currentRow[colValue].classList.add("filled", `player${currentPlayer}`);
          initialMatrix[startCount][colValue] = currentPlayer;
          if (this.winCheck(startCount, colValue)) {
            alert(`Player ${currentPlayer} wins!`);
            return true;
          }
          this.setState({ initialMatrix });
          this.setState(prevState => ({
            currentPlayer: prevState.currentPlayer === 1 ? 2 : 1
          }));
          return;
        }
        startCount--;
      }
      alert("Column full, select again");
    } catch (e) {
      alert("Error occurred while filling the box");
    }
  }


  setPiece = (startCount, colValue) => {
    const { initialMatrix, currentPlayer } = this.state;
    const rows = document.querySelectorAll(".grid-row");
    try {
      if (initialMatrix[startCount][colValue] !== 0) {
        startCount--;
        this.setPiece(startCount, colValue);
      } else {
        const currentRow = rows[startCount].querySelectorAll(".grid-box");
        currentRow[colValue].classList.add("filled", `player${currentPlayer}`);
        initialMatrix[startCount][colValue] = currentPlayer;
        if (this.winCheck(startCount, colValue)) {
          alert(`Player ${currentPlayer} wins!`);
          return true;
        }
      }
    } catch (e) {
      alert("Column full, select again");
    }
    this.gameOverCheck();
  }

  winCheck = (row, column) => {
    return (
      this.checkHorizontal(row, column) ||
      this.checkVertical(row, column) ||
      this.checkPositiveDiagonal(row, column) ||
      this.checkNegativeDiagonal(row, column)
    );
  }

  checkHorizontal = (row, column) => {
    const { initialMatrix, currentPlayer } = this.state;
    let count = 0;
    //const currentPlayer = initialMatrix[row][column];
    const COLUMNS = initialMatrix[row].length;

    for (let j = 0; j < COLUMNS; j++) {
      if (initialMatrix[row][j] === currentPlayer) {
        count++;
        if (count === 4) {
          return true;
        }
      } else {
        count = 0;
      }
    }
    return false;
  }

  checkVertical = (row, column) => {
    const { initialMatrix, currentPlayer } = this.state;
    let count = 0;
    const ROWS = initialMatrix.length;

    for (let i = 0; i < ROWS; i++) {
      if (initialMatrix[i][column] === currentPlayer) {
        count++;
        if (count === 4) {
          return true;
        }
      } else {
        count = 0;
      }
    }
    return false;
  }

  checkPositiveDiagonal = (row, column) => {
    const { initialMatrix, currentPlayer } = this.state;
    const ROWS = initialMatrix.length;
    const COLUMNS = initialMatrix[0].length;

    for (let i = row, j = column; i < ROWS && j < COLUMNS; i++, j++) {
      let count = 0;
      for (let m = i, n = j; m >= 0 && n >= 0; m--, n--) {
        if (initialMatrix[m][n] === currentPlayer) {
          count++;
          if (count === 4) {
            return true;
          }
        } else {
          count = 0;
        }
      }
    }
    return false;
  }

  checkNegativeDiagonal = (row, column) => {
    const { initialMatrix, currentPlayer } = this.state;
    const ROWS = initialMatrix.length;
    const COLUMNS = initialMatrix[0].length;

    for (let i = row, j = column; i >= 0 && j < COLUMNS; i--, j++) {
      let count = 0;
      for (let m = i, n = j; m < ROWS && n >= 0; m++, n--) {
        if (initialMatrix[m][n] === currentPlayer) {
          count++;
          if (count === 4) {
            return true;
          }
        } else {
          count = 0;
        }
      }
    }
    return false;
  }

  gameOverCheck = () => {
    //console.log("gameOverCheck");
    // Declare variable count, initialized to 0
    var count = 0;
    const { initialMatrix } = this.state;
    // Iterate through the 2d array initialMatrix
    // Write a for/of loop to iterate through the rows, loop control variable innerArray, in    2d array initialMatrix
    for (const innerArray of initialMatrix) {
      // If object innerArray, function every((val) != 0))
      if (innerArray.every(val => (val) !== 0)) {
        // increment variable count by 1
        count++;
      }
      // Else
      else {
        // return false
        return false;
      }
    }
    // If variable count is equal to 6
    if (count === 6) {
      const { message } = this.state;
      // Set constant message, property innerText, equal to "Game Over"
      message.innerText = "Game Over";
      // return false
      return false;
    }
  }

  createBoard = () => {
    const { initialMatrix } = this.state;
    return initialMatrix.map((row, rowIndex) => (
      <div key={rowIndex} className="grid-row">
        {row.map((cell, colIndex) => (
          <div
            key={colIndex}
            className="grid-box"
            data-row={rowIndex}
            data-col={colIndex}
            onClick={this.fillBox}
          ></div>
        ))}
      </div>
    ));
  };

  render() {
    return (
      <div className="wrapper">
        <div className="container">{this.createBoard()}</div>
        <div id="information">
          <div className="player-wrappers">
            <span>Player 1</span>
            <div className="player1"></div>
          </div>
          <div className="player-wrappers">
            <span>Player 2</span>
            <div className="player2"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default ConnectFour;
