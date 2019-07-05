import React from 'react';
import ReactDOM from 'react-dom';
import './demo.css';
import { Demo } from "./demo/demo";
ReactDOM.render(React.createElement("div", {
  style: {
    height: "100%",
    padding: "10em"
  }
}, React.createElement(Demo, null)), document.getElementById('root'));