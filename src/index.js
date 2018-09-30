import React from "react";
import ReactDOM from "react-dom";
import CardGameContainer from "./ConcentrationGame/CardGameContainer";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <h1>Concentration Card Game</h1>
      <CardGameContainer />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
