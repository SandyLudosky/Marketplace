import {
    LOGIN, 
    SIGNOUT
} from '../actions/actionTypes'

const initialState = {
    current: null, 
    error : null
};
const user = (state = initialState, { type, payload }) => { 
    console.log(type)
    switch (type) { 
        case LOGIN:
        if (state.current) { return state } 
        return {
            current: payload.user, 
            error: payload.error, 
        }
        case SIGNOUT: return initialState
    default:
      return state;
    } 
}
export default user