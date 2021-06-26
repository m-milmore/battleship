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

function printGrid() {
    const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

    console.log("    1   2   3   4   5   6   7   8   9  10  ");
    for (let i = 0; i < 10; i++) {
        console.log("  -----------------------------------------");
        console.log(`${letters[i]} |   |   |   |   |   |   |   |   |   |   |`);
    }
    console.log("  -----------------------------------------");
}

printGrid();