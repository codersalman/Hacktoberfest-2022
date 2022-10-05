import React from "react"
const styles = {
    border: "2px solid GREEN",
    background: "#95f092",
    color: "RED",
    fontFamily: "Verdana",
    width: "100px",
    height: "100px",
    textAlign: "center",
    fontSize: "60px",
    lineHeight: "100px"
  };
function Square({value,squareClick}){
    return(
        <div style={styles} onClick={squareClick}>{value}</div>
    )
}
export default Square