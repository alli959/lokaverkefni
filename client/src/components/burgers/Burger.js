import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import querystring from 'querystring';
import { fetchBurgers } from '../../actions/getBurgers'
import './burger.css';

class Burger extends Component {

    state = {
        isFetching: false,
        burger: null,
        message: null,
    }

    static propTypes = {
        dispatch: PropTypes.func,
        isFetching: PropTypes.bool,
        burger: PropTypes.object,
        message: PropTypes.object,
    }










    async componentDidMount() {
        const { dispatch } = this.props;
        let burgers = await this.props.burger;
        await this.setState({
            burger: burgers,
        })
        dispatch(fetchBurgers());
        console.log(this.props);


    }

    render() {
        const { isFetching, burger } = this.props;
        if (isFetching || !burger) {
            return (
                <div>
                    sæki borgara...
                </div>
            );
        }
        let { result } = burger;
        
        
        if(!result){
            return(
                <div>
                    <h2>Síða finnst ekki, vinsamlegast reyndu aftur</h2>
                </div>
            )
        }

    


    return (
        
      <div class = "content">

        <ul class = "burger-list">
            {result.map(burgers =>
                <li key={burgers.id}>
                    <div class = "burger-item">
                        <div class = "name">
                            <h2> {burgers.name} </h2>
                        </div>
                        <div class = "description">
                            {burgers.description}
                        </div>
                        <div class = "price">
                            <span> Verð: </span>
                            {burgers.price}

                        </div>
                    </div>
                </li>
                
                
            )}
        </ul>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
    return {
      isFetching: state.getBurgers.isFetching,
      burger: state.getBurgers.burger,
      message: state.getBurgers.message,
    };
  }
  
export default connect(mapStateToProps)(Burger);

