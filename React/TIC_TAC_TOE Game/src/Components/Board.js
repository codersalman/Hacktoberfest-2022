import React from "react"
import Square from "./Square";
const styleh = {
    color: "red",
    fontSize: "30px",
    fontWeight: "bold",
    marginLeft: "40%",
    marginTop: "20px",
    marginBottom: "20px",
    fontFamily: "Verdana",
  };
  const styles = {
    display: "flex",
    width: "30%",
    margin: "auto",
    flexWrap: "wrap"
  };

  function Board({AllSquares, squareClick}){
    return(
        <>
            <h1 style={styleh}>TIC TAC TOE</h1>
            <div style={styles}>
                {AllSquares.map((square, i) => (
                  <Square value = {square} squareClick={()=>squareClick(i)}/>
                ))}
            </div>
        </>
    )
  }
export default Board