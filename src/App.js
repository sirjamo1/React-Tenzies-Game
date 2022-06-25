import logo from "./logo.svg";
import "./App.css";

function App() {
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
        <div className="button--container">
          <div className="button--one-five">
            <button className="dice--one">1</button>
            <button className="dice--two">2</button>
            <button className="dice--three">3</button>
            <button className="dice--four">4</button>
            <button className="dice--five">5</button>
          </div>
          <div className="button--six-ten">
            <button className="dice--six">6</button>
            <button className="dice--seven">7</button>
            <button className="dice--eight">8</button>
            <button className="dice--nine">9</button>
            <button className="dice--ten">10</button>
          </div>
          <button className="button--roll">Roll</button>
        </div>
      </div>
    </main>
  );
}

export default App;
