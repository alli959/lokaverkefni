import { combineReducers } from 'redux';
import getOffers from './getOffers';
import getBurgers from './getBurgers';
import getBoats from './getBoats';
import getMaterials from './getMaterials';
import getSandwiches from './getSandwiches';


export default combineReducers({
    getOffers, getBurgers, getBoats, getMaterials, getSandwiches
})