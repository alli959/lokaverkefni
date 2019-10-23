import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import { fetchMaterials } from '../../actions/getMaterials'


import './materials.css';







class Materials extends Component {

    state = {
        foodToChange: null,
        orderItemToChange: null,
        materialToChange: null,
        isFetching: false,
        material: null,
        message: null,
    }

    static propTypes = {
        foodToChange: PropTypes.string,
        materialToChange: PropTypes.string,
        orderItemToChange: PropTypes.object,
        foods: PropTypes.object,
        material: PropTypes.object,
        dispatch: PropTypes.func,
        isFetching: PropTypes.object,
        message: PropTypes.object,


        
    }

    async componentDidMount() {
        const { dispatch} = this.props;
        let materials = await this.props.material;
        let foodToChange = await this.props.foodToChange;
        let orderItemToChange = await this.props.orderItemToChange;
        let materialToChange = await this.props.materialToChange;
        await this.setState({
            material: materials,
            foodToChange: foodToChange,
            orderItemToChange: orderItemToChange,
            materialToChange: materialToChange,
        })
        dispatch(fetchMaterials());
    }

    isChecked(material){
        let {materialToChange} = this.props;
        if(materialToChange.includes(material)){
            console.log(material);
            return(
                    <li>
                        <input type="checkbox" id={material} name={material} checked/>
                        <label for={material}>{material}</label>
                    </li>
            )
        }
        else{
            return(
                    <li>
                        <input type="checkbox" id={material} name={material}/>
                        <label for={material}>{material}</label>
                    </li>
            )
        }
    }


      



    render() {

        const { isFetching, material} = this.props;
        if(isFetching || !material) {
            return (
                <div>
                    sæki álegg...
                </div>
            );
        }
        let result = material.result;


        if(!result){
            return (
                <div>
                    <h2>Síða finnst ekki, vinsamlegast reyndu aftur</h2>
                </div>
            )
        }


        if(this.props.orderItemToChange === null){
            return(
                <h1>Hello</h1>
            )
        }

        if(this.props.orderItemToChange != null){
            return (
                <div className = "materials">
                    <ul className = "materialsBox">
                        {result.map(materials =>
                        <div>
                                {this.isChecked(materials.material)}
                        </div>
                        )}
                    </ul>
                </div>
            )
        }
        return(
            <h1>hello</h1>
        )
        

        

    }
}

const mapStateToProps = (state) => {

    return {
        isFetching: state.getMaterials.isFetching,
        material: state.getMaterials.material,
        message: state.getMaterials.message
    };
        
}

export default connect(mapStateToProps)(Materials);