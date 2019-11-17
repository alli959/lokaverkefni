import React, { Component } from 'react';

import {withRouter } from 'react-router-dom'

import { Link } from 'react-router-dom';

import Button from '../button';

import './navbar.css';



class Navbar extends Component {

    constructor(props){
        super(props);
        this.state = {
            colors: [
            {background: 'black'},
            {background: 'rgb(255, 1, 1)'},
            {background: 'rgb(255, 1, 1)'}, 
            {background: 'rgb(255, 1, 1)'}
        ]

        }
    }
    

    componentDidUpdate(prevProps){
        const hash = this.props.location.hash;
        const prevHash = prevProps.location.hash;
        let colors = [];
        if(prevHash !== hash){
            if(hash === '#offers'){
                    colors = [
                        {background: 'black'},
                        {background: 'rgb(255, 1, 1)'},
                        {background: 'rgb(255, 1, 1)'}, 
                        {background: 'rgb(255, 1, 1)'}
                    ];
                }

                else if(hash === '#burgers'){

                    colors = [
                        {background: 'rgb(255, 1, 1)'},
                        {background: 'black'},
                        {background: 'rgb(255, 1, 1)'}, 
                        {background: 'rgb(255, 1, 1)'}
                    ];
                
                }
                    else if(hash === "#boats"){

                        colors = [
                            {background: 'rgb(255, 1, 1)'},
                            {background: 'rgb(255, 1, 1)'}, 
                            {background: 'black'},
                            {background: 'rgb(255, 1, 1)'}
                        ];
                        
                    }
                    else if(hash === "#sandwiches"){

                        colors = [
                            {background: 'rgb(255, 1, 1)'},
                            {background: 'rgb(255, 1, 1)'}, 
                            {background: 'rgb(255, 1, 1)'},
                            {background: 'black'},
                        ];
                    
                    }
                    this.setState({colors: colors});
                                
                                
                }
            }
                            
        
                        
    changeColor(index){

        const temp = this.state.colors;
        for(let i = 0; i<temp.length; i++){
            if(i === index){
                temp[i] = {background: 'black'};
            }
            else{
                temp[i] = {background: 'rgb(255, 1, 1)'};
            }
        }
        this.setState({
            colors: temp
        });
    };
    
    render(){
        return (
            <div className = "Top">
                {console.log("colors",this.state.colors)}
                <div className = "Header">
                    <Link to="/">
                        <img src={require('../../Images/gullnesti-logo.png')} alt = "Gullnesti" style = {{maxWidth: '9em', maxHeight: '8em'}} />
                    </Link>
                    <Button className="button__heading"><Link to="/menu">Matseðill</Link></Button>
                </div>
                <ul className="navBar">
                    <button style = {this.state.colors[0]}><Link className="Offers" to="#offers">Tilboð</Link></button>
                    <button style = {this.state.colors[1]}><Link className="Burgers" to="#burgers">Borgarar</Link></button>
                    <button style = {this.state.colors[2]}><Link className="Boats" to="#boats">Bátar</Link></button>
                    <button style = {this.state.colors[3]}><Link className="Sandwiches" to="#sandwiches">Samlokur</Link></button>
                </ul>
            </div>

        )
    }

}


export default withRouter(Navbar);