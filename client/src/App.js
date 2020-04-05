import React, { Component } from "react";

import "./App.css";
import Navigation from "./components/Navigation";

class App extends Component {
  state = {
    storageValue: 0,
    web3: null
  };

  render() {

    return (
      <div className="App">
        <Navigation></Navigation>
      </div>
    );
  }
}

export default App;
