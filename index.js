const game_board = document.getElementById('game-board');
const restart_button = document.getElementById('restart-button');
const cards = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D'];

function checkCards(card_1, card_2) {
    return card_1 === card_2;
}

let card_1 = null;
let card_2 = null;
let lockBoard = false; // prevent clicking while checking

function gameloop(card_list, board, resetbutton) {
    // shuffle cards
    card_list.sort(() => 0.5 - Math.random());

    card_list.forEach(card => {
        const card_element = document.createElement('img');
        card_element.src = 'backside.png';
        card_element.dataset.value = card; // store card value
        board.appendChild(card_element);

        card_element.addEventListener('click', () => {
            if (lockBoard || card_element.src.includes("correct.png") || card_element === card_1) {
                return; // ignore clicks if locked or already matched
            }

            card_element.src = card_element.dataset.value + ".png";

            if (!card_1) {
                card_1 = card_element;
            } else {
                card_2 = card_element;
                lockBoard = true;

                if (checkCards(card_1.dataset.value, card_2.dataset.value)) {
                    console.log("Match found!");
                    card_1.src = "correct.png";
                    card_2.src = "correct.png";
                    card_1 = null;
                    card_2 = null;
                    lockBoard = false;
                } else {
                    console.log("No match!");
                    setTimeout(() => {
                        card_1.src = "backside.png";
                        card_2.src = "backside.png";
                        card_1 = null;
                        card_2 = null;
                        lockBoard = false;
                    }, 1000); // wait 1 second before hiding
                }
            }
        });
    });
    resetbutton.addEventListener('click', () => {
        // Clear the board
        game_board.innerHTML = "";

        // Reset variables
        card_1 = null;
        card_2 = null;
        lockBoard = false;

        // Restart the game
        gameloop(cards, game_board);
    });
}

gameloop(cards, game_board, restart_button);

