import React from "react";
import dice1 from "./img/dice1.png";
import dice2 from "./img/dice2.png";
import dice3 from "./img/dice3.png";
import dice4 from "./img/dice4.png";
import dice5 from "./img/dice5.png";
import dice6 from "./img/dice6.png";

export default function Dice(props) {
  const styles = {
    boxShadow: props.isHeld
      ? "0px 0px 10px 6px rgba(89,227,145,0.75)"
      : "0px 0px 0px 0px rgba(0,0,0,0)",
  };

  function diceSelector() {
    if (props.value == 1) {
      return dice1;
    } else if (props.value == 2) {
      return dice2;
    } else if (props.value == 3) {
      return dice3;
    } else if (props.value == 4) {
      return dice4;
    } else if (props.value == 5) {
      return dice5;
    } else {
      return dice6;
    }
  }

  return (
    <div
      onClick={props.holdDice}
      // className="dice--face"
    >
      <img style={styles} className="dice--images" src={diceSelector()} />
    </div>
  );
}
