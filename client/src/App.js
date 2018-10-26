import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import Header from './components/header';
import Button from './components/button';
import Menu from './routes/menu';

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
            <Header />
            <Switch location={this.props.location}>
              <Route path="/menu" exact component={Menu} />
            </Switch>
          </div>
      </main>
    );
  }
}

export default withRouter(connect()(App));




