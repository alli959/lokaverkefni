import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import querystring from 'querystring';
import { fetchBurgers } from '../../actions/getBurgers'
import OrderView from '../orderView';
import Button from '../button';
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
        clickHandler: PropTypes.func,
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

    handleButtonClick = (e) => {
        const {result} = this.props.burger;
        const index = e.currentTarget.getAttribute('id');

        this.props.clickHandler(result[index]);
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
        
      <div className = "content">

        <ul className = "burger-list">
            {result.map(burgers =>

                //using indexOf to find the index of the button that is pressed

                <button key={burgers.id} id={result.indexOf(burgers)} onClick={this.handleButtonClick}><li key={burgers.id}>
                    <div className = "burger-item">
                        <div className = "name">
                            <h2 className="foodName"> {burgers.name} </h2>
                        </div>
                        <div className = "description">
                            {burgers.description}
                        </div>
                        <div className = "price">
                            <span> Verð: </span>
                            {burgers.price}

                        </div>
                    </div>
                </li></button>
                
                
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

