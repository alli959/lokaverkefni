import {
    SANDWICH_REQUEST,
    SANDWICH_SUCCESS,
    SANDWICH_FAILURE
  } from '../actions/getSandwiches';


  const initialState = {
      isFetching: false,
      sandwich: null,
  }


    export default (state = initialState, action) => {
        switch (action.type) {
        case SANDWICH_REQUEST:

            return {
              ...state,
              isFetching: action.isFetching,
          };
        case SANDWICH_SUCCESS:
          return {
            ...state,
             isFetching: action.isFetching,
             sandwich: action.sandwich,
          }
          case SANDWICH_FAILURE:
          return{
            ...state,
            isFetching: action.isFetching,
            message: action.message,
        }
        default:
            return state;
    }
  };
