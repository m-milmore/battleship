const pressAnyKey = require("press-any-key");
const rs = require("readline-sync");

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function newFleet(numberOfShips) {
    const fleet = [];

    while (fleet.length < numberOfShips) {
        const shipCoordinates = String.fromCharCode(97 + getRandomInt(3)) + (getRandomInt(3) + 1);
        if (!fleet.includes(shipCoordinates)) {
            fleet.push(shipCoordinates);
        }
    }

    return fleet;
}

function locationAlreadyPicked(guessed, location) {
    return guessed.some(loc => loc === location);
}

function shipAtLocation(fleet, location) {
    return fleet.includes(location);
}

function playGame() {
    let playAgain = true;

    while (playAgain) {
        let allBattleshipsDestroyed = false;
        const guessed = [];
        let fleet = newFleet(2);
        console.log(fleet);

        while (!allBattleshipsDestroyed) {
            const locationToStrike = rs.question("Enter a location to strike ie 'A2' ", {
                limit: [/^(a|b|c|A|B|C){1}[1-3]{1}$/g],
                limitMessage: "That's not a valid location."
            }).toLowerCase();

            if (locationAlreadyPicked(guessed, locationToStrike)) {
                console.log("You have already picked this location. Miss!");
            } else {
                guessed.push(locationToStrike);
                if (shipAtLocation(fleet, locationToStrike)) {
                    fleet = fleet.filter(ship => ship !== locationToStrike);
                    if (fleet.length === 0) {
                        allBattleshipsDestroyed = true;
                    } else {
                        console.log("Hit. You have sunk a battleship. 1 ship remaining.");
                    }
                } else {
                    console.log("You have missed!");
                }
            }
        }

        playAgain = rs.keyInYNStrict("You have destroyed all battleships. Would you like to play again? Y/N ", {
            guide: false,
            caseSensitive: false
        });
    }
}

pressAnyKey("Press any key to start the game.").then(() => playGame());