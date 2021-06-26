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

module.exports = {
    getRandomDirections
}