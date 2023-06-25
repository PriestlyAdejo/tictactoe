export default class GameBoard {
    constructor (dims=3) {
        this.dims = dims
        this.cells = this.getCells(this.dims)
    }

    // Get the cells for board
    getCells(dims) {
        let board = [];
        for (let row=0; row<dims; row++) {
            board[row] = [];
            for (let col=0; col<dims; col++) {
                board[row][col] = "";
            }
        }

        return board
    }

    // Displaying board in console
    display() {
        const horizontalLine = '-------------';
        console.log(horizontalLine);

        for (let row = 0; row < this.cells.length; row++) {
            let rowStr = '|';

            for (let col = 0; col < this.cells[row].length; col++) {
                const symbol = this.cells[row][col] || ' ';
                rowStr += ` ${symbol} |`;
            }

        console.log(rowStr);
        console.log(horizontalLine);
        }
  }

    // Checking if cell is empty
    isCellEmpty(row, col) {
        console.log(`Printing Cells ${this.cells[row][col]}`)
        return (this.cells[row][col] == "") ? true : false
    }

    // Putting piece on board
    putPiece(row, col, playerPiece) {
        this.cells[row][col] = playerPiece;
    }

    // Checking if full
    isBoardFull() {
        for (let row of this.cells) {
            if (row.includes("")) {
                return false;
            }
        }
        return true;
    }

    // Checking for winning cond using graph search
    hasWinningCondition() {
        const visited = new Set();
        const directions = [
          [0, 1], // Right
          [0, -1], // Left
          [1, 0], // Down
          [-1, 0], // Up
          [1, 1], // Diagonal Down-Right
          [-1, -1], // Diagonal Up-Left
          [1, -1], // Diagonal Down-Left
          [-1, 1] // Diagonal Up-Right
        ];
    
        const dfs = (row, col, symbol, count) => {
          if (
            row < 0 ||
            row >= this.cells.length ||
            col < 0 ||
            col >= this.cells[row].length ||
            this.cells[row][col] !== symbol ||
            visited.has(`${row}-${col}`)
          ) {
            return false;
          }
    
          visited.add(`${row}-${col}`);
          count++;
    
          if (count === this.cells.length) {
            return true;
          }
    
          for (const [dx, dy] of directions) {
            if (dfs(row + dx, col + dy, symbol, count)) {
              return true;
            }
          }
    
          visited.delete(`${row}-${col}`);
          return false;
        };
    
        for (let row = 0; row < this.cells.length; row++) {
          for (let col = 0; col < this.cells[row].length; col++) {
            if (this.cells[row][col] !== '') {
              const symbol = this.cells[row][col];
              if (dfs(row, col, symbol, 0)) {
                return true;
              }
            }
          }
        }
    
        return false;
      }

    
}

