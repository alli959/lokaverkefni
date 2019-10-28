import api from '../api';

export const ORDER_REQUEST = 'ORDER_REQUEST';
export const ORDER_SUCCESS = 'ORDER_SUCCESS';
export const ORDER_FAILURE = 'ORDER_FAILURE';
export const SEARCH_ORDER_SUCCESS = 'SEARCH_ORDER_SUCCESS';


function requestOrder() {
    return {
        type: ORDER_REQUEST,
        isFetching: true,
    }
}

function receiveOrder(order) {
    return {
      type: ORDER_SUCCESS,
      isFetching: false,
      order,
    }
  }

function orderError(message) {
    return {
      type: ORDER_FAILURE,
      isFetching: false,
      message,
    }
  }


export const newOrders = (order) => {
    return async (dispatch) => {

        await dispatch(requestOrder());

        let endpoint = '/orders';

        let orders;
        try{
            orders = await api.post(endpoint, order);
        } catch (error) {
            dispatch(orderError("error"));
        }
        if (orders.status !== 200 || !orders){
            dispatch(orderError('fail'))
        }
        dispatch(receiveOrder(orders));
    }
}