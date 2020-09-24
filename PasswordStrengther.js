import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    password: "",
    strength: 0,
    strengthResponse: "",
    strengthColor: ""
  }

  testFunctions = (e) => {
    this.checkLength(e)
    this.checkTyping(e)
    this.checkStrength(this.state.strength)
  }

  checkLength = (e) => {
    this.setState({strength: e.target.value.length})
  }

  checkTyping = (e) => {
    this.setState({password: e.target.value})
  }

  checkStrength = (strength) => {
    strength += 1
    if(strength >= 1 && strength <= 4)
    {
      this.setState({strengthResponse: "Too easy"})
      this.setState({strengthColor: "red"})
    }
    else if(strength >= 5 && strength <= 9)
    {
      this.setState({strengthResponse: "Good"})
      this.setState({strengthColor: "orange"})
    }
    else if(strength >= 10 && strength <= 14)
    {
      this.setState({strengthResponse: "Very Good"})
      this.setState({strengthColor: "green"})
    }
    else if(strength > 14)
    {
      this.setState({strengthResponse: "Excellet"})
      this.setState({strengthColor: "blue"})
    }
    else
    {
      this.setState({strengthResponse: "Please choose a password"})
      this.setState({strengthColor: "black"})
    }
  }

  

  render()
  {
    return(
      <div>
        <h1>{this.state.strength}</h1>
        <h1>{this.state.password}</h1>
        <h1 style={{color: this.state.strengthColor}}>{this.state.strengthResponse}</h1>
        <input type="text" onChange={this.testFunctions} value={this.state.password}></input>
      </div>
    )
  }
  
}

export default App;
