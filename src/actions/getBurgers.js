import api from '../api';

export const BURGER_REQUEST = 'BURGER_REQUEST';
export const BURGER_SUCCESS = 'BURGER_SUCCESS';
export const BURGER_FAILURE = 'BURGER_FAILURE';
export const SEARCH_BURGER_SUCCESS = 'SEARCH_BURGER_SUCCESS';


function requestBurger() {
    return {
        type: BURGER_REQUEST,
        isFetching: true,
    }
}

function receiveBurger(burger) {
    return {
      type: BURGER_SUCCESS,
      isFetching: false,
      burger,
    }
  }

function burgerError(message) {
    return {
      type: BURGER_FAILURE,
      isFetching: false,
      message,
    }
  }


export const fetchBurgers = () => {
    return async (dispatch) => {

        dispatch(requestBurger());

        let endpoint = '/burgers';

        let burgers;
        try{
            burgers = await api.get(endpoint);
            
        } catch (error) {
            dispatch(burgerError(error));
        }

        if (burgers.status !== 200 || !burgers){
            dispatch(burgerError('fail'))
        }
        dispatch(receiveBurger(burgers));
    }
}