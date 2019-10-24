import {
    FOOD_REQUEST,
    FOOD_SUCCESS,
    FOOD_FAILURE
  } from '../actions/getFood';


  const initialState = {
      isFetching: false,
      food: null,
  }


    export default (state = initialState, action) => {
        switch (action.type) {
        case FOOD_REQUEST:

            return {
              ...state,
              isFetching: action.isFetching,
          };
        case FOOD_SUCCESS:
          return {
            ...state,
             isFetching: action.isFetching,
             food: action.food,
          }
          case FOOD_FAILURE:
          return{
            ...state,
            isFetching: action.isFetching,
            message: action.message,
        }
        default:
            return state;
    }
  };
