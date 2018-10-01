import React from "react";
import ReactDOM from "react-dom";
import CardGameContainer from "./ConcentrationGame/CardGameContainer";
import "./styles.css";

function App() {
  return (
    <div className="App">

      <CardGameContainer />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
