import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
        clickHandler: PropTypes.func,
    }










    async componentDidMount() {
        const { dispatch } = this.props;
        let boats = await this.props.boat;
        await this.setState({
            boat: boats,
        })
        dispatch(fetchBoats());


    }


    handleButtonClick = (e) => {
        const {result} = this.props.boat;
        const index = e.currentTarget.getAttribute('id');

        this.props.clickHandler(result[index]);
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
        
      <div className = "content">

        <ul className = "boat-list">
            {result.map(boats =>
                 <button key={boats.id} id={result.indexOf(boats)} onClick={this.handleButtonClick} style = {{marginTop: '1em'}}><li key={boats.id}>
                    <div className = "boat-item">
                        <div className = "name">
                            <h2> {boats.name} </h2>
                        </div>
                        <div className = "description">
                            {boats.description}
                        </div>
                        <div className = "price">
                            <span> Verð: </span>
                            {boats.price}

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
      isFetching: state.getBoats.isFetching,
      boat: state.getBoats.boat,
      message: state.getBoats.message,
    };
  }
  
export default connect(mapStateToProps)(Boat);

