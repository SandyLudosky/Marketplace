import React from 'react';  
import {Route } from "react-router-dom";
import { useDispatch } from 'react-redux';
import Home from './Home'
import About from './Misc/About'
import Help from './Misc/Help'
import Login from './Auth/Login'
import Register from './Auth/Register'
import Checkout from './Checkout'
import Success from './Checkout/Success'
import Cancel from './Checkout/Cancel'
import Cart from './Cart'
import Layout from './Layout'
import useAuthentication from '../lib/hooks/useAuthentication'

const App = () => {
  const dispatch = useDispatch()
	const { handleAuthentication } = useAuthentication(dispatch)
  React.useEffect(() => { 
    handleAuthentication()
  }, []) 
	
  return (
      <Layout>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/help" component={Help} />
        <Route path="/register" component={Register} />
        <Route path="/login"  component={Login}  />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/success" component={Success} />
        <Route path="/cancel" component={Cancel} />
       </Layout>
  );
}
export default App;
