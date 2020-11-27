
import { 
    LOGIN,  
    SIGNOUT
} from './actionTypes'

export const handleAuthenticationError = (err) => {
    return {
        type: LOGIN,
        payload: { user: null, error: err}
    };
}
export const handleLogin = (user) => {
    return {
        type: LOGIN,
        payload: { user: user, error: null}
    };
}
export const handleLogout = () => ({  type: SIGNOUT })