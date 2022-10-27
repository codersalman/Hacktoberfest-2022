let clickMusic = new Audio("click.wav");

let turn = 'X';
let gameover = false;

const changeTurn = () => {
    bgMusic.play();
    return turn === 'X' ? '0' : 'X';
}

const checkWin = () => {
    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90]
    ]
    let boxText = document.getElementsByClassName("box-text")
    wins.forEach(e => {
        if ((boxText[e[0]].innerHTML !== '') && (boxText[e[0]].innerHTML === boxText[e[1]].innerHTML) && (boxText[e[1]].innerHTML === boxText[e[2]].innerHTML)) {
            document.querySelector('.info').innerHTML = boxText[e[0]].innerHTML + " Won"
            gameover = true
            document.querySelector(".image-box").getElementsByTagName('img')[0].style.width = "362px";
            document.querySelector(".line").style.width = '20vw';
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`
        }
    })
}

let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxText = element.querySelector(".box-text");
    element.addEventListener('click', () => {
        if (boxText.innerText === '') {
            boxText.innerText = turn;
            turn = changeTurn();
            clickMusic.play();
            checkWin();
            if (!gameover)
                document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
        }
    })
})

// Add onclick listener to reset button
reset.addEventListener('click', () => {
    clickMusic.play();
    let boxTexts = document.querySelectorAll(".box-text");
    Array.from(boxTexts).forEach(element => {
        element.innerHTML = ""
    });
    document.querySelector(".line").style.width = '';
    turn = 'X'
    gameover = false
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    document.querySelector(".image-box").getElementsByTagName('img')[0].style.width = "";
    bgMusic.play();
})
