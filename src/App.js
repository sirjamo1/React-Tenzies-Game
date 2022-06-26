import React from "react";
import "./App.css";
import Dice from "./Dice";

function App() {
  const [diceState, setDiceState] = React.useState(allNewDice());
  function rollDice(){
    setDiceState(prevDiceState => prevDiceState = allNewDice())
  }
  const diceMapped = diceState.map((die) => <Dice value={die} />);
  function allNewDice() {
    const diceArray = [];
    for (let i = 0; i < 10; i++) {
      diceArray.push(Math.ceil(Math.random() * 6));
    }
    return diceArray;
  }
  console.log(diceState);

  return (
    <main className="main--container">
      <div className="tenzies--container">
        <div className="text--content">
          <h1>Tenzies</h1>
          <h4>
            Roll until all dice are the same. Click each die to freeze it at
            it's current value between rolls.
          </h4>
        </div>
        <div className="dice--container">{diceMapped}</div>
        <button onClick={rollDice} className="button--roll">Roll</button>
      </div>
    </main>
  );
}

export default App;
