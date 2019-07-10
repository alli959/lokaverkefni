import api from '../api';

export const BOAT_REQUEST = 'BOAT_REQUEST';
export const BOAT_SUCCESS = 'BOAT_SUCCESS';
export const BOAT_FAILURE = 'BOAT_FAILURE';
export const SEARCH_BOAT_SUCCESS = 'SEARCH_BOAT_SUCCESS';


function requestBoat() {
    return {
        type: BOAT_REQUEST,
        isFetching: true,
    }
}

function receiveBoat(boat) {
    return {
      type: BOAT_SUCCESS,
      isFetching: false,
      boat,
    }
  }

function boatError(message) {
    return {
      type: BOAT_FAILURE,
      isFetching: false,
      message,
    }
  }


export const fetchBoats = () => {
    return async (dispatch) => {

        dispatch(requestBoat());

        let endpoint = '/boats';

        let boats;
        try{
            boats = await api.get(endpoint);
            
        } catch (error) {
            dispatch(boatError(error));
        }

        if (boats.status !== 200 || !boats){
            dispatch(boatError('fail'))
        }
        dispatch(receiveBoat(boats));
    }
}