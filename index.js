/**
 * This program is a boliler plate code for the famous tic tac toe game
 * Here box represents one placeholder for either X or a 0
 * We have a 2D array to represent the arrangement of X or O is a grid
 * 0 -> empty box
 * 1 -> box with X
 * 2 -> box with O
 * 
 * Below are the tasks which needs to be completed
 * Imagine you are playing with Computer so every alternate move should be by Computer
 * X -> player
 * O -> Computer
 * 
 * Winner has to be decided and has to be flashed
 * 
 * Extra points will be given for the Creativity
 * 
 * Use of Google is not encouraged
 * 
 */
const grid = [];
const GRID_LENGTH = 3;
let turn = 'X';

function initializeGrid() {
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';
    
    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function onBoxClick() {

    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    let newValue = 1;
    grid[colIdx][rowIdx] = newValue;
    renderMainGrid();
    if (checkWin(colIdx,rowIdx)){
        alert("You won!!!!");
        return 0;
    }

    var postition = computerPlay();
    if(postition){
        grid[postition[0]][postition[1]]=2;
        renderMainGrid();
        if (checkWin(postition[0],postition[1])){
        alert("computer won!!!!");
        return 0;
    }

    }
    else{

        alert("game tied");
        return 0;
    }

    addClickHandlers();


}

function computerPlay() {

    var prevent_human_victory = blockHuman();
    if(prevent_human_victory){


        return  prevent_human_victory[Math.floor(Math.random() * (prevent_human_victory.length-1))];
    }

    else{

        var valid_option_c = validMoves();

        if (valid_option_c.length != 0)
        {
        for (var k=0;k<valid_option_c.length;k++){
            row = valid_option_c[k][0];
            col = valid_option_c[k][1];
            grid[row][col] = 2;
            if(checkWin(row,col)){
                return [row,col];

            }
            else{
                grid[row][col] = 0;
            }

        }


        }

        return valid_option_c[Math.floor(Math.random() * (valid_option_c.length-1))];


    }

}

function validMoves(){
    var valid_option = [];
    for (var i = 0; i<GRID_LENGTH; i++){
        for(var j = 0;j<GRID_LENGTH; j++){
            if (grid[i][j] === 0){

                valid_option.push([i,j])

            }

        }

    }

    return valid_option;

}


function blockHuman(){

    var valid_option_b = validMoves();
    var block_spots =[];
    if (valid_option_b.length != 0)
    {
    for (var k=0;k<valid_option_b.length;k++){
        row = valid_option_b[k][0];
        col = valid_option_b[k][1];
        grid[row][col] = 1;
        if(checkWin(row,col)){
            block_spots.push([row,col]);

        }
        grid[row][col] = 0;

    }

    if(block_spots.length === 0){
        return false;
    }
    return block_spots;
    }




}

function checkWin( i, j) {

    if(horizontalWincheck(i,j)){
        return true;

    }

    else if(verticalWinCheck(i,j)){
        return true;
    }

    else{
        return diagonalWinCheck(i,j);
    }



}

function validDiagonalposition(i,j){
    if ((Math.abs(i-j) === 0) || (Math.abs(i-j) === 2 )){
        return true;
        }
     else{
        return false;
     }
}

function horizontalWincheck(i,j){
    if((grid[i][j] === grid[i][0]) && (grid[i][j] === grid[i][1]) && (grid[i][j] === grid[i][2]) ){
            return true;
     }
    else{

        return false;
    }
}

function verticalWinCheck(i,j){
    if((grid[i][j] === grid[0][j]) && (grid[i][j] === grid[1][j]) && (grid[i][j] === grid[2][j]) ){
            return true;
     }
    else{
        return false;
    }

}

function diagonalWinCheck(i,j){
    if (validDiagonalposition(i,j)){
            if(((grid[i][j] === grid[0][0]) && (grid[i][j]===grid[1][1]) && (grid[i][j]===grid[2][2])) || ((grid[i][j] ===grid[0][2]) && (grid[i][j]===grid[1][1]) && (grid[i][j]===grid[2][0])) ){
                return true;
            }
            else{
                return false;
            }
        }
     else{

           return false;
     }

}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}

initializeGrid();
renderMainGrid();
addClickHandlers();
