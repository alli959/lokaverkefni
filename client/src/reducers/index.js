import { combineReducers } from 'redux';
import getOffers from './getOffers';
import getBurgers from './getBurgers';
import getBoats from './getBoats';
import getMaterials from './getMaterials';
import getSandwiches from './getSandwiches';
import getFood from './getFood';
import newOrder from './newOrder';
import getFoodFromOffer from './getFoodFromOffer';
import getMatFromFood from './getMatFromFood';


export default combineReducers({
    getOffers, getBurgers, getBoats, getMaterials, getSandwiches, getFood, newOrder, getFoodFromOffer, getMatFromFood,
})