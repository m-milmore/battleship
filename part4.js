const pressAnyKey = require("press-any-key");
const rs = require("readline-sync");
const utils = require("./utils.js");

const re = /^[a-jA-J]{1}([1-9]|10){1}$/;
const unitGridX = 10;
const unitGridY = 10;
const arrayOfShips = [
    { shipSize: 2, quantity: 1 },
    { shipSize: 3, quantity: 2 },
    { shipSize: 4, quantity: 1 },
    { shipSize: 5, quantity: 1 },
];

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function isCoordinatesAvailable(shipCoordinates, fleet) {
    for (const ship of fleet) {
        for (const coordinates of ship) {
            if (shipCoordinates === coordinates) {
                return false;
            }
        }
    }
    return true;
}

function getRestOfShip(direction, shipCoordinates, shipSize, fleet) {
    let restOfShip = [];
    const first = shipCoordinates.substr(0, 1);
    const second = shipCoordinates.substr(1);
    const yCoord = first.charCodeAt();
    const xCoord = parseInt(second);

    switch (direction) {
        case "up":
            if (yCoord - shipSize < 97) return [];
            else {
                for (let i = 1; i < shipSize; i++) {
                    restOfShip.push(String.fromCharCode(yCoord - i) + second);
                }
            }
            break;
        case "down":
            if (yCoord + shipSize > 106) return [];
            else {
                for (let i = 1; i < shipSize; i++) {
                    restOfShip.push(String.fromCharCode(yCoord + i) + second);
                }
            }
            break;
        case "left":
            if (xCoord - shipSize < 1) return [];
            else {
                for (let i = 1; i < shipSize; i++) {
                    restOfShip.push(first + (xCoord - i));
                }
            }
            break;
        case "right":
            if (xCoord + shipSize > 10) return [];
            else {
                for (let i = 1; i < shipSize; i++) {
                    restOfShip.push(first + (xCoord + i));
                }
            }
            break;
        default:
            console.error(`${direction} is not a valid direction.`);
    }

    for (const coord of restOfShip) {
        if (!isCoordinatesAvailable(coord, fleet)) {
            return [];
        }
    }

    return restOfShip;
}

function newFleet() {
    const fleet = [];

    arrayOfShips.forEach(({ shipSize, quantity }) => {
        for (let i = 0; i < quantity; i++) {
            let placeShip = false;
            while (!placeShip) {
                let newShipCoordinates = [];
                const randomDirections = utils.getRandomDirections();
                let coordinatesAvailable = false;
                let shipCoordinates = "";
                while (!coordinatesAvailable) {
                    shipCoordinates =
                        String.fromCharCode(97 + getRandomInt(unitGridY)) +
                        (getRandomInt(unitGridX) + 1);
                    coordinatesAvailable = isCoordinatesAvailable(shipCoordinates, fleet);
                }
                newShipCoordinates.push(shipCoordinates);
                for (const dir of randomDirections) {
                    restOfShip = getRestOfShip(dir, shipCoordinates, shipSize, fleet);
                    if (restOfShip.length > 0) {
                        placeShip = true;
                        newShipCoordinates = newShipCoordinates.concat(restOfShip);
                        break;
                    }
                }
                if (placeShip) fleet.push(newShipCoordinates);
            }
        }
    });

    return fleet;
}

function locationAlreadyPicked(guesses, location) {
    for (const strike of guesses) {
        if (strike.coordinates === location) return true;
    }
    return false;
}

function shipAtLocation(fleet, location) {
    for (const ship of fleet) {
        if (ship.includes(location)) {
            return true;
        }
    }
    return false;
}

function Strike(coordinates, hit) {
    this.coordinates = coordinates;
    this.hit = hit;
}

function myTurnToStrike() {
    return rs.question("\nEnter a location to strike ie 'A2' ", {
            limit: re,
            limitMessage: "That's not a valid location.",
        })
        .toLowerCase();
}

function computerTurnToStrike(computerGuesses) {
    let newLocation = false;
    let coordinates = "";
    while (!newLocation) {
        coordinates = String.fromCharCode(97 + getRandomInt(unitGridY)) + (getRandomInt(unitGridX) + 1);
        if (!locationAlreadyPicked(computerGuesses, coordinates)) {
            newLocation = true;
        }
    }
    return coordinates;
}

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
            let ships = myTurn ? computerShips : myShips;
            const locationToStrike = myTurn ? myTurnToStrike() : computerTurnToStrike(computerGuesses);
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
                                ships[i].length === 0 ? console.log(sunkBattleshipMess) : console.log(hitMess);
                                break loop1;
                            }
                        }
                    }
                    ships = ships.filter(ship => ship.length > 0);
                    if (ships.length === 0) {
                        allBattleshipsDestroyed = true;
                    }
                } else {
                    guesses.push(new Strike(locationToStrike, "O"));
                    console.log(missMess);
                }
            }
            if (myTurn) {
                computerShips = ships;
                myGuesses = guesses;
            } else {
                myShips = ships;
                computerGuesses = guesses;
            }
            if (myTurn) {
                console.log("Computer'ships", computerShips);
                console.log(utils.printGrid(myGuesses));
            }
        }

        const playAgainMess = myTurn ?
            "You have destroyed all battleships. YOU WIN ! Would you like to play again? Y/N " :
            "The computer has destroyed all your battleships. YOU LOSE ! Would you like to play again? Y/N ";

        playAgain = rs.keyInYNStrict(playAgainMess, {
            guide: false,
            caseSensitive: false,
        });
    }
}

pressAnyKey("Press any key to start the game.").then(() => playGame());