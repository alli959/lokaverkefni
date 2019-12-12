import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter } from 'react-router-dom'



import { fetchMaterials } from '../../actions/getMaterials'
import { fetchMatFromFood } from '../../actions/getMaterialsFromFood';


import './materials.css';







class Materials extends Component {

    state = {
        checked: [],
        isFetchingMaterials: false,
        materials: null,
        messageMaterials: null,
        matInFood: ["NONE"],
        foodId: 0,
        itemId: -1,
    }

    static propTypes = {
        dispatch: PropTypes.func,
        minusHandler: PropTypes.func,
        plusHandler: PropTypes.func,
        minus: PropTypes.array,
        plus: PropTypes.array,
        plusPrice: PropTypes.array,
        isFetchingMaterials: PropTypes.bool,
        itemId: PropTypes.number,
        foodId: PropTypes.number,
        materials: PropTypes.object,
        messageMaterials: PropTypes.object,
        matInFood: PropTypes.array,

    }

    async componentDidUpdate(prevProps){
        const {dispatch} = this.props;
        const {foodId} = this.props;
        const {itemId} = this.props;
        const {materials} = this.props;
        const {matInFood} = this.props;
        const {minus} = this.props;
        const {plus} = this.props;




        if(prevProps.itemId !== this.props.itemId){
            console.log("prevProps",prevProps);
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
        let {minus} = this.props;
        let {plus} = this.props;

        let checked = [];

        
        
        const materials = await this.props.materials;
        const matInFood = await this.props.matInFood;
        
            

        await dispatch(fetchMatFromFood(foodId));
        await dispatch(fetchMaterials());
        this.setState({
            foodId: foodId,
            itemId: itemId,
            materials: materials,
            matInFood: matInFood,
        })


    }


    handleCheck = (e) => {
        const isChecked = e.target.checked;
        const name = e.target.name;
        const price = e.target.value;
        if(isChecked){
            this.props.plusHandler({name: name, price: price});
        }
        else{
            this.props.minusHandler(name);
        }
        
        
    }
    

    
    
        
    


    isChecked(material,matInFood, price){
        const {minus} = this.props;
        const {plus} = this.props;
        const {itemId} = this.props;

        let temp = [];

        for(let i = 0; i<matInFood.length; i++){
            temp.push(matInFood[i]);
        }


        if(itemId != -1){
            console.log("tempBefore",temp);
            const minusMat = minus[itemId].split(',');
            const plusMat = plus[itemId].split(',');
            //first remove from temp the minus materials
            for(let i = 0; i<minusMat.length; i++){
                for(let j = 0; j<temp.length; j++){
                    if(minusMat[i] === temp[j].materialname){
                        temp.splice(j,1);
                        console.log("tempAfter",temp);
                        break;
                    }
                }
            }
            
            
            //start by creating a dict for the temp
            let materialDict = {};
            
            for(let i = 0; i<temp.length; i++){
                materialDict[temp[i].materialname] = true;
            }
            //now add to temp the plus materials
            
            
            for(let i = 0; i<plusMat.length; i++){
                if(!(plusMat[i] in materialDict)){
                    if(plusMat[i] !== "NONE"){
                        
                        temp.push({materialname: plusMat[i]})
                    }
                }
            }
        }

        for(let i = 0; i<temp.length; i++){

            if(temp[i].materialname === material){
                for(let j = 0; j<temp.length; j++){

                }
                return(
                    <li className = "material">
                            <input className = "checkbox" type="checkbox" id={material} name={material} value = {price} onClick = {this.handleCheck} defaultChecked/>
                            <label htmlFor={material}>{material}</label>
                    </li>
                )
            }
        }
        return(
            <li  className = "material">
                <input className = "checkbox" type="checkbox" id={material} name={material} value = {price} onClick = {this.handleCheck}/>
                <label htmlFor={material}>{material}</label>
            </li>
        )
               
    }




      



    render() {

        const {foodId, isFetchingMaterials, materials, isFetchingMatInFood, minus, plus} = this.props;
        let matInFood = this.props.matInFood
        let itemId = this.props.itemId;

        
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

        if(itemId === -1){
            return(
                <div>
                    Select Food Item To Change
                </div>
            )
        }
        else{


        

            return (
                <div className = "materials">
                
                    <ul className = "materialsBox" data-columns="2">
                        {console.log(this.props.matInFood)}
                        {result.map((materials,index) =>
                        <div key = {index}>
                                {this.isChecked(materials.material,matInFood,materials.price)}
                        </div>
                        )}
                    </ul>
                </div>
            )
                        }
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