import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import { SSL_OP_NO_TICKET } from 'constants';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 id = "title">Hanyuu's demo</h1>
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
        input box<input id = 'input' type= "text"/>
        <button onClick={hanyuu}>hanyuu</button>
        <Toggle/>
      </header>
    </div>
  );
}
function hanyuu()
{
  ReactDOM.render(<Counter/>,document.getElementById("title"));
  return console.log("Hanyuu."+new Date().toLocaleTimeString());
}
class Clock extends React.Component{
  render(){
    return(
      <div>
      <h2>date: {this.props.date.toLocaleTimeString()}.</h2>
    </div>
    )
  }
}
class Counter extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = 0;
  }
  render()
  {
    this.state += 1;
    return (<h1>{this.state} times clicked.</h1>);
  }
}

class Toggle extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = { isToggleOn: true };

    // 这边绑定是必要的，这样 `this` 才能在回调函数中使用
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick()
  {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render()
  {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
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
