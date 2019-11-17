import {
    MATFROMFOOD_REQUEST,
    MATFROMFOOD_SUCCESS,
    MATFROMFOOD_FAILURE
  } from '../actions/getMaterialsFromFood';


  const initialState = {
      isFetching: false,
      matInFood: null,
  }


    export default (state = initialState, action) => {
        switch (action.type) {
        case MATFROMFOOD_REQUEST:

            return {
              ...state,
              isFetching: action.isFetching,
          };
        case MATFROMFOOD_SUCCESS:
          return {
            ...state,
             isFetching: action.isFetching,
             matInFood: action.matInFood,
          }
          case MATFROMFOOD_FAILURE:
          return{
            ...state,
            isFetching: action.isFetching,
            message: action.message,
        }
        default:
            return state;
    }
  };
