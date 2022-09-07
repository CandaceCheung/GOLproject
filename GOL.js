const boxColor = 150;
let unitLength = 20;
const strokeColor = 111;
let columns;
let rows;
let currentBoard;
let nextBoard;
let loneliness = 2;
let overPopulation = 3;
let fr = 30;

//scale button 
document.querySelector("#scale").onchange = function (event) {
    unitLength = Number(event.target.value);
    setup();
};

function init() {
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            currentBoard[i][j] = 0;
            nextBoard[i][j] = 0;
        }
    }
}

function setup() {
    const canvas = createCanvas(windowWidth, windowHeight - 100);
    canvas.parent(document.querySelector("#canvas"));

    columns = floor(width / unitLength);
    rows = floor(height / unitLength);

    currentBoard = [];
    nextBoard = [];
    for (let i = 0; i < columns; i++) {
        currentBoard[i] = [];
        nextBoard[i] = [];
    }
    init();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

document.querySelector("#life-number").addEventListener("change", (e) => {
    loneliness = Number(e.target.value);
});

document.querySelector("#fd-number").addEventListener("input", () => {
    generate();
});

function draw() {
    background(255);
    generate();
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            if (currentBoard[i][j] == 1) {
                fill(boxColor);
            } else {
                fill(218);
            }
            stroke(strokeColor);
            rect(i * unitLength, j * unitLength, unitLength, unitLength);
        }
    }
}

function generate() {
    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
            let neighbors = 0;
            for (let i of [-1, 0, 1]) {
                for (let j of [-1, 0, 1]) {
                    if (i == 0 && j == 0) {
                        continue;
                    }
                    neighbors +=
                        currentBoard[(x + i + columns) % columns][
                            (y + j + rows) % rows
                        ];
                }
            }
            if (currentBoard[x][y] == 1 && neighbors < loneliness) {
                nextBoard[x][y] = 0;
            } else if (currentBoard[x][y] == 1 && neighbors > overPopulation) {
                nextBoard[x][y] = 0;
            } else if (currentBoard[x][y] == 0 && neighbors == 3) {
                nextBoard[x][y] = 1;
            } else {
                nextBoard[x][y] = currentBoard[x][y];
            }
        }
    }
    [currentBoard, nextBoard] = [nextBoard, currentBoard];
}

const shape = {
    ship: [
        [0, 1, 1],
        [1, 0, 1],
        [1, 1, 0],
    ],

    glider: [
        [0, 0, 1],
        [1, 0, 1],
        [0, 1, 1],
    ],

    boat: [
        [0, 1, 0],
        [1, 0, 1],
        [0, 1, 1],
    ],
};

function addShape(key) {
    const x = Math.round(random() * columns);
    const y = Math.round(random() * rows);
    for (let i = 0; i < shape[key].length; i++) {
        for (let j = 0; j < shape[key][i].length; j++) {
            currentBoard[(x + i) % columns][(y + j) % rows] = shape[key][i][j];
        }
    }
}

document.querySelector("#addButton").addEventListener("click", () => {
    const select = document.querySelector("#shape-type").value;
    addShape(select);
    // same as -> addShape(document.querySelector('#number').value)
});

//reset
document.querySelector("#reset-game").addEventListener("click", function () {
    initReset();
});
function initReset() {
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            currentBoard[i][j] = 0;
            nextBoard[i][j] = 0;
        }
    }
}
//stop function
document.querySelector("#stop").addEventListener("click", () => {
    noLoop();
});

//start
document.querySelector("#start").addEventListener("click", () => {
    loop();
});

//random
document.querySelector("#random-game").addEventListener("click", function () {
    randomGame();
});

function randomGame() {
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            currentBoard[i][j] = random() > 0.8 ? 1 : 0;
            nextBoard[i][j] = 0;
        }
    }
}

//mouse control //

function mouseDragged() {
    if (mouseX > unitLength * columns || mouseY > unitLength * rows) {
        return;
    }
    const x = Math.floor(mouseX / unitLength);
    const y = Math.floor(mouseY / unitLength);
    currentBoard[x][y] = 1;
    fill(boxColor);
    stroke(strokeColor);
    rect(x * unitLength, y * unitLength, unitLength, unitLength);
}

function mousePressed() {
    noLoop();
    mouseDragged();
}

function mouseReleased() {
    loop();
}

function mouseDragged() {
    if (mouseX > unitLength * columns || mouseY > unitLength * rows) {
        return;
    }
    const x = Math.floor(mouseX / unitLength);
    const y = Math.floor(mouseY / unitLength);
    console.log(currentBoard[x][y]);
    currentBoard[x][y] = 1;
    fill(boxColor);
    stroke(strokeColor);
    rect(x * unitLength, y * unitLength, unitLength, unitLength);
}
