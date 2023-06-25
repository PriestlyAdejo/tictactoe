// import Game from "./Game.js"

// Getting Form Input
document.addEventListener('DOMContentLoaded', function() {
    // Updating devious meter 
    updateDeviousMeter()
    
    // Form Values
    const $form = document.getElementById("options")
    const $formSubmit = document.getElementById("submit-form")

    // Pages
    const $gameboard = document.querySelector(".gameboard")
    const $startmenu = document.querySelector(".startmenu")

    // Get Form Elements
    let $formData;
    function getFormData() {
        const playerName = document.getElementById('playerName');
        const cpuDifficulty = document.querySelector('input[name="cpuDifficulty"]:checked');
        const gameBoardSize = document.getElementById('boardSizeRange');
        const deviousness = document.getElementById('deviousness');
        const formObj = {
            playerName: playerName.value,
            cpuDifficulty: cpuDifficulty.value,
            gameBoardSize: gameBoardSize.value,
            deviousness: deviousness.value
        }
        let validation = validForm(formObj);

        // Event listener for input
        playerName.addEventListener('input', function() {
            if (!validation) {
                console.log("Invalid username please try again!");
                getFormData();
            }
        });

        // Event listener press enter
        document.addEventListener('keypress', function(e) {
            if (e.key == "Enter") {
                if (!validation) {
                    console.log("Invalid username please try again!");
                    getFormData();
                }
            }
        });

        return formObj
    };
    
    // Checking if form is valid
    function validForm(formObj) {
        if ((formObj["playerName"].replace(/\s/g, '') == "") ||
            (formObj["playerName"].length == 0)) return false
        return true
    }

    // Event listener for game board size range change
    document.getElementById('boardSizeRange').addEventListener('input', updateDeviousMeter);

    // Event listener for CPU difficulty change
    document.querySelectorAll('input[name="cpuDifficulty"]').forEach(function(radio) {
        radio.addEventListener('change', updateDeviousMeter);
    });

    // Check for submit
    $formSubmit.addEventListener('click', function(e) {
        e.preventDefault();
        $formData = getFormData();
        togglePage($startmenu, $gameboard);
        console.log($formData);
    });
    
    // Toggle next page
    function togglePage(currentPage, nextPage) {
        currentPage.classList.add('hidden');
        nextPage.classList.remove('hidden');

        console.log(currentPage.classList)
    }

    // Get difficulty word
    function getDifficultyNum(word) {
        return (word == "Lovecraftian") ? 3: (word == "Orwellian") ? 2: 1
    }

    // Update devious meter
    function updateDeviousMeter() {
        const gameBoardSize = parseInt(document.getElementById('boardSizeRange').value);
        const cpuDifficulty = getDifficultyNum(document.querySelector('input[name="cpuDifficulty"]:checked').value);
        const deviousness = Math.round(((gameBoardSize/20 + cpuDifficulty/3)/2)*100);
        document.getElementById('deviousness').value = deviousness;
    }
      
    

    /* Or do all at once --- Using JSON
    // Update Devious Meter From Form Elements

    // Set Player name and symbol in Game

    // Set CPU difficulty

    // Set gameboard size
    */

    // Render - Animate pages

    // Toggle the hidden pages (start and game pages)

    // Play Game -- Other Logic Available in other functions

    // Match over? Play Again!

});


































// Testing Game works
// const game = new Game();
// game.play();