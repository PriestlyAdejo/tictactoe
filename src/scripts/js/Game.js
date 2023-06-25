import GameBoard from "./GameBoard.js"
import Player from './Player.js';

export default class Game {
    constructor () {
        // In future can tract local storage and not have to create new users
        this.gameBoard = new GameBoard();
        this.players = [
        new Player('Player 1', 'X'),
        new Player('Player 2', 'O')
        ];

        // Put players in array handle turns by indexing array
        this.currentPlayerIndex = 0;
        this.currentPlayer = this.players[this.currentPlayerIndex];
    }

    // Getting all objects
    checkWorking() {
        this.gameBoard.display()
        console.log(this)
    }

    // Handling playing game
    play() {
        this.gameBoard.display();

        while (!this.gameBoard.isBoardFull()) {
            this.getNextMove();
            this.gameBoard.display();
            if (this.gameBoard.hasWinningCondition()) {
                console.log(`${this.currentPlayer.name} wins!`);
                return
            }
            this.switchTurn();
        }
        console.log("It's a draw!")
    }
        
    getNextMove() {
        console.log(`${this.currentPlayer.name}, It's now your turn!`)
        let playerRow = prompt(`Please enter a row - (1-${this.gameBoard.cells.length})`)-1
        let playerCol = prompt(`Please enter a col - (1-${this.gameBoard.cells.length})`)-1
        
        if (this.isValidMove(playerRow, playerCol)) {
            this.gameBoard.putPiece(playerRow, playerCol, this.currentPlayer.symbol)
        } else {
            console.log("Invalid move, please try again.")
            this.getNextMove()
        }
    }
    
    isValidMove(playerRow, playerCol) {
        return (
            playerRow >= 0 &&
            playerRow <= this.gameBoard.dims &&
            playerCol >= 0 &&
            playerCol <= this.gameBoard.dims &&
            this.gameBoard.isCellEmpty(playerRow, playerCol)
            )
    }

    switchTurn() {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
        this.currentPlayer = this.players[this.currentPlayerIndex];
    }
}