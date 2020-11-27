import React from 'react';  
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useAuthentication from '../../lib/hooks/useAuthentication'

const UserLogin = ({ user  }) => { 
	const dispatch = useDispatch()
	const { handleUserLogout } = useAuthentication(dispatch)
	const logout = async () => { 
		handleUserLogout()
		// setTimeout(() => window.location.reload(), 1000)
	}
	return (
		<>
			<li><span className="nav-link">
				{!!user ?
					<>
						<button className="btn btn-danger btn-sm" onClick={logout}>logout</button>{" "}
						<span><b>Hi, {user?.first}</b></span>
					</> :
					<span>
						<Link to={'/login'}>login</Link> or <Link to={'/register'}>register</Link>
					</span>
				}
				</span>
			</li>
		</>
	)
}

const Header = () => {
	const dispatch = useDispatch()
	const {  handleAuthentication } = useAuthentication(dispatch)
	const { items } = useSelector(state => ({ ...state.cart }));
	const { current } = useSelector(state => ({ ...state.user }));
	const quantity = items.length > 0 ? items.length : ''


	React.useEffect(() => handleAuthentication(), [current])
	
	return(<nav className="navbar d-flex p-md-0 navbar-expand-lg navbar-light bg-light border-bottom">
			<div className="container-fluid">
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTop4" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse" id="navbarTop4">
					<ul className="navbar-nav mr-auto">
					<UserLogin user={current} />
					<li><a href="#" className="nav-link" disabled={true}> Deals </a></li>
					<li><Link className="nav-link" to={'/help'}>Help</Link></li>
				</ul>
				<ul className="navbar-nav">
					<li><a href="#" className="nav-link"> <img src="images/icons/flags/US.png" height="16" /> Ship to </a></li>
					<li className="nav-item dropdown">
						<a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown"> Watchlist </a>
						<ul className="dropdown-menu small">
							<li><a className="dropdown-item" href="#">First item</a></li>
							<li><a className="dropdown-item" href="#">Second item</a></li>
							<li><a className="dropdown-item" href="#">Third item </a></li>
						</ul>
					</li>
					<li><a href="#" className="nav-link" disabled={true}> My Orders </a></li>
					<li><a href="#" className="nav-link"> <i className="fas fa-bell"></i></a></li>
					<li><Link to={'/cart'} className="nav-link"><i className="fas fa-shopping-cart"></i></Link></li><li> {' '}<span className="badge badge-primary">{ quantity }</span></li>
				</ul> 
			</div> 
			</div> 
    </nav>)
}
  
export default Header;
