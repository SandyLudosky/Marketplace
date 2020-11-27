import {
    SET_PAGE_INDEX,
    GET_PRODUCTS_PENDING, 
    GET_PRODUCTS_SUCCESS, 
    GET_PRODUCTS_FAILURE
} from '../actions/actionTypes'

const initialState = { 
  isLoading: false,
  pageIndex: 0,
  items: []
};
const products = (state = initialState, { type, payload}) => { 
    switch (type) {
        case GET_PRODUCTS_PENDING:
             return {
                 ...state, 
                isLoading: true
             }
        case GET_PRODUCTS_SUCCESS:
             return {
                ...state, 
                isLoading: false,
                items: payload.data
            } 
        case GET_PRODUCTS_FAILURE:
            return {
            ...state, 
            isLoading: false,
            items: payload.error
        }
        case SET_PAGE_INDEX:
            return {
            ...state, 
            pageIndex: payload.index
            }       
        default:
        return state;
  }
}
export default products 