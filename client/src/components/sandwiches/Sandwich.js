import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import querystring from 'querystring';
import {fetchSandwiches} from '../../actions/getSandwiches'
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
    }










    async componentDidMount() {
        const { dispatch } = this.props;
        let sandwiches = await this.props.sandwich;
        await this.setState({
            sandwich: sandwiches,
        })
        dispatch(fetchSandwiches());
        console.log(this.props);


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
        
      <div class = "content">

        <ul class = "sandwich-list">
            {result.map(sandwiches =>
                <li key={sandwiches.id}>
                    <div class = "sandwich-item">
                        <div class = "name">
                            <h2> {sandwiches.name} </h2>
                        </div>
                        <div class = "description">
                            {sandwiches.description}
                        </div>
                        <div class = "price">
                            <span> Verð: </span>
                            {sandwiches.price}

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
      isFetching: state.getSandwiches.isFetching,
      sandwich: state.getSandwiches.sandwich,
      message: state.getSandwiches.message,
    };
  }
  
export default connect(mapStateToProps)(Sandwich);

