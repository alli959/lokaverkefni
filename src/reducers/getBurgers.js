import {
    BURGER_REQUEST,
    BURGER_SUCCESS,
    BURGER_FAILURE
  } from '../actions/getBurgers';


  const initialState = {
      isFetching: false,
      burger: null,
  }


    export default (state = initialState, action) => {
        switch (action.type) {
        case BURGER_REQUEST:

            return {
              ...state,
              isFetching: action.isFetching,
          };
        case BURGER_SUCCESS:
          return {
            ...state,
             isFetching: action.isFetching,
             burger: action.burger,
          }
          case BURGER_FAILURE:
          return{
            ...state,
            isFetching: action.isFetching,
            message: action.message,
        }
        default:
            return state;
    }
  };
