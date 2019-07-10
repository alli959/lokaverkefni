import {
    MATERIAL_REQUEST,
    MATERIAL_SUCCESS,
    MATERIAL_FAILURE
  } from '../actions/getMaterials';


  const initialState = {
      isFetching: false,
      material: null,
  }


    export default (state = initialState, action) => {
        switch (action.type) {
        case MATERIAL_REQUEST:

            return {
              ...state,
              isFetching: action.isFetching,
          };
        case MATERIAL_SUCCESS:
          return {
            ...state,
             isFetching: action.isFetching,
             material: action.material,
          }
          case MATERIAL_FAILURE:
          return{
            ...state,
            isFetching: action.isFetching,
            message: action.message,
        }
        default:
            return state;
    }
  };
