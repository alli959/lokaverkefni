import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import querystring from 'querystring';
import { fetchBoats } from '../../actions/getBoats'
import './boat.css';

class Boat extends Component {

    state = {
        isFetching: false,
        boat: null,
        message: null,
    }

    static propTypes = {
        dispatch: PropTypes.func,
        isFetching: PropTypes.bool,
        boat: PropTypes.object,
        message: PropTypes.object,
    }










    async componentDidMount() {
        const { dispatch } = this.props;
        let boats = await this.props.boat;
        await this.setState({
            boat: boats,
        })
        dispatch(fetchBoats());


    }

    render() {
        const { isFetching, boat } = this.props;
        if (isFetching || !boat) {
            return (
                <div>
                    sæki báta...
                </div>
            );
        }
        let { result } = boat;
        
        
        if(!result){
            return(
                <div>
                    <h2>Síða finnst ekki, vinsamlegast reyndu aftur</h2>
                </div>
            )
        }

    


    return (
        
      <div class = "content">

        <ul class = "boat-list">
            {result.map(boats =>
                <li key={boats.id}>
                    <div class = "boat-item">
                        <div class = "name">
                            <h2> {boats.name} </h2>
                        </div>
                        <div class = "description">
                            {boats.description}
                        </div>
                        <div class = "price">
                            <span> Verð: </span>
                            {boats.price}

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
      isFetching: state.getBoats.isFetching,
      boat: state.getBoats.boat,
      message: state.getBoats.message,
    };
  }
  
export default connect(mapStateToProps)(Boat);

