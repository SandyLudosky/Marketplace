import React from 'react'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useFormValidation } from '../../../lib/hooks/useFormValidation'
import useAuthentication from '../../../lib/hooks/useAuthentication'
import * as Input from '../Input'

const Alert = ({ isVisible }) => (
	isVisible &&
	<div className="alert alert-info mt-3">
		<p className="icontext"><i className="icon text-primary fa fa-thumbs-up"></i>User successfully connected</p>
    </div>
)
const ErrorMessage = ({ error }) => (
	error && 
	<div className="alert alert-danger mt-3">
		<p className="icontext]" style={{ color: 'crimson' }}><i className="icon text-danger fas fa-exclamation-circle"></i> {' '}{error?.error}</p>
    </div>
)

const defaultValues = {
	email: 'sandy@gmail.com',
	password: '' ,
}
const Login = ({ history }) => { 
  const dispatch = useDispatch()
  const { current, error } = useSelector(state => ({ ...state.user }));
  const { formValues, validate, handleOnChange, isValid } = useFormValidation({ formName: 'login', defaultValues: defaultValues })
	const {  email, password } = formValues['login'] ?? {}
  const { handleUserLogin } = useAuthentication(dispatch)
  React.useEffect(() => validate(formValues['login'] ?? {}), [formValues, handleOnChange]) 
	
 	const handleOnSubmit = async (e) => { 
		e.preventDefault()
		const user = await handleUserLogin( email, password)
		  if (user) { 
			  setTimeout(() => history.push('/'), 2000)
		  }
    }
  return(<>
		<div className="card mx-auto" style={{maxWidth: '380px', marginTop:'200px'}}>
      <div className="card-body">
        <h4 className="card-title mb-4">Sign in</h4>
        <ErrorMessage error={error} />
        <Alert isVisible={!!current} />
        
       	<form name="login" onSubmit={handleOnSubmit}>
          {/* 
          <a href="#" className="btn btn-facebook btn-block mb-2"> <i className="fab fa-facebook-f"></i> &nbsp  Sign in with Facebook</a>
          <a href="#" className="btn btn-google btn-block mb-4"> <i className="fab fa-google"></i> &nbsp  Sign in with Google</a> 
          */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <Input.Email label="Email" style={{padding: 0}}   value={email} onChange={handleOnChange}/>
          </div>
          <div className="form-group">
				    <Input.Password label="Password" name="password" value={password} style={{padding: 0}}  onChange={handleOnChange} />
          </div>
          <div className="form-group"> 
					  <Input.Checkbox col="6">Remember</Input.Checkbox>
				  </div>   
          <div className="form-group">
					  <Input.Submit classNamees="btn-primary btn-block" title="Login" disabled={!isValid} /> 
			    </div>  
      </form>
      </div>
    </div> 
     <p className="text-center mt-4">Don't have account? <Link to='/register'>Sign Up</Link></p>
		<br /><br />
	</>)
}  
export default Login