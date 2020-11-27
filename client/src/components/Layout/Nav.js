import React from 'react';  
import { Link } from "react-router-dom";

const Nav = () => {
  const links = ["Home", "About"]
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    <Link className="navbar-brand" to={'/'}><b>AZ-Marketplace</b></Link> 

  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse " id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto menu">
      {links.map(link => {
        return (<li className='mr-4' key={link} onClick={() => { }}><Link to={`/${link == "Home" ? "" : link }`}>{link}</Link></li>)
        })
      }
    </ul>
    <form className="form-inline my-2 my-lg-0">
      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
      <button className="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</nav>)
}
export default Nav
