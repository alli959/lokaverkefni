import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom'
import Offer from './components/offers/';

class App extends Component {

  async componentDidMount() {

    const { dispatch } = await this.props;
    console.log(dispatch);
    

  }
  render() {
    console.log(this.props)
    const { isFetching } = this.props;
    console.log(isFetching);

    if(isFetching) {
      return (
        <main className="main">
          <h1>Augnablik...</h1>
        </main>
      )
    }
    return (
      <main className="main">
          <div className="main__content">
            <h2>Hello World</h2>
            <Offer />
          </div>
      </main>
    );
  }
}

export default withRouter(connect()(App));