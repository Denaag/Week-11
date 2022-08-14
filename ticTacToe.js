//class that represent the view and the display of the gameboard

//class contains all of the game logic
export default class Game {
    constructor() {
        this.turn = "X"; //starting turn is X
        this.board = new Array(9).fill(null); //starting board is an array of 9 elements with a default value of no moves
    }

    nextTurn() {
        this.turn = this.turn === "X" ? "O" : "X";
    }

    makeMove(i) {
        if (!this.isInProgress()) {
            return;
        }

        if (this.board[i]) {
            return;
        }
        this.board[i] = this.turn;

        if (!this.findWinningCombination()) { //toggle to next turn if this.board[i] = this.turn was not a win
            this.nextTurn();
        }
    }

    findWinningCombination() { // combinations on board that can be a winner
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;

            if (this.board[a] && (this.board[a] === this.board[b] && this.board[a] === this.board[c])) {
                return combination;
            } 
        }
        return null;
    }

    isInProgress() {
        return !this.findWinningCombination() && this.board.includes(null);
    }
}

let game = new Game();

// console.log(game.turn);
// game.makeMove(0);
// console.log(game.board.join(","));
// game.nextTurn();
// console.log(game.turn);
// game.makeMove(6);
// game.makeMove(6);
// console.log(game.board.join(","))
// console.log(game.board);

class GameView {
    constructor(root) {
        this.root = root;
        this.root.innerHTML = `
        <div class="header">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <div class="header__turn"></div>
                    </div>
                    <div class="col">
                        <div class="header__status alert alert-warning" role="alert"></div>
                    </div>
                    <div class="col">
                        <button class="header__restart btn btn-success">Refresh</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="board">
            <div class="board__tile" data-index="0"></div>
            <div class="board__tile" data-index="1"></div>
            <div class="board__tile" data-index="2"></div>
            <div class="board__tile" data-index="3"></div>
            <div class="board__tile" data-index="4"></div>
            <div class="board__tile" data-index="5"></div>
            <div class="board__tile" data-index="6"></div>
            <div class="board__tile" data-index="7"></div>
            <div class="board__tile" data-index="8"></div>
        </div>
        `;

        this.onTileClick = undefined;
        this.onRestartClick = undefined;

        this.root.querySelectorAll(".board__tile").forEach(tile => {
            tile.addEventListener("click", () => {
                if (this.onTileClick) {
                    this.onTileClick(tile.dataset.index);
                }
            });
        });

        this.root.querySelector(".header__restart").addEventListener("click", () => {
            if (this.onRestartClick) {
                this.onRestartClick();
            }
        });
    }

    update(game) {
        this.updateTurn(game);
        this.updateStatus(game);
        this.updateBoard(game);

    }

    updateTurn(game) {
        this.root.querySelector(".header__turn").textContent = `${game.turn}'s turn`;
    }
    updateStatus(game) {
        let status = "In Progress";

        if (game.findWinningCombination()) {
            status = `${game.turn} is the Winner!`;
        } else if (!game.isInProgress()) {
            status = "It's a tie!"
        }

        this.root.querySelector(".header__status").textContent = status;
    }

    updateBoard(game){
        const winningCombination = game.findWinningCombination();

        for (let i = 0; i < game.board.length; i++) {
            const tile = this.root.querySelector(`.board__tile[data-index="${i}"]`);

            tile.classList.remove("board_tile--winner");
            tile.textContent = game.board[i];

            if (winningCombination && winningCombination.includes(i)) {
                tile.classList.add("board_tile--winner");
            }
        }
    }
}

let gameView = new GameView(document.getElementById("app"));

gameView.onTileClick = function (i) {
    //console.log(`Tile Clicked: ${i}`);
    game.makeMove(i);
    gameView.update(game);
}

gameView.onRestartClick = function () {
    //console.log("Game is restarted!")
    game = new Game();
    gameView.update(game);
}

gameView.update(game);