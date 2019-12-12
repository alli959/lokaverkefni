import {
    ORDER_REQUEST,
    ORDER_SUCCESS,
    ORDER_FAILURE
  } from '../actions/newOrder';


  const initialState = {
      isFetching: false,
      order: null,
  }


    export default (state = initialState, action) => {
        switch (action.type) {
        case ORDER_REQUEST:

            return {
              ...state,
              isFetching: action.isFetching,
          };
        case ORDER_SUCCESS:
          return {
            ...state,
             isFetching: action.isFetching,
             order: action.order,
          }
          case ORDER_FAILURE:
          return{
            ...state,
            isFetching: action.isFetching,
            message: action.message,
        }
        default:
            return state;
    }
  };
