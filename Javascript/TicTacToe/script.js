// console.log("Welcome to Tic Tac Toe");

//   WE CAN ADD Audio AS

let audioTurn = new Audio("176727__yottasounds__pop.wav");
let gameOver = new Audio("gameover.mp3");

let turn = "X";
let isgameOver=false;

const changeTurn = () => {
    // USING TERNARY OPERATOR
    return turn==="X"?"O" : "X";
    // : means or
    // ? means then return 
}

// Function to Check Win
const checkWin =()=>{
    let boxText= document.getElementsByClassName('boxText');
    let wins=[
        
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
        
    ]

    wins.forEach(e =>{
        if((boxText[e[0]].innerText === boxText[e[1]].innerText) && (boxText[e[2]].innerText === boxText[e[1]].innerText) && (boxText[e[1]].innerText !== "")){
            document.querySelector('.info').innerText = boxText[e[0]].innerText + " Won";
            isgameOver= true;
            gameOver.play();
            document.querySelector('.gif1').getElementsByTagName('img')[0].style.width = "200px"; 
        }
    })

}

// Main Game Logic

let boxes= document.getElementsByClassName("box");

Array.from(boxes).forEach(element =>{
    let boxText = element.querySelector('.boxText');

    element.addEventListener('click', ()=>{
        if( boxText.innerText === '' ){
            boxText.innerText = turn;
            turn =changeTurn();
            audioTurn.play();
            checkWin();
            if(!isgameOver){   
                document.getElementsByClassName("info")[0].innerText = "Turn For " + turn ;
            }

        }
    })

})

//  ADDING ONCLICK LISTNER TO RESET BUTTON


Butt.addEventListener('click', ()=>{
    let boxtexts = document.querySelectorAll('.boxText');
    Array.from(boxtexts).forEach(element=>{
        element.innerText="";
    });
    turn = "X";
    isgameOver = false;
    
    document.getElementsByClassName("info")[0].innerText  = "Turn for " + turn;

    document.querySelector('.gif1').getElementsByTagName('img')[0].style.width = "0px"; 

})

//   FOR LINE ANIMATION REFER SCRIPT