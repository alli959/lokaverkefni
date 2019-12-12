import api from '../api';

export const FOOD_REQUEST = 'FOOD_REQUEST';
export const FOOD_SUCCESS = 'FOOD_SUCCESS';
export const FOOD_FAILURE = 'FOOD_FAILURE';
export const SEARCH_FOOD_SUCCESS = 'SEARCH_FOOD_SUCCESS';


function requestFood() {
    return {
        type: FOOD_REQUEST,
        isFetching: true,
    }
}

function receiveFood(food) {
    return {
      type: FOOD_SUCCESS,
      isFetching: false,
      food,
    }
  }

function foodError(message) {
    return {
      type: FOOD_FAILURE,
      isFetching: false,
      message,
    }
  }


export const fetchFoods = () => {
    return async (dispatch) => {

        dispatch(requestFood());

        let endpoint = '/food';

        let foods;
        try{
            foods = await api.get(endpoint);
            
        } catch (error) {
            dispatch(foodError(error));
        }

        if (foods.status !== 200 || !foods){
            dispatch(foodError('fail'))
        }
        dispatch(receiveFood(foods));
    }
}