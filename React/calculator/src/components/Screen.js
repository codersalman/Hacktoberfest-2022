import { useContext } from "react";
import { CalcContext } from "../context/CalcContext";
import { Textfit } from "react-textfit";

const Screen = () => {
  const { calc } = useContext(CalcContext);
  console.log(calc);
  let screenValue = 0;
  if (calc.num && !calc.res && !calc.sign) {
    screenValue = calc.num;
  } else if (calc.res && calc.sign && !calc.num) {
    screenValue = calc.res + " " + calc.sign;
  } else if (calc.res && calc.sign && calc.num) {
    screenValue = calc.res + " " + calc.sign + " " + calc.num;
  } else if (calc.res && !calc.sign && !calc.num) {
    screenValue = calc.res;
  }
  return (
    <Textfit className="screen" max={70} mode="single">
      {screenValue}
    </Textfit>
  );
};

export default Screen;
