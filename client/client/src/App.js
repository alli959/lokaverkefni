import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import Header from './components/header';
import Menu from './routes/menu';
import SendOrder from './routes/sendOrder'

class App extends Component {

  constructor(){
    super();
    this.state = {
      isHeader: true,
    }
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
            <Header/>
            <Switch location={this.props.location}>
              <Route path="/menu"  exact component={Menu} />
              <Route path="/finish" exact component={SendOrder} />

            </Switch>

            {console.log(this.state.isHeader)}
            {console.log(this.props.location)}

          </div>
      </main>
    );
  }
}

export default withRouter(connect()(App));




