import api from '../api';

export const MATFROMFOOD_REQUEST = 'MATFROMFOOD_REQUEST';
export const MATFROMFOOD_SUCCESS = 'MATFROMFOOD_SUCCESS';
export const MATFROMFOOD_FAILURE = 'MATFROMFOOD_FAILURE';
export const SEARCH_MATFROMFOOD_SUCCESS = 'SEARCH_MATFROMFOOD_SUCCESS';


function requestMatFromFood() {
    return {
        type: MATFROMFOOD_REQUEST,
        isFetching: true,
    }
}

function receiveMatFromFood(matInFood) {
    return {
      type: MATFROMFOOD_SUCCESS,
      isFetching: false,
      matInFood,
    }
  }

function MatFromFoodtError(message) {
    return {
      type: MATFROMFOOD_FAILURE,
      isFetching: false,
      message,
    }
  }


export const fetchMatFromFood = (id) => {
    return async (dispatch) => {

        dispatch(requestMatFromFood());

        let endpoint = `/materialsinfood/${id}`;

        let MatInFood;
        try{
            MatInFood = await api.get(endpoint);
            
        } catch (error) {
            dispatch(MatFromFoodtError(error));
        }

        if (MatInFood.status !== 200 || !MatInFood){
            dispatch(MatFromFoodtError('fail'))
        }
        dispatch(receiveMatFromFood(MatInFood.result));
    }
}