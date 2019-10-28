import {
    BOAT_REQUEST,
    BOAT_SUCCESS,
    BOAT_FAILURE
  } from '../actions/getBoats';


  const initialState = {
      isFetching: false,
      boat: null,
  }


    export default (state = initialState, action) => {
        switch (action.type) {
        case BOAT_REQUEST:

            return {
              ...state,
              isFetching: action.isFetching,
          };
        case BOAT_SUCCESS:
          
          return {
            ...state,
             isFetching: action.isFetching,
             boat: action.boat,
          }
          case BOAT_FAILURE:
          return{
            ...state,
            isFetching: action.isFetching,
            message: action.message,
        }
        default:
            return state;
    }
  };
