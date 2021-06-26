const getRandomDirections = function() {
    const directions = [];
    const numberOfDirections = 4;

    function getRandomInt(max) {
        randomInt = Math.floor(Math.random() * max);
        switch (randomInt) {
            case 0:
                return "up";
            case 1:
                return "down";
            case 2:
                return "left";
            case 3:
                return "right";
            default:
                console.error(`${randomInt} is not a valid number.`);
        }
    }

    while (directions.length < numberOfDirections) {
        direction = getRandomInt(numberOfDirections);
        if (!directions.includes(direction)) {
            directions.push(direction);
        }
    }

    return directions;
};

const printGrid = function(guesses) {
    const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

    console.log("\nYour guesses:");
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

    return "";
}

module.exports = {
    getRandomDirections,
    printGrid
}