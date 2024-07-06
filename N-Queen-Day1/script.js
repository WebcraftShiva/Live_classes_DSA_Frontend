function isSafe(board, row, col, n){

    //check the column : 
for(let i=0; i<row; i++){
    if(board[i][col])
        return false
}

// Check upper-right
for( let i= row, j=col; i>= 0 && j < n; i--, j++){
    if(board[i][j]) return false;
}

//upper left diagonal:
for( let i= row, j=col; i>= 0 && j >= 0; i--, j++){
    if(board[i][j]) return false;
}
}


