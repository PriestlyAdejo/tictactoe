// Import Game
import Game from "./Game.js";

// Getting Form Input
document.addEventListener("DOMContentLoaded", function () {
  // Updating devious meter
  updateDeviousMeter();

  // Form Values
  const $form = document.getElementById("options");
  const $formSubmit = document.getElementById("submit-form");

  // Pages
  const $gameboard = document.querySelector(".gameboard");
  const $startmenu = document.querySelector(".startmenu");

  // Get Form Elements
  let $formData;
  function getFormData() {
    const playerName = document.getElementById("playerName");
    const playerSymbol = document.querySelector('input[name="playerSymbol"]:checked');
    const cpuDifficulty = document.querySelector('input[name="cpuDifficulty"]:checked');
    const gameBoardSize = document.getElementById("boardSizeRange");
    const deviousness = document.getElementById("deviousness");
    const formObj = {
      playerName: playerName.value,
      playerSymbol: playerSymbol.value,
      cpuDifficulty: cpuDifficulty.value,
      gameBoardSize: gameBoardSize.value,
      deviousness: deviousness.value,
    };
    let validation = validForm(formObj);

    // Event listener for input
    playerName.addEventListener("input", function () {
      if (!validation) {
        console.log("Invalid username please try again!");
        getFormData();
      }
    });

    // Event listener press enter
    document.addEventListener("keypress", function (e) {
      if (e.key == "Enter") {
        if (!validation) {
          console.log("Invalid username please try again!");
          getFormData();
        }
      }
    });
    return formObj;
  }

  // Checking if form is valid
  function validForm(formObj) {
    if (formObj["playerName"].replace(/\s/g, "") == "" || formObj["playerName"].length == 0) return false;
    return true;
  }

  // Event listener for game board size range change
  document.getElementById("boardSizeRange").addEventListener("input", updateDeviousMeter);

  // Event listener for CPU difficulty change
  document.querySelectorAll('input[name="cpuDifficulty"]').forEach(function (radio) {
    radio.addEventListener("change", updateDeviousMeter);
  });

  // Check for submit then move to next page
  $formSubmit.addEventListener("click", function (e) {
    e.preventDefault();
    $formData = getFormData();
    togglePage($startmenu, $gameboard);

    // Creating Board
    createGameBoard($formData.gameBoardSize);
    console.log($formData);

    // Adding event listeners to each cell
    $gameboard.addEventListener("click", function (e) {
        const cell = e.target;

      if (isValidPosition(cell)) {
        addPiece(cell);
        if (isGameOver()) {
          // Game over logic here
        } else {
          // CPU's turn logic here
        }
      }
    });

    handleHovers()
    
    function handleHovers() {
        let $cells = document.querySelectorAll(".cell");
        $cells.forEach(function (cell) {
        // Checks if postion is valid before adding css classes for showing things
        if (isValidPosition(cell)) {
            cell.addEventListener("mouseover", function () {
            if (isPlayerTurn()) {
                addHoverPiece(cell);
            }
            });
            cell.addEventListener("mouseout", function () {
            if (isPlayerTurn()) {
                removeHoverPiece(cell);
            }
            });
        }
        });
    }
    
  });

  function isValidPosition(cell) {
    return !cell.classList.contains("addedPiece");
  }

  function addHoverPiece(cell) {
    const symbol = $formData.playerSymbol;
    cell.textContent = symbol;
    cell.classList.add("hover");
  }

  function removeHoverPiece(cell) {
    cell.textContent = "";
    cell.classList.remove("hover");
  }

  function addPiece(cell) {
    const symbol = $formData.playerSymbol;
    cell.textContent = symbol;
    cell.classList.add("addedPiece");
  }

  // Check if it's the player's turn
  function isPlayerTurn() {
    // Add your logic here to determine if it's the player's turn
    return true; // For now, always return true to simulate the player's turn
  }

  // Check if the game is over
  function isGameOver() {
    // Add your logic here to determine if the game is over
    return false; // For now, always return false to continue the game
  }

  // Toggle next page
  function togglePage(currentPage, nextPage) {
    currentPage.classList.add("hidden");
    nextPage.classList.remove("hidden");

    console.log(currentPage.classList);
  }

  // Get difficulty word
  function getDifficultyNum(word) {
    return word == "Lovecraftian" ? 3 : word == "Orwellian" ? 2 : 1;
  }

  // Update devious meter
  function updateDeviousMeter() {
    const gameBoardSize = parseInt(document.getElementById("boardSizeRange").value);
    const cpuDifficulty = getDifficultyNum(document.querySelector('input[name="cpuDifficulty"]:checked').value);
    const deviousness = Math.round(((gameBoardSize / 20 + cpuDifficulty / 3) / 2) * 100);
    document.getElementById("deviousness").value = deviousness;
  }

  function createGameBoard(dimension) {
    const gameBoardContainer = document.querySelector(".gameboard-container");
    console.log(gameBoardContainer.style.width);
    gameBoardContainer.innerHTML = ""; // Clear any existing content

    // Set CSS grid properties
    gameBoardContainer.style.gridTemplateColumns = `repeat(${dimension}, 1fr)`;
    gameBoardContainer.style.gridTemplateRows = `repeat(${dimension}, 1fr)`;

    // Generate game cells
    for (let i = 0; i < dimension; i++) {
      for (let j = 0; j < dimension; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.row = i;
        cell.dataset.column = j;
        gameBoardContainer.appendChild(cell);
      }
    }
  }

  // Render - Animate pages

  // Toggle the hidden pages (start and game pages)

  // Play Game -- Other Logic Available in other functions

  // Match over? Play Again!
});