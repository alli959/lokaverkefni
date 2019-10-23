import React, { Component } from 'react';

import {withRouter } from 'react-router-dom'

import './navbar.css';



class Navbar extends Component {

    constructor(props){
        super(props);
        this.state = {
            colors: [
            {background: 'black'},
            {background: 'rgb(201, 40, 152)'},
            {background: 'rgb(201, 40, 152)'}, 
            {background: 'rgb(201, 40, 152)'}
        ]

        }
    }
    

    changeColor(index){

        const temp = this.state.colors;
        for(let i = 0; i<temp.length; i++){
            if(i === index){
                temp[i] = {background: 'black'};
            }
            else{
                temp[i] = {background: 'rgb(201, 40, 152)'};
            }
        }
        this.setState({
            colors: temp
        });
    };
    
    render(){
        return (
            <ul className="navBar">
                <button style = {this.state.colors[0]} onClick = {() => this.changeColor(0)}><a className="Offers" href="#offers">Tilboð</a></button>
                <button style = {this.state.colors[1]} onClick = {() => this.changeColor(1)}><a className="Burgers" href="#burgers">Borgarar</a></button>
                <button style = {this.state.colors[2]} onClick = {() => this.changeColor(2)}><a className="Boats" href="#boats">Bátar</a></button>
                <button style = {this.state.colors[3]} onClick = {() => this.changeColor(3)}><a className="Sandwiches" href="#sandwiches">Samlokur</a></button>
            </ul>

        )
    }

}


export default withRouter(Navbar);