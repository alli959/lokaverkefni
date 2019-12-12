import api from '../api';

export const MATERIAL_REQUEST = 'MATERIAL_REQUEST';
export const MATERIAL_SUCCESS = 'MATERIAL_SUCCESS';
export const MATERIAL_FAILURE = 'MATERIAL_FAILURE';
export const SEARCH_MATERIAL_SUCCESS = 'SEARCH_MATERIAL_SUCCESS';


function requestMaterial() {
    return {
        type: MATERIAL_REQUEST,
        isFetching: true,
    }
}

function receiveMaterial(material) {
    return {
      type: MATERIAL_SUCCESS,
      isFetching: false,
      material,
    }
  }

function materialError(message) {
    return {
      type: MATERIAL_FAILURE,
      isFetching: false,
      message,
    }
  }


export const fetchMaterials = () => {
    return async (dispatch) => {

        dispatch(requestMaterial());

        let endpoint = '/materials';

        let materials;
        try{
            materials = await api.get(endpoint);
            
        } catch (error) {
            dispatch(materialError(error));
        }

        if (materials.status !== 200 || !materials){
            dispatch(materialError('fail'))
        }
        dispatch(receiveMaterial(materials));
    }
}