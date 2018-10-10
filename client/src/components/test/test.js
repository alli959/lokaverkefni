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
      <ul>
        {this.state.food.map(foods =>
        <li key={foods.id}>{ foods.name } { foods.description } { foods.price }</li>
        )}
      </ul>
      </div>
    );
  }
}

export default Test;
