import React, {useState} from "react"
import Board from "./Board";
import Winner from "../Winner";

export default function Game(){
    const [board, setBoard] = useState(Array(9).fill(null));
    const [Next, setNext] = useState(true);
    const boardCopy = [...board]
    const squareClick = (i) => {
        if(Winner(board)){
            alert("Winner has been declared")
            return;
        }
        boardCopy[i] = Next? "O" : "X"
        setBoard(boardCopy);
        setNext(!Next)
    }

    return(
        <div>
            <Board AllSquares={board} squareClick={squareClick}/>
        </div>
       
    )

}
