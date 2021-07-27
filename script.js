const player1 = document.querySelector(".player1")
const player2 = document.querySelector(".player2")
const board = document.querySelector(".board");
const cells = document.querySelectorAll(".cell")
const active = document.querySelector(".active")
const reset = document.querySelector("#reset")
const winnerPage = document.querySelector(".winner");
const winnerText = document.querySelector(".winText");
const reset_WP = document.querySelector("#reset_WP");


const x_class = 'x';
const circle_class = 'circle';
let chance = false;
const winCombo = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let p1 = prompt("Enter Player 1 Name");
let p2 = prompt("Enter Player 2 Name");
player1.innerHTML=p1;
player2.innerHTML=p2;
start();
function start(){
    chance = false;
    cells.forEach(cell => {
        
        cell.addEventListener("click", handleClick ,{once:true})
    });
}

function handleClick(e){
    let cell = e.target;
    let curr_class = !chance?x_class:circle_class;
    let next_class = chance?x_class:circle_class;
    cell.classList.add(curr_class)
    if(checkWinner(curr_class)){
        endGame(true);
    }else if(checkDraw()){
        endGame(false);
    }else{
        board.classList.remove("x");
        board.classList.remove("circle");
        board.classList.add(next_class);
        active.style.top = !chance?'83px':'33px';
        chance = !chance;
    }
}


function checkWinner(curr_class){   
    return winCombo.some(arr => {
        return arr.every(idx =>{
            return cells[idx].classList.contains(curr_class);
        })
    })
}


function checkDraw(curr_class){   
    return winCombo.every(arr => {
        return arr.every(idx =>{
            return cells[idx].classList.contains(x_class) || cells[idx].classList.contains(circle_class);
        })
    })
}


function endGame(check){

    if(check){
        winnerText.innerHTML = `${!chance?p1:p2} WINS!`;
    }else{
        winnerText.innerHTML = `DRAW!`;
    }
    winnerPage.style.display = "flex";
}

reset.addEventListener("click",resetbtn);
reset_WP.addEventListener("click",resetbtn);


function resetbtn(){
    chance = false;
    board.classList.add("x");
    board.classList.remove("circle");
    cells.forEach(cell=>{
        cell.classList.remove("x");
        cell.classList.remove("circle");
    })
    active.style.top = '33px';
    winnerPage.style.display = "none";
    start();
}
