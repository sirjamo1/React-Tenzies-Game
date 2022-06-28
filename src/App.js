import React from "react";
import "./App.css";
import Dice from "./Dice";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [diceState, setDiceState] = React.useState(allNewDice());
  const [tenziesState, setTenziesState] = React.useState(false);
  const [rollCountState, setRollCountState] = React.useState(0);
  const [startTimeState, setStartTimeState] = React.useState(0);
  const [stopTimeState, setStopTimeState] = React.useState(0);
  const [topScoreState, setTopScoreState] = React.useState(
    JSON.parse(localStorage.getItem("topScoreState")) || {
      time: 0,
      rolls: 0,
    }
  );
  const confetti = tenziesState ? <Confetti /> : "";
  const playAgain = tenziesState ? "New Game?" : "Roll";

  const timer = tenziesState
    ? Math.round((stopTimeState - startTimeState) / 1000)
    : 0;

  function startTimer() {
    if (rollCountState === 0) {
      setStartTimeState(new Date().getTime());
      setStopTimeState(0);
    }
  }
  function stopTimer() {
    setStopTimeState(new Date().getTime());
  }

  React.useEffect(() => {
    const firstDieValue = diceState[0].value;
    const isHeld = diceState.every((die) => die.isHeld);
    const everyDieTheSame = diceState.every(
      (die) => die.value == firstDieValue
    );
    if (isHeld && everyDieTheSame) {
      setTenziesState(true);
      stopTimer();
    }
  }, [diceState]);
  React.useEffect(() => {
    if (
      (timer < topScoreState.time && timer !== 0) ||
      topScoreState.time == 0
    ) {
      setTopScoreState((prevTopScoreState) => ({
        ...prevTopScoreState,
        time:
          prevTopScoreState.time === 0 || prevTopScoreState.time > timer
            ? timer
            : prevTopScoreState.time,
      }));
    }

    if (
      (rollCountState < topScoreState.rolls && rollCountState !== 0) ||
      topScoreState.rolls == 0
    ) {
      setTopScoreState((prevTopScoreState) => ({
        ...prevTopScoreState,
        rolls:
          prevTopScoreState.rolls === 0 ||
          prevTopScoreState.rolls > rollCountState
            ? rollCountState
            : prevTopScoreState.rolls,
      }));
    }

    localStorage.setItem("topScoreState", JSON.stringify(topScoreState));
  }, [!tenziesState]);

  function rollDice() {
    if (tenziesState) {
      setTenziesState(false);
      setDiceState(allNewDice());
      setRollCountState(0);
    } else {
      setRollCountState((prevRollCountState) => (prevRollCountState += 1));
      setDiceState((prevDiceState) =>
        prevDiceState.map((die) => {
          return die.isHeld === true
            ? die
            : {
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid(),
              };
        })
      );
    }
  }

  const diceMapped = diceState.map((die) => (
    <Dice
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));
  function holdDice(id) {
    if (diceState.every((die) => die.isHeld == false)) {
      startTimer();
    }
    setDiceState((prevDiceState) =>
      prevDiceState.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }
  function allNewDice() {
    const diceArray = [];
    for (let i = 0; i < 10; i++) {
      diceArray.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      });
    }
    return diceArray;
  }

  return (
    <main className="main--container">
      {confetti}
      <div className="tenzies--container">
        <div className="highscore">
          <p className="highscore--title">Highscores</p>
          <p className="highscore--stats">
            Quickest Time : {topScoreState.time}'s
          </p>{" "}
          <p className="highscore--stats">
            Least Rolls : {topScoreState.rolls}
          </p>
        </div>
        <div className="text--content">
          <h1>Tenzies</h1>

          <h4>
            Roll until all dice are the same. Click each die to freeze it at
            it's current value between rolls.
          </h4>
        </div>
        <div className="dice--container">{diceMapped}</div>
        <button onClick={rollDice} className="button--roll">
          {playAgain}
        </button>
        <div className="count--container">
          <p className="roll--count">Time Taken : {timer}'s</p>
          <p className="roll--count"> Roll Number : {rollCountState}</p>
        </div>
      </div>
    </main>
  );
}

export default App;

// console.log({ startTimeState });
// console.log({ stopTimeState });
// console.log({ timer });
// console.log(topScoreState);

//setTimerState(Math.round((stopTimeState - startTimeState) / 1000)
// )

//       setTopScoreState((prevTopScoreState) => ({
//         time: prevTopScoreState.time === 0 || prevTopScoreState.time > timer
// 						? timer
// 						: prevTopScoreState.time,
//         rolls: prevTopScoreState.rolls === 0 || prevTopScoreState.rolls > rollCountState
// 						? rollCountState
// 						: prevTopScoreState.rolls,
// }));   localStorage.setItem('topScoreState', JSON.stringify(topScoreState));
