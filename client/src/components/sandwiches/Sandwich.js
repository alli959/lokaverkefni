import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import querystring from 'querystring';
import {fetchSandwiches} from '../../actions/getSandwiches'
import Button from '../../components/button'
import OrderView from '../../components/orderView';

import './sandwich.css';

class Sandwich extends Component {

    state = {
        isFetching: false,
        sandwich: null,
        message: null,
    }

    static propTypes = {
        dispatch: PropTypes.func,
        isFetching: PropTypes.bool,
        sandwich: PropTypes.object,
        message: PropTypes.object,
        clickHandler: PropTypes.func,

    }




    async componentDidMount() {
        const { dispatch } = this.props;
        let sandwiches = await this.props.sandwich;
        await this.setState({
            sandwich: sandwiches,
        })
        dispatch(fetchSandwiches());

    }

    handleButtonClick = (e) => {
        const {result} = this.props.sandwich;
        const index = e.currentTarget.getAttribute('id');

        this.props.clickHandler(result[index]);
      }

    render() {
        const { isFetching, sandwich } = this.props;
        if (isFetching || !sandwich) {
            return (
                <div>
                    sæki samlokur...
                </div>
            );
        }
        let { result } = sandwich;
        
        
        if(!result){
            return(
                <div>
                    <h2>Síða finnst ekki, vinsamlegast reyndu aftur</h2>
                </div>
            )
        }

    


    return (
    
      <div className = "content">
        
        <ul className = "sandwich-list">

            {result.map(sandwiches =>
                <button key={sandwiches.id} id={result.indexOf(sandwiches)} onClick={this.handleButtonClick}><li key={sandwiches.id}>
                    
                    <div className = "sandwich-item">
                        <div className = "name">
                            <h2> {sandwiches.name} </h2>
                        </div>
                        <div className = "description">
                            {sandwiches.description}
                        </div>
                        <div className = "price">
                            <span> Verð: </span>
                            {sandwiches.price}

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
      isFetching: state.getSandwiches.isFetching,
      sandwich: state.getSandwiches.sandwich,
      message: state.getSandwiches.message,
    };
  }
  
export default connect(mapStateToProps)(Sandwich);

