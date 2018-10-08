import React, { Component } from 'react';
import './test.css';

class Test extends Component {
  constructor(){
    super();
    this.state = {
      food: []
    }
  }

  componentDidMount(){
    fetch('/hello')
      .then(res => res.json())
      .then(food => this.setState({food}, () => console.log("works",food)));
  }
  render() {
    return (
      <div>
      
      </div>
    );
  }
}

export default Test;
