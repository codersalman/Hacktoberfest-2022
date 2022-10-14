
// Helper functions implemented to give more varied options to a sudoku when function is called or required


// Shuffles the array: Used when the sudoku solve func is called
const shuffle = (array) => {
    let curIndex = array.length;
    let randomIndex;

    while (curIndex != 0) {
        randomIndex = Math.floor(Math.random() * curIndex);
        curIndex--;
        [array[curIndex], array[randomIndex]] = [array[randomIndex], array[curIndex]];
    }
    return array;
}

// Create a List of integers
const range = (start, stop, step) => Array.from({ length: ((stop - start) / step) + 1 }, (_, i) => start + (i * step));

// Check if the initial [row, col] value is equal to zero in return values inputted in it
//will have the colour blue
const isZero = (row, col) => {
    for (let slot of emptyCells) {
        if (slot.every((val, index) => val === [row, col][index])) {
            return true;
        }
    }
}

// Returns a random number between one value to another when called
const randInt = (min, max) => Math.floor(Math.random() * ((max - min) + 1)) + min;

// ======================== Helper functions ends

// Setting the sudoku canvas
const sudokuCanvas = document.getElementById('canvas-sudoku');
const dpr = window.devicePixelRatio || 1; // Helps create sharper text on canvas
const ctx = sudokuCanvas.getContext('2d');
let sudokuCanvasWidth = sudokuCanvas.getBoundingClientRect().width;
ctx.canvas.width = sudokuCanvasWidth * dpr;
ctx.canvas.height = sudokuCanvasWidth * dpr;
ctx.scale(dpr, dpr);

// Buttons
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');

// Message
const messages = document.querySelectorAll('[data-message]');
const timeTakenHTMLElement = document.getElementById('timeTaken');

const removeMessage = () => {
    // Lower message all messages
    messages.forEach(message => {
        const messagePopup = document.getElementById(message.id);
        messagePopup.style.transform = `translateY(0%)`;
        messagePopup.style.zIndex = `-2`;
    })
}

const displayMessage = (messageIdToBeDisplayed) => {
    removeMessage();
    // Raise up specified message
    const messageDisplayed = document.getElementById(messageIdToBeDisplayed);
    messageDisplayed.style.transform = `translateY(-100%)`;
    messageDisplayed.style.zIndex = `-1`;
}



// slider value
const speed = document.getElementById('speed');
const emptyBox = document.getElementById('empty-cell');
speed.value = 10;
emptyBox.value = randInt(1, 70);

// Slider Label and value
const currentSpeedValue = document.getElementById('speed-value');
currentSpeedValue.innerText = speed.value;

const currentEmptyCellCount = document.getElementById('empty-cell-count');
currentEmptyCellCount.innerText = emptyBox.value;


let boardNums = [[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0,],
[0, 0, 0, 0, 0, 0, 0, 0, 0,],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0]]

const emptyCells = []; // Stores up the clearable values (highlighted in blue)

const mouse = {
    x: 0,
    y: 0,
}

// current position of board that was clicked
const boardLocation = {
    col: 0,
    row: 0,

    // For the larger square
    largeRow: 0,
    largeCol: 0
}

// current position cell
const cellSize = {
    largeCell: sudokuCanvasWidth / 3,  // For the larger square 
    regularCell: sudokuCanvasWidth / 9,
}

// Operation Buttons
const operationBtn = {
    emptyBoard: document.getElementById('empty-board'),
    createBoard: document.getElementById('create-board'),
    resetBoard: document.getElementById('reset-board'),
}

let solvingActivity = false; // if the solving Animation is active
let noteActive = false; // Display notes 
let canBeSolved = true; // If the set sudoku can be solved
let boardIsValid = true; // if theres any misplaced number(s)
let stopSolving = false; // kills the visualize solving animation


// Event Listeners ==============================================

// Input number on specified cell when a number button is clicked
numberButtons.forEach(button => {
    const btnStyle = document.getElementById(button.id);
    btnStyle.style.transition = 'background-color 0.2s ease-in-out';

    button.addEventListener('click', () => {


        if (!solvingActivity) {
            removeMessage();
            boardNums[boardLocation.row][boardLocation.col] = parseInt(button.id);

            if (button.id === '0') {
                emptyCells.push([boardLocation.row, boardLocation.col]);
            }
            updateButtonStatus();
            updateCanvas();
        }
    })

    button.addEventListener('mouseenter', () => {
        if (!solvingActivity) {
            btnStyle.style.backgroundColor = 'hsl(211, 100%, 80%)';
        }
    })

    button.addEventListener('mouseleave', () => {
        if (!solvingActivity) {
            btnStyle.style.backgroundColor = 'hsl(211, 100%, 95%)';
        }
    })
})

operationButtons.forEach(button => {
    const btnStyle = document.getElementById(button.id);
    btnStyle.style.outline = '2px solid white';
    btnStyle.style.backgroundColor = 'rgb(240,240,240)';
    btnStyle.style.transition = 'outline-color 0.2s ease-in-out';

    const styleBtnHoverIn = () => {
        btnStyle.style.outline = '2px solid hsl(211, 100%, 40%)';
    }

    const styleBtnHoverOut = () => {
        btnStyle.style.outline = '2px solid white';
    }

    // Does a specified operation depending on the one clicked
    button.addEventListener('click', () => {
        if (!solvingActivity) {
            removeMessage();
            switch (button.id) {
                case 'empty-board':
                    if (emptyButtonState()) {
                        return;
                    }
                    noteActive = false;
                    removeAllValues();
                    btnStyle.style.outline = '2px solid white'; // hides outline after click
                    break;

                case 'create-board':
                    if (!resetAndCreateButtonState()) {
                        return;
                    }
                    createSudokuBoard();
                    btnStyle.style.outline = '2px solid white'; // hides outline after click
                    break;

                case 'reset-board':
                    if (!resetAndCreateButtonState()) {
                        return;
                    }
                    resetBoard();
                    btnStyle.style.outline = '2px solid white'; // hides outline after click
                    break;

                case 'quick-solve':
                    resetBoard();
                    validBoard();

                    if (boardIsValid) {
                        let startTime = performance.now();
                        solve(0);
                        let endTime = performance.now();
                        timeTakenHTMLElement.innerText = '';
                        timeTakenHTMLElement.innerText = `Time taken: ${endTime - startTime} ms`;
                        updateCanvas();
                        updateButtonStatus();
                        if (!canBeSolved) {
                            displayMessage('unsolvable');
                        } else {
                            displayMessage('solved');
                        }
                    } else {
                        displayMessage('invalid-board');
                    }
                    break;

                case 'visualize-solve':
                    resetBoard();
                    validBoard();

                    if (boardIsValid) {
                        btnStyle.style.outline = '2px solid hsl(0, 100%, 40%)';
                        solvingActivity = true;
                        displayMessage('solving');
                        solveAnim(0).then(() => {
                            solvingActivity = false;
                            updateCanvas();
                            updateButtonStatus();
                            btnStyle.style.outline = '2px solid white';
                            if (!canBeSolved && stopSolving == false) {
                                displayMessage('unsolvable');
                            } else if (canBeSolved && stopSolving == false) {
                                displayMessage('solved');
                            }
                            stopSolving = false;
                        })
                    } else {
                        displayMessage('invalid-board');
                    }


                    break;

                case 'generate':
                    GenerateSudoku();
                    break;
            }
            updateCanvas();
            updateButtonStatus();
        } else {
            if (button.id == 'visualize-solve') {
                stopSolving = true;
                btnStyle.style.outline = '2px solid white'; // hides outline while the mouse is over the button 
            }
        }

        if (button.id == 'notes') {
            if (!noteActive) {
                noteActive = true;
            } else {
                noteActive = false;
            }
            updateCanvas();
            updateButtonStatus();
        }
    })

    // ==== Button States ====================================
    button.addEventListener('mouseenter', () => {
        if (!solvingActivity) {

            // Checking if the button states of create and rest board is active 
            switch (button.id) {

                case 'empty-board':
                    if (!emptyButtonState()) {
                        styleBtnHoverIn();
                    }
                    break;

                case 'create-board':
                    if (resetAndCreateButtonState()) {
                        styleBtnHoverIn();
                    }
                    break;

                case 'reset-board':
                    if (resetAndCreateButtonState()) {
                        styleBtnHoverIn();
                    }
                    break;

                case 'quick-solve':
                    styleBtnHoverIn();
                    break;

                case 'generate':
                    styleBtnHoverIn();
                    break;

                case 'visualize-solve':
                    styleBtnHoverIn();
                    break;
            }
        }

        if (solvingActivity && button.id === 'visualize-solve') {
            btnStyle.style.outline = '2px solid hsl(0, 100%, 40%)';
        }

        if (button.id === 'notes') {
            styleBtnHoverIn();
        }
    })

    button.addEventListener('mouseleave', () => {
        styleBtnHoverOut();
    }
    )
})

// checks if the positions in the empty cell array contains a number greater than 0 or not
// (number in blue text) and defines the state of the create and reset board button (active or inactive)
function resetAndCreateButtonState() {
    for (zero of emptyCells) {
        row = zero[0];
        col = zero[1];
        if (boardNums[row][col] != 0) {
            operationBtn.createBoard.style.opacity = '1';
            operationBtn.createBoard.style.cursor = 'pointer';
            operationBtn.resetBoard.style.opacity = '1';
            operationBtn.resetBoard.style.cursor = 'pointer';
            return true;
        }
    }

    operationBtn.createBoard.style.opacity = '0.5';
    operationBtn.createBoard.style.cursor = 'default';
    operationBtn.resetBoard.style.opacity = '0.5';
    operationBtn.resetBoard.style.cursor = 'default';
    return false;
}

function emptyButtonState() {
    const styleEmptyBtn = document.getElementById('empty-board');
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (boardNums[row][col] !== 0) {
                styleEmptyBtn.style.opacity = '1';
                styleEmptyBtn.style.cursor = 'pointer';
                return false;
            }
        }
    }

    styleEmptyBtn.style.opacity = '0.5';
    styleEmptyBtn.style.cursor = 'default';
    return true;
}

// notes button indicator ====================
function notesActivity() {
    const notesCurrentState = document.getElementById('notes-activity');
    if (noteActive) {
        notesCurrentState.innerText = 'On';
        notesCurrentState.style.backgroundColor = '#0D7CD9';
        notesCurrentState.style.color = 'white';
    } else {
        notesCurrentState.innerText = 'Off';
        notesCurrentState.style.backgroundColor = 'rgb(240, 240, 240)';
        notesCurrentState.style.color = 'black';
    }
}
// =========================

// Solving state indicator
function solveState() {
    const solveState = document.getElementById('solve-state');
    if (solvingActivity) {
        solveState.innerText = 'Stop';
        solveState.style.backgroundColor = 'hsl(0, 100%, 90%)';
        solveState.style.color = 'hsl(0, 100%, 40%)';
    } else {
        solveState.innerText = 'Play';
        solveState.style.backgroundColor = 'hsl(211, 100%, 90%)';
        solveState.style.color = 'hsl(211, 100%, 40%)';
    }
}
// ===================

function disableBtns() {
    // Styles all the buttons with the exception of the visualize according to the solving activity
    if (solvingActivity) {
        numberButtons.forEach(number => {
            number.style.opacity = '0.5';
            number.style.cursor = 'default';
        })

        operationButtons.forEach(operation => {
            if (operation.id !== 'visualize-solve' && operation.id !== 'notes') {
                operation.style.opacity = '0.5';
                operation.style.cursor = 'default';
            }
        })

    } else {
        numberButtons.forEach(number => {
            number.style.opacity = '1';
            number.style.cursor = 'pointer';
        })

        operationButtons.forEach(operation => {
            if (operation.id === 'generate' || operation.id === 'quick-solve') {
                operation.style.opacity = '1';
                operation.style.cursor = 'pointer';
            }
        })
    }
}

// Activates and deactivates buttons according to the events specified
function updateButtonStatus() {
    resetAndCreateButtonState();
    emptyButtonState();
    notesActivity();
    solveState();
    disableBtns();
}

// ============= keyboard event listener
document.addEventListener('keydown', (e) => {
    const keyPressed = `${e.code}`;
    const valuePressed = keyPressed[keyPressed.length - 1];
    if (!solvingActivity) {
        removeMessage();
        switch (keyPressed) {

            case 'Backspace':
                boardNums[boardLocation.row][boardLocation.col] = 0;
                updateButtonStatus();
                updateCanvas();
                break;

            case 'ArrowDown':
                if (boardLocation.row < 8) {
                    boardLocation.row++;
                    boardLocation.largeRow = parseInt(boardLocation.row / 3);
                    updateButtonStatus();
                    updateCanvas();
                }
                break;

            case 'ArrowUp':
                if (boardLocation.row > 0) {
                    boardLocation.row--;
                    boardLocation.largeRow = parseInt(boardLocation.row / 3);
                    updateButtonStatus();
                    updateCanvas();
                }
                break;

            case 'ArrowLeft':
                if (boardLocation.col > 0) {
                    boardLocation.col--;
                    boardLocation.largeCol = parseInt(boardLocation.col / 3);
                    updateButtonStatus();
                    updateCanvas();
                }
                break;

            case 'ArrowRight':
                if (boardLocation.col < 8) {
                    boardLocation.col++;
                    boardLocation.largeCol = parseInt(boardLocation.col / 3);
                    updateButtonStatus();
                    updateCanvas();
                }
                break;
        }

        if ((valuePressed === '0' || keyPressed === 'Backspace') && !isZero(boardLocation.row, boardLocation.col)) {
            boardNums[boardLocation.row][boardLocation.col] = 0;
            emptyCells.push([boardLocation.row, boardLocation.col]);
            updateButtonStatus();
            updateCanvas();
        }

        if (!isNaN(valuePressed) && keyPressed[0] == 'D') {
            boardNums[boardLocation.row][boardLocation.col] = parseInt(valuePressed);
            updateButtonStatus();
            updateCanvas();
        }
    }
})
// ==============================

// draw board according to the size of the screen
window.addEventListener('resize', () => {
    sudokuCanvasWidth = sudokuCanvas.getBoundingClientRect().width;
    const dpr = window.devicePixelRatio || 1;
    ctx.canvas.width = sudokuCanvasWidth * dpr;
    ctx.canvas.height = sudokuCanvasWidth * dpr;
    cellSize.largeCell = sudokuCanvasWidth / 3;
    cellSize.regularCell = sudokuCanvasWidth / 9;
    ctx.scale(dpr, dpr);
    updateButtonStatus();
    updateCanvas();
})
// ===============================================

// get the coordinates of the mouse when clicked
sudokuCanvas.addEventListener('click', (event) => {
    if (!solvingActivity) {
        mouse.x = event.x;
        mouse.y = event.y;
        removeMessage();
        curPosClicked();
        updateButtonStatus();
        updateCanvas();
    }
})
// ================================================

// Range Sliders
speed.addEventListener('input', () => {
    currentSpeedValue.innerText = speed.value;
})

emptyBox.addEventListener('input', () => {
    currentEmptyCellCount.innerText = emptyBox.value;
})
// ======================

// Event Listeners End ==============================================

// Assigning empty cells to differentiate the blue numbers(values that will be cleared when selecting reset btn) and black numbers
function assignEmptyCells() {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (boardNums[row][col] === 0) {
                emptyCells.push([row, col])
            }
        }
    }
}
assignEmptyCells()
// ======================================================================

// ==== Current position of the board that was clicked
function curPosClicked() {
    const rect = sudokuCanvas.getBoundingClientRect();
    const posY = mouse.y - rect.top;
    const posX = mouse.x - rect.left;
    boardLocation.col = parseInt(posX / cellSize.regularCell);
    boardLocation.row = parseInt(posY / cellSize.regularCell);
    boardLocation.largeCol = parseInt(posX / cellSize.largeCell);
    boardLocation.largeRow = parseInt(posY / cellSize.largeCell);
}

// Area that cannot be filled with the same number on the current cell
function area() {
    ctx.beginPath();
    ctx.fillStyle = 'hsl(211, 100%, 95%)';
    ctx.fillRect(boardLocation.largeCol * cellSize.largeCell, boardLocation.largeRow * cellSize.largeCell, cellSize.largeCell, cellSize.largeCell);
    ctx.stroke();

    // vertical rect
    ctx.beginPath();
    ctx.fillStyle = 'hsl(211, 100%, 95%)';
    ctx.fillRect(boardLocation.col * cellSize.regularCell, 0, cellSize.regularCell, sudokuCanvasWidth);
    ctx.stroke();

    // Horizontal Rect
    ctx.beginPath();
    ctx.fillStyle = 'hsl(211, 100%, 95%)';
    ctx.fillRect(0, boardLocation.row * cellSize.regularCell, sudokuCanvasWidth, cellSize.regularCell);
    ctx.stroke();
}
// =========================================================================

// ============================== Current Cell Position ===================
function curPosSquare() {
    ctx.beginPath();
    ctx.fillStyle = 'hsl(211, 100%, 85%)';
    ctx.fillRect(boardLocation.col * cellSize.regularCell, boardLocation.row * cellSize.regularCell, cellSize.regularCell, cellSize.regularCell);
    ctx.stroke();
}
// ==========================================================================

// ======================= Update The entire Canvas ==================== 
function updateCanvas() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    area();
    if (!solvingActivity) {
        numPositions();
        curPosSquare();
    }

    sudokuBoard();
    sudokuNumPlacement();
    if (noteActive) {
        possibleNumPlacement();
    }
}
// ======================================================================

// ================== Drawing the sudoku board ==========================
function sudokuBoard() {
    for (let i = 1; i < 9; i++) {

        ctx.beginPath();
        // Drawing thin Horizontal Lines
        ctx.lineWidth = 1;
        ctx.moveTo(0, i * cellSize.regularCell)
        ctx.lineTo(sudokuCanvasWidth + 10, (i * cellSize.regularCell) + 0.5);
        ctx.strokeStyle = 'rgb(196,196,196)';
        ctx.stroke();

        // Drawing thin Vertical Lines
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.moveTo(i * cellSize.regularCell, 0.5);
        ctx.lineTo(i * cellSize.regularCell, sudokuCanvasWidth + 0.5);
        ctx.strokeStyle = 'rgb(196,196,196)';
        ctx.stroke();
    }

    for (let i = 1; i < 3; i++) {
        // Drawing thick Horizontal Lines
        ctx.beginPath();
        ctx.moveTo(0, (3 * i * cellSize.regularCell) + 0.5)
        ctx.lineTo(sudokuCanvasWidth + 10, (3 * i * cellSize.regularCell) + 0.5);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgb(15,15, 15)';
        ctx.stroke();

        // Drawing thick Vertical Lines
        ctx.beginPath();
        ctx.moveTo(3 * i * cellSize.regularCell, 0.5);
        ctx.lineTo(3 * i * cellSize.regularCell, sudokuCanvasWidth + 0.5);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgb(15,15, 15)';
        ctx.stroke();
    }
}
// =====================================================================

// ================ Setting the numbers in their proper cells and positions =========================
function sudokuNumPlacement() {
    let posY = cellSize.regularCell / 1.75;
    let posX = cellSize.regularCell / 2;

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            let numToString = `${boardNums[col][row]}`;
            if (numToString === '0') {
                numToString = ' ';
            }

            // Blue Text (Values that would be cleared if the reset function or empty board function is used)
            if (isZero(col, row)) {
                ctx.font = `300 ${sudokuCanvasWidth / 15}px Poppins`;
                ctx.textBaseline = 'middle';
                const textWidth = ctx.measureText(numToString).width;
                const centerTextHorizontally = posX + (cellSize.regularCell * (row)) - (textWidth / 2);
                ctx.fillStyle = 'hsl(211, 100%, 40%)';
                ctx.fillText(numToString, centerTextHorizontally, posY + (cellSize.regularCell * col));
                // Black Text (Values that would be cleared if only the em)
            } else {
                ctx.font = `400 ${sudokuCanvasWidth / 15}px Poppins`;
                ctx.textBaseline = 'middle';
                const textWidth = ctx.measureText(numToString).width;
                const centerTextHorizontally = posX + (cellSize.regularCell * (row)) - (textWidth / 2);
                ctx.fillStyle = 'black';
                ctx.fillText(numToString, centerTextHorizontally, posY + (cellSize.regularCell * col));
            }
        }
    }
}
// =================================================================================================

// =================== Notes Btn =================================
// Possible Notes Number
function possibleNums(row, col) {
    let numList = range(1, 9, 1);

    for (let i = 0; i < 9; i++) {
        let numIndex = numList.findIndex(num => num == boardNums[row][i]);
        if (numIndex != -1) {
            numList.splice(numIndex, 1);
        }

        numIndex = numList.findIndex(num => num == boardNums[i][col]);
        if (numIndex != -1) {
            numList.splice(numIndex, 1);
        }
    }

    const sqRow = parseInt(row / 3) * 3;
    const sqCol = parseInt(col / 3) * 3;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const numIndex = numList.findIndex(num => num == boardNums[i + sqRow][j + sqCol]);
            if (numIndex != -1) {
                numList.splice(numIndex, 1);
            }
        }
    }
    return numList;
}
// ====================
// Setting the notes numbers in their proper locations within their specified cells 
function possibleNumPlacement() {
    let posY = (cellSize.regularCell / 1.75) / 3;
    let posX = (cellSize.regularCell / 2) / 3;

    for (zeroIndex of emptyCells) {
        row = zeroIndex[0];
        col = zeroIndex[1];

        if (boardNums[row][col] == 0) {
            const numList = possibleNums(row, col);

            // Displays Possible values that can be entered without any error
            for (num of numList) {
                const notePosX = ((num - 1) % 3) * (cellSize.regularCell / 3);
                const notePosY = parseInt((num - 1) / 3) * (cellSize.regularCell / 3);
                const numToString = `${num}`;
                ctx.font = `400 ${sudokuCanvasWidth / 45}px Poppins`;
                const textWidth = ctx.measureText(numToString).width;
                const positionHorizontally = posX + notePosX + (cellSize.regularCell * (col)) - (textWidth / 2);
                ctx.fillStyle = 'grey';
                ctx.fillText(numToString, positionHorizontally, posY + notePosY + (cellSize.regularCell * row));
            }
        }
    }
}
// ====================
// Notes Btn Ends ==============================================


// ========== Checking for the misplaced numbers on the sudoku board
function misplacedNum(row, col, num) {
    let countNumRow = 0;
    for (let i = 0; i < 9; i++) {
        if (boardNums[row][i] == num) {
            countNumRow++;
            // Counts the initial number once when traversing the row thus, 
            // if it appears twice its invalid
            if (countNumRow > 1) {
                return false;
            }
        }
    }

    let countNumCol = 0;
    for (let i = 0; i < 9; i++) {
        if (boardNums[i][col] == num) {
            countNumCol++;
            if (countNumCol > 1) {
                return false;
            }
        }
    }

    const sqRow = parseInt(row / 3) * 3;
    const sqCol = parseInt(col / 3) * 3;

    let countNumSq = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (boardNums[i + sqRow][j + sqCol] == num) {
                countNumSq++;
                if (countNumSq > 1) {
                    return false;
                }
            }
        }
    }
    return true;
}
// ========================================================================

// Highlighting all the other positions of a number on the currently selected cell in blue
// and highlighting numbers place wrongly in red
function numPositions() {
    curRow = boardLocation.row;
    curCol = boardLocation.col;

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            // show number in other places
            if (boardNums[row][col] == boardNums[curRow][curCol] && boardNums[curRow][curCol] != 0) {
                ctx.beginPath();
                ctx.fillStyle = 'hsl(211, 100%, 90%)';
                ctx.fillRect(col * cellSize.regularCell, row * cellSize.regularCell, cellSize.regularCell, cellSize.regularCell);
                ctx.stroke();
            }

            // Invalid numPlacement
            if (!misplacedNum(row, col, boardNums[row][col]) && boardNums[row][col] !== 0) {
                ctx.beginPath();
                ctx.fillStyle = '#ffcccc';
                ctx.fillRect(col * cellSize.regularCell, row * cellSize.regularCell, cellSize.regularCell, cellSize.regularCell);
                ctx.stroke();
            }
        }
    }
}
// ===========================================

// Check if all the number placements are valid on the board
function validBoard() {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const num = boardNums[row][col];
            if (!misplacedNum(row, col, num) && num !== 0) {
                boardIsValid = false;
                return;
            }
        }
    }
    boardIsValid = true;
    return;
}
//  ==============================================================================

// =================== clear all blue text (temporal values) =====================
function resetBoard() {
    for (input of emptyCells) {
        row = input[0];
        col = input[1]
        boardNums[row][col] = 0;
    }
}
// ================================================================

//========================= Empty Board ============================
function removeAllValues() {
    emptyCells.length = 0;
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            boardNums[row][col] = 0;
            emptyCells.push([row, col]);
        }
    }
}
// ======================================================================

// ============= Generate a random Sudoku =============================
function GenerateSudoku() {
    if (emptyCells > 80) {
        return false;
    }

    removeAllValues();
    solve(0); // Setting up random numbers on an empty board

    // Removing the temporal cells (blue texts)
    let fixedCellsCount = 81 - emptyBox.value;
    let maxIndexCount = 80;
    while (fixedCellsCount != 0) {
        const randomIndex = randInt(0, maxIndexCount);
        emptyCells.splice(randomIndex, 1);
        maxIndexCount--;
        fixedCellsCount--;
    }

    resetBoard();
}
// ====================================================================

// ============= Create Sudoku board =====================
// Converting the blue text to be black so it cannot be affected by the reset function
function createSudokuBoard() {
    emptyCells.length = 0;
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (boardNums[row][col] == 0) {
                emptyCells.push([row, col]);
            }
        }
    }
}
// ================================================================

// ============== Sudoku Solver ==========================

// Helper function for Quick and visual solve
function checkCell(row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (boardNums[row][i] == num) {
            return false;
        }
    }

    for (let i = 0; i < 9; i++) {
        if (boardNums[i][col] == num) {
            return false;
        }
    }

    const sqRow = parseInt(row / 3) * 3;
    const sqCol = parseInt(col / 3) * 3;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (boardNums[i + sqRow][j + sqCol] == num) {
                return false;
            }
        }
    }
    return true
}

// Quick Solve and Generate Helper function
function solve(iteration) {
    if (iteration == 81) {
        canBeSolved = true;
        return boardNums;
    }

    const col = iteration % 9;
    const row = parseInt(iteration / 9);


    if (boardNums[row][col] != 0) {
        return solve(iteration + 1);
    }

    const randomNum = shuffle(range(1, 9, 1))

    for (num of randomNum) {
        if (checkCell(row, col, num)) {
            boardNums[row][col] = num;
            if (solve(iteration)) {
                return true;
            }
        }
        boardNums[row][col] = 0;
    }
    canBeSolved = false;
    return false;
}


// Visualize Solve
// Current Visual Point: Used Primarily on the solving animation function solveAnim
// It displays both the current position of the algorithm and the backtrack
function visualizeAnim(col, row, color) {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect((row * cellSize.regularCell), (col * cellSize.regularCell), cellSize.regularCell, cellSize.regularCell);
    ctx.stroke();
    sudokuBoard();
    sudokuNumPlacement();
    if (noteActive) {
        possibleNumPlacement();
    }
}

// Async Helper Function
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function solveAnim(iteration) {
    if (iteration == 81) {
        solvingActivity = false;
        canBeSolved = true;
        updateCanvas();
        updateButtonStatus();
        return boardNums;
    }

    if (stopSolving) {
        removeMessage();
        return boardNums;
    }

    const row = parseInt(iteration / 9);
    const col = iteration % 9;

    if (boardNums[row][col] != 0) {
        return solveAnim(iteration + 1);
    }

    const randomNum = shuffle(range(1, 9, 1))

    for (num of randomNum) {
        if (checkCell(row, col, num)) {
            boardNums[row][col] = num;
            visualizeAnim(row, col, '#ccffcc');
            await sleep(speed.value);
            if (await solveAnim(iteration)) {
                return true;
            }
        }
    }

    boardNums[row][col] = 0;
    visualizeAnim(row, col, '#ffcccc');
    await sleep(speed.value);
    canBeSolved = false;
    return false;
}
// ======================================================================

// Initial Startup
updateButtonStatus();
updateCanvas();
