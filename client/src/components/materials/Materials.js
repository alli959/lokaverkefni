import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter } from 'react-router-dom'



import { fetchMaterials } from '../../actions/getMaterials'
import { fetchMatFromFood } from '../../actions/getMaterialsFromFood';


import './materials.css';







class Materials extends Component {

    state = {
        isFetchingMaterials: false,
        materials: null,
        messageMaterials: null,
        matInFood: [],
        foodId: 0,
        itemId: -1,
    }

    static propTypes = {
        dispatch: PropTypes.func,
        minus: PropTypes.array,
        plus: PropTypes.array,
        isFetchingMaterials: PropTypes.bool,
        itemId: PropTypes.number,
        foodId: PropTypes.number,
        materials: PropTypes.array,
        messageMaterials: PropTypes.object,
        matInFood: PropTypes.array,

    }

    async componentDidUpdate(prevProps){
        if(prevProps.itemId !== this.props.itemId){
            const {dispatch} = this.props;
            const {foodId} = this.props;
            const {itemId} = this.props;
            const {matInFood} = this.props;
            await dispatch(fetchMatFromFood(foodId));

            this.setState({
                foodId: foodId,
                itemId: itemId,
                matInFood: matInFood

            });
        }
    }

    async componentDidMount() {
        const { dispatch} = this.props;
        let {foodId} =  this.props;
        let {itemId} =  this.props;
        const materials = await this.props.materials;
        const matInFood = await this.props.matInFood;
        this.setState({
            foodId: foodId,
            itemId: itemId,
            materials: materials,
            matInFood: matInFood,
        })
        await dispatch(fetchMatFromFood(foodId));
        await dispatch(fetchMaterials());


    }

    isChecked(material){
        const {matInFood} = this.props;
        const {minus} = this.props;
        const {plus} = this.props;
        const {itemId} = this.props;
        for(let i = 0; i<matInFood.length; i++){

            if(matInFood[i].materialname === material){
                let minusInFood = minus[itemId]

                //check if the orderer has already taken this material off
                if(minusInFood !== "NONE"){
                    let temp = minusInFood.split(',');
                    for(let i = 0; i<temp.length; i++){
                        if(temp[i] === material){
                            return(
                                <li>
                                    <input type="checkbox" id={material} name={material}/>
                                    <label for={material}>{material}</label>
                                </li>
                            )
                        }
                    }
                }
                    return(
                        <li>
                            <input type="checkbox" id={material} name={material} checked/>
                            <label for={material}>{material}</label>
                        </li>
                    )
            }
            

        }
    
        let plusInFood = plus[itemId];

        if(plusInFood != "NONE"){
            let temp = plusInFood.split(",");
            for(let i = 0; i<temp.length; i++){
                if(temp[i] === material){
                    return(
                        <li>
                            <input type="checkbox" id={material} name={material} checked/>
                            <label for={material}>{material}</label>
                        </li>
                    )
                }
            }
        }

        return(
                <li>
                    <input type="checkbox" id={material} name={material}/>
                    <label for={material}>{material}</label>
                </li>
        )
        
    }


      



    render() {

        const {itemId, foodId, isFetchingMaterials, materials, isFetchingMatInFood, matInFood} = this.props;
        if(isFetchingMaterials || !materials || isFetchingMatInFood || !matInFood) {
            return (
                <div>
                    sæki álegg...
                </div>
            );
        }
        let result = materials.result;


        if(!result){
            return (
                <div>
                    <h2>Síða finnst ekki, vinsamlegast reyndu aftur</h2>
                </div>
            )
        }

        if(this.state.itemId === -1){
            return(
                <div>
                    Select Food Item To Change
                </div>
            )
        }

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

        

        

    
}

const mapStateToProps = (state) => {

    return {
        isFetchingMaterials: state.getMaterials.isFetching,
        materials: state.getMaterials.material,
        messageMaterials: state.getMaterials.message,
        
        isFetchingMatInFood: state.getMatFromFood.isFetching,
        matInFood: state.getMatFromFood.matInFood,
        messageMatInFood: state.getMatFromFood.message

    
    };
        
}

export default withRouter(connect(mapStateToProps)(Materials));