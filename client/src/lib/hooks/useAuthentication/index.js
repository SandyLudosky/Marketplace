import * as Realm from "realm-web";
import { app } from '../../mongoDB-sdk'
import { addUser, getUser } from '../../service'
import { handleLogin, handleAuthenticationError, handleLogout } from '../../state/actions/authentication'

const useAuthentication = (dispatch) => { 
    function handleUserRegistration(user) { 
        return new Promise(resolve => { 
            app.emailPasswordAuth
                .registerUser(user.email, user.password)
                .then(async () => { 
                    app.logIn(Realm.Credentials.emailPassword(user.email, user.password))
                        .then(() => { 
                            addUser(user)
                            dispatch(handleLogin(user))
                            resolve(user)  
                        })
                })
                .catch(err => dispatch(handleAuthenticationError(err)))
            })
    }
    function handleUserLogin(email, password) { 
        return new Promise(resolve => {
            app.logIn(Realm.Credentials.emailPassword(email, password))
                .then(async () => { 
                    // verify current user 
                    const currentUser = await app.currentUser
                    // retrieve user profile
                    getUser(currentUser.email)
                        .then(userProfile => { 
                            dispatch(handleLogin(userProfile))
                                resolve(currentUser)
                        }) 
                })
                .catch(err => dispatch(handleAuthenticationError(err)))
            })
    } 
    async function handleUserLogout() { 
        app.currentUser?.logOut()
            .then(() => dispatch(handleLogout()))
            .catch(err => console.log(err))
    }
    async function handleAuthentication() { 
        const currentUser = await app.currentUser
        getUser(currentUser?.email)
            .then(userProfile => !!currentUser && dispatch(handleLogin(userProfile)))
            .catch(err =>  dispatch(handleAuthenticationError(err)))
    }
    return {
        handleUserRegistration,
        handleUserLogin,
        handleUserLogout, 
        handleAuthentication    
    }
}
export default useAuthentication
