import React from "react";
import "./App.css";

import ReactiveChessBoard from "./components/ReactiveChessBoard";

const App = () => {

  return (
    <div className="flex-center">
      <ReactiveChessBoard />
    </div>
  );
}

export default App;