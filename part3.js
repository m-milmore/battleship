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

function locationAlreadyPicked(guessed, location) {
    return guessed.some((loc) => loc === location);
}

function shipAtLocation(fleet, location) {
    for (const ship of fleet) {
        if (ship.includes(location)) {
            return true;
        }
    }
    return false;
}

function playGame() {
    let playAgain = true;

    while (playAgain) {
        let allBattleshipsDestroyed = false;
        const guessed = [];
        let fleet = newFleet();
        console.log(fleet);

        while (!allBattleshipsDestroyed) {
            const locationToStrike = rs
                .question("Enter a location to strike ie 'A2' ", {
                    limit: re,
                    limitMessage: "That's not a valid location.",
                })
                .toLowerCase();

            if (locationAlreadyPicked(guessed, locationToStrike)) {
                console.log("You have already picked this location. Miss!");
            } else {
                guessed.push(locationToStrike);
                if (shipAtLocation(fleet, locationToStrike)) {
                    for (let i = 0; i < fleet.length; i++) {
                        for (let j = 0; j < fleet[i].length; j++) {
                            if (fleet[i].includes(locationToStrike)) {
                                fleet[i] = fleet[i].filter(
                                    (coordinates) => coordinates !== locationToStrike
                                );
                                if (fleet[i].length === 0) {
                                    console.log(
                                        `Hit. You have sunk a battleship. ${
                      fleet.length - 1
                    } ship(s) remaining.`
                                    );
                                } else {
                                    console.log("You have hit a battleship!");
                                }
                            }
                        }
                    }
                    fleet = fleet.filter((ship) => ship.length > 0);
                    console.log(fleet);
                    if (fleet.length === 0) {
                        allBattleshipsDestroyed = true;
                    }
                } else {
                    console.log("You have missed!");
                }
            }
        }

        playAgain = rs.keyInYNStrict(
            "You have destroyed all battleships. Would you like to play again? Y/N ", {
                guide: false,
                caseSensitive: false,
            }
        );
    }
}

pressAnyKey("Press any key to start the game.").then(() => playGame());