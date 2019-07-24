import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import { SSL_OP_NO_TICKET } from 'constants';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hanyuu</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <p id="example">
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://hanyuufurude.github.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hanyuu Furude's personal web page.
        </a>
        <button onClick={hanyuu}>hanyuu</button>
      </header>
    </div>
  );
}
function hanyuu()
{
  return console.log("Hanyuu."+new Date().toLocaleTimeString());
}
class Clock extends React.Component{
  render(){
    return(
      <div>
      <h2>现在是 {this.props.date.toLocaleTimeString()}.</h2>
    </div>
    )
  }
}
function tick()
{
  ReactDOM.render(
    <Clock date={new Date()}/>,
    document.getElementById('example')
  );
}
setInterval(tick,1000);
export default App;
