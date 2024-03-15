import React from 'react';
import { Link } from "react-router-dom";
import logo from '../../public/assests/SVG/logo-green.svg';
import {withAuth0 } from "@auth0/auth0-react";
import Login from "./Login.jsx";
import Logout from "./Logout.jsx";



class Header extends React.Component {

render() {
	const { user, isAuthenticated } = this.props.auth0;


		return (
			<div className='header'>
				<div className='nav-bar'>
					<div className='nav-bar-background'>
						<div className='nav-buttons-background'>
							<Link className='nav-buttons' to="/" >Home</Link>
						</div>
						<div className='nav-buttons-background' >
							<Link className='nav-buttons' to="/Notebook" >Notebook</Link>
						</div>
					</div>
				</div>
				<div className='LogoHolder'>
					<img className='Logo' src={logo}/>
				</div>
				<div className='login-bar'>
					<div className='login-bar-background'>
						{isAuthenticated ? <p className='welcome'>Welcome {user.name.split(' ')[0]}!</p>: null}
						{isAuthenticated ?<Link className='nav-buttons' to='/profile'>Profile</Link> : null}
						{isAuthenticated ? <Logout/> : <Login/>}
					</div>
				</div>
			</div>
		)
	}
}

export default withAuth0(Header);
