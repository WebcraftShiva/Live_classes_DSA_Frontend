const sudukoBoard = document.querySelector("#sudukoBoard");

const lives = document.querySelector("#wrong");

let lastSelected = null; 
let error = 0; 
let currentRow = 0; 
let currentCol = 0; 

const puzzle = [
    "53--7----",
    "6--195---",
    "-98----6-",
    "8---6---3",
    "4--8-3--1",
    "7---2---6",
    "-6----28-",
    "---419--5",
    "----8--79",
];

const solution = [
    "534678912",
    "672195348",
    "198342567",
    "859761423",
    "426853791",
    "713924856",
    "961537284",
    "287419635",
    "345286179",
];


window.onload = () => {
    initializePuzzle(); 

    document.addEventListener("keydown", handleArrowKeys);

    document.addEventListener("keydown", addNumberToTile);

    document.querySelector("#reset").addEventListener("click", resetGame);

    document.querySelector("#solve").addEventListener("click", solveSudoku);
};

function initializePuzzle() {
    sudukoBoard.innerHTML = ""; 

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const div = document.createElement("div");
            div.classList.add("tile"); 
            div.addEventListener("click", selectTile); 
            div.setAttribute("row", i);
            div.setAttribute("col", j); 

            if (puzzle[i][j] !== "-") {
                div.innerText = puzzle[i][j]; 
                div.classList.add("filled"); 
            }

            if (i === 2 || i === 5) {
                div.classList.add("border-bottom");
            }
            if (j === 2 || j === 5) {
                div.classList.add("border-right"); 
            }

            sudukoBoard.appendChild(div);
        }
    }
    lastSelected = sudukoBoard.querySelector(`[row="${currentRow}"][col="${currentCol}"]`);
    lastSelected.classList.add("select-tile");
}

function selectTile() {
    if (lastSelected !== null) {
        lastSelected.classList.remove("select-tile"); 
    }
    lastSelected = this;
    lastSelected.classList.add("select-tile"); 
    currentRow = parseInt(this.getAttribute("row")); 
    currentCol = parseInt(this.getAttribute("col")); 
}

function handleArrowKeys(event) {
    if (event.key === "ArrowRight") {
        moveRight();
    } else if (event.key === "ArrowLeft") {
        moveLeft();
    } else if (event.key === "ArrowDown") {
        moveDown(); 
    } else if (event.key === "ArrowUp") {
        moveUp(); 
    }
}

function moveRight() {
    if (currentCol < 8) { 
        currentCol++;
        updateSelectedTile(); 
    }
}

function moveLeft() {
    if (currentCol > 0) { 
        currentCol--; 
        updateSelectedTile(); 
    }
}

function moveDown() {
    if (currentRow < 8) {
        currentRow++;
        updateSelectedTile(); 
    }
}

function moveUp() {
    if (currentRow > 0) { 
        currentRow--; 
        updateSelectedTile();
    }
}

function updateSelectedTile() {
    lastSelected.classList.remove("select-tile"); 
    lastSelected = sudukoBoard.querySelector(`[row="${currentRow}"][col="${currentCol}"]`); 
    lastSelected.classList.add("select-tile");
}

function validateNumber() {
    let row = parseInt(lastSelected.getAttribute("row")); 
    let col = parseInt(lastSelected.getAttribute("col")); 
    if (lastSelected.innerText === solution[row][col]) { 
        lastSelected.classList.remove("danger"); 
        lastSelected.classList.add("correct"); 
    } else {
        lastSelected.classList.add("danger"); 
        lastSelected.classList.add("wrong"); 
        addErrorandDisplay();
    }
}

function addErrorandDisplay() {
    error++;
    lives.innerText = ` ${error}`; 
    if (error >= 10) { 
        alert("Game Over! You have made 10 mistakes."); 
        document.removeEventListener("keydown", handleArrowKeys); 
        document.removeEventListener("keydown", addNumberToTile); 
        resetGame(); 
    }
}

function addNumberToTile(event) {
    if (!lastSelected.classList.contains("filled")) { 
        let key = parseInt(event.key); 
        if (!isNaN(key) && key >= 1 && key <= 9) { 
            lastSelected.innerText = key; 
            validateNumber(); 
        } else if (event.key === "Backspace") { 
            lastSelected.innerText = "";
            validateNumber(); 
        }
    }
}

function resetGame() {
    error = 0; 
    lives.innerText = `${error}`; 
    currentRow = 0; 
    currentCol = 0; 
    initializePuzzle(); 
    document.addEventListener("keydown", handleArrowKeys); 
    document.addEventListener("keydown", addNumberToTile); 
}

function solveSudoku() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const tile = sudukoBoard.querySelector(`[row="${i}"][col="${j}"]`);
            if (!tile.classList.contains("filled")) { 
                tile.innerText = solution[i][j]; 
            }
        }
    }
    const tiles = sudukoBoard.querySelectorAll(".tile"); 
    tiles.forEach(tile => {
        const row = parseInt(tile.getAttribute("row")); 
        const col = parseInt(tile.getAttribute("col")); 
        if (tile.innerText !== "-" && puzzle[row][col] === "-") { 
            tile.style.color = "rgb(15, 146, 202)"; 
        }
    });
}
