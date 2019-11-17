import api from '../api';

export const FOODFROMOFFER_REQUEST = 'FOODFROMOFFER_REQUEST';
export const FOODFROMOFFER_SUCCESS = 'FOODFROMOFFER_SUCCESS';
export const FOODFROMOFFER_FAILURE = 'FOODFROMOFFER_FAILURE';
export const SEARCH_FOODFROMOFFER_SUCCESS = 'SEARCH_FOODFROMOFFER_SUCCESS';


function requestFoodFromOffer() {
    return {
        type: FOODFROMOFFER_REQUEST,
        isFetching: true,
    }
}

function receiveFoodFromOffer(foodInOffer) {
    return {
      type: FOODFROMOFFER_SUCCESS,
      isFetching: false,
      foodInOffer,
    }
  }

function FoodFromOffertError(message) {
    return {
      type: FOODFROMOFFER_FAILURE,
      isFetching: false,
      message,
    }
  }


export const fetchFoodFromOffer = (id) => {
    return async (dispatch) => {

        dispatch(requestFoodFromOffer());

        let endpoint = `/foodinoffer/${id}`;

        let FoodInOffer;
        try{
            FoodInOffer = await api.get(endpoint);
            
        } catch (error) {
            dispatch(FoodFromOffertError(error));
        }

        if (FoodInOffer.status !== 200 || !FoodInOffer){
            dispatch(FoodFromOffertError('fail'))
        }
        dispatch(receiveFoodFromOffer(FoodInOffer.result));
    }
}