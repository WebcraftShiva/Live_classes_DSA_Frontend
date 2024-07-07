function isSafe(board, row, col, n) {
    
    // upper column
    for (let i = 0; i < row; i++) {
        if (board[i][col]) return false;
    }
    // upper-left digonal
    for (let i = row, j = col; i >= 0 && j < n; i--, j++) {
        if (board[i][j]) return false;
    }

    // Upper-right diaginal
     for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j]) return false;
    }
    return true;
}

function solveNQueenUtil(board, row, n, result) {

    if (row == n) {
       
        let solution = board.map(row => [...row]);
        result.push(solution);
        return false;
    }
  
  for (let j = 0; j < n; j++) {
    if (isSafe(board, row, j, n)) {
        board[row][j] = 1; 
        if (solveNQueenUtil(board, row + 1, n, result)) 
        return true;   
        board[row][j] = 0; 
    }
    } 
    return false;
}

function solveNQueen() {
    
    const n = parseInt(document.getElementById("n").value);
    let board = new Array(n).fill(0).map(() => new Array(n).fill(0));
    
    let result = [];
    solveNQueenUtil(board, 0, n, result);
       
    let resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";
    
    if (result.length == 0) {
        resultDiv.innerHTML = "No solution exists";
    } else {
         
        result.forEach((solution, index) => {
            let chessboard = document.createElement("div");
            chessboard.className = "chessboard";
    
            solution.forEach((row, i) => {
                let rowDiv = document.createElement("div");
                rowDiv.className = "row";
                row.forEach((cell, j) => {
                    
                    let cellDiv = document.createElement("div");
                    cellDiv.className = `cell ${((i + j) % 2 === 0) ? 'white' : 'black'}`;
                    
                    if (cell) {
                        let queen = document.createElement("span");
                        queen.className = "queen";
                        queen.innerText = "Q";
                        cellDiv.appendChild(queen);
                    }
                    rowDiv.appendChild(cellDiv);
                });
                chessboard.appendChild(rowDiv);
            });
            
            resultDiv.appendChild(chessboard);
        });
    }
}