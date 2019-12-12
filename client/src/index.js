import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import './index.css';
import rootReducer from './reducers'
import App from './App';


// til að hægt sé að nota async í redux
const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)

ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>, document.getElementById('root'));