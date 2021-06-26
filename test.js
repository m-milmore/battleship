const utils = require("./utils.js");
const part4 = require("./part4.js");

const first = "a10".substr(0, 1);
const second = "a10".substr(1);
const yCoord = first.charCodeAt();
const xCoord = parseInt(second);
// console.log(first, second);
const restOfShip = [];
// console.log(restOfShip.length);

function gridBluePrint() {
    console.log("    1   2   3   4   5   6   7   8   9  10  ");
    console.log("  -----------------------------------------");
    console.log("A |   |   |   |   |   |   |   |   |   |   |");
    console.log("  -----------------------------------------");
    console.log("B |   |   |   |   |   |   |   |   |   |   |");
    console.log("  -----------------------------------------");
    console.log("C |   |   |   |   |   |   |   |   |   |   |");
    console.log("  -----------------------------------------");
    console.log("D |   |   |   |   |   |   |   |   |   |   |");
    console.log("  -----------------------------------------");
    console.log("E |   |   |   |   |   |   |   |   |   |   |");
    console.log("  -----------------------------------------");
    console.log("F |   |   |   |   |   |   |   |   |   |   |");
    console.log("  -----------------------------------------");
    console.log("G |   |   |   |   |   |   |   |   |   |   |");
    console.log("  -----------------------------------------");
    console.log("H |   |   |   |   |   |   |   |   |   |   |");
    console.log("  -----------------------------------------");
    console.log("I |   |   |   |   |   |   |   |   |   |   |");
    console.log("  -----------------------------------------");
    console.log("J |   |   |   |   |   |   |   |   |   |   |");
    console.log("  -----------------------------------------");
}

const guesses = [];

function Strike(coordinates, hit) {
    this.coordinates = coordinates;
    this.hit = hit;
}

const strike1 = new Strike("a1", "X");
const strike2 = new Strike("a2", "O");
const strike3 = new Strike("d5", "X");
guesses.push(strike1);
guesses.push(strike2);
guesses.push(strike3);

function printGrid(guesses) {
    const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

    console.log("    1   2   3   4   5   6   7   8   9  10  ");
    for (let i = 0; i < 10; i++) {
        let col1 = "   ",
            col2 = "   ",
            col3 = "   ",
            col4 = "   ",
            col5 = "   ",
            col6 = "   ",
            col7 = "   ",
            col8 = "   ",
            col9 = "   ",
            col10 = "   ";
        guesses.forEach((strike) => {
            const row = strike.coordinates.substr(0, 1).toUpperCase();
            const col = strike.coordinates.substr(1);
            if (row === letters[i]) {
                switch (col) {
                    case "1":
                        col1 = ` ${strike.hit} `;
                        break;
                    case "2":
                        col2 = ` ${strike.hit} `;
                        break;
                    case "3":
                        col3 = ` ${strike.hit} `;
                        break;
                    case "4":
                        col4 = ` ${strike.hit} `;
                        break;
                    case "5":
                        col5 = ` ${strike.hit} `;
                        break;
                    case "6":
                        col6 = ` ${strike.hit} `;
                        break;
                    case "7":
                        col7 = ` ${strike.hit} `;
                        break;
                    case "8":
                        col8 = ` ${strike.hit} `;
                        break;
                    case "9":
                        col9 = ` ${strike.hit} `;
                        break;
                    case "10":
                        col10 = ` ${strike.hit} `;
                        break;
                    default:
                        console.error(`${col} is invalid.`);
                }
            }
        });
        console.log("  -----------------------------------------");
        console.log(
            `${letters[i]} |${col1}|${col2}|${col3}|${col4}|${col5}|${col6}|${col7}|${col8}|${col9}|${col10}|`
        );
    }
    console.log("  -----------------------------------------");
}

// printGrid(guesses);

function playGame() {
    let playAgain = true;

    while (playAgain) {
        let myGuesses = [];
        let computerGuesses = [];
        let myShips = newFleet();
        let computerShips = newFleet();
        let allBattleshipsDestroyed = false;
        let myTurn = false;
        console.log("Computer'ships", computerShips);
        console.log(utils.printGrid(myGuesses));

        while (!allBattleshipsDestroyed) {
            myTurn = !myTurn;
            const guesses = myTurn ? myGuesses : computerGuesses;
            let ships = myTurn ? myShips : computerShips;
            const locationToStrike = myTurn ? myTurnToStrike() : computerTurnToStrike();
            const alreadyPickedMess = myTurn ?
                "You have already picked this location. Miss!\n" :
                "The computer already picked this location. Miss!\n";
            const sunkBattleshipMess = myTurn ?
                `Hit. You have sunk a battleship. ${computerShips.length - 1} ship(s) remaining.\n` :
                `Hit. The computer has sunk one of your battleships. ${myShips.length - 1} ship(s) remaining.\n`;
            const hitMess = myTurn ?
                "You have hit a battleship!\n" :
                "The computer has hit one of your battleships!\n";
            const missMess = myTurn ?
                "You have missed!\n" :
                "The computer has missed!\n";

            if (locationAlreadyPicked(guesses, locationToStrike)) {
                console.log(alreadyPickedMess);
            } else {
                if (shipAtLocation(ships, locationToStrike)) {
                    guesses.push(new Strike(locationToStrike, "X"));
                    loop1: for (let i = 0; i < ships.length; i++) {
                        for (let j = 0; j < ships[i].length; j++) {
                            if (ships[i].includes(locationToStrike)) {
                                ships[i] = ships[i].filter(coordinates => coordinates !== locationToStrike);
                                if (ships[i].length === 0) {
                                    console.log(sunkBattleshipMess);
                                } else { console.log(hitMess); }
                                break loop1;
                            }
                        }
                    }
                    ships = ships.filter((ship) => ship.length > 0);
                    if (ships.length === 0) {
                        allBattleshipsDestroyed = true;
                    }
                } else {
                    guesses.push(new Strike(locationToStrike, "O"));
                    console.log(missMess);
                }
            }
            if (myTurn) {
                myShips = ships;
                myGuesses = guesses;
            } else {
                computerSHips = ships;
                computerGuesses = guesses;
            }
            myTurn && console.log("Computer'ships", computerShips);
            myTurn && console.log(utils.printGrid(myGuesses));
        }

        const playAgainMess = myTurn ?
            "You have destroyed all battleships. YOU WIN ! Would you like to play again? Y/N " :
            "The computer has destroyed all your battleships. YOU LOSE ! Would you like to play again? Y/N ";

        playAgain = rs.keyInYNStrict(
            playAgainMess, {
                guide: false,
                caseSensitive: false,
            }
        );
    }
}