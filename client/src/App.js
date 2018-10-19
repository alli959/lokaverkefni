import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom'
import Offer from './routes/offers/';

class App extends Component {

  async componentDidMount() {

    const { dispatch } = await this.props;
    

  }
  render() {
    const { isFetching } = this.props;

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
            <Switch location={this.props.location}>
              <Route path="/" exact component={Offer} />
            </Switch>
          </div>
      </main>
    );
  }
}

export default withRouter(connect()(App));




