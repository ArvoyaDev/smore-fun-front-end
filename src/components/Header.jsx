import React from 'react';
import { Link } from "react-router-dom";
import logo from '../../public/assests/SVG/Logo_1.svg';


class Header extends React.Component {
	render() {
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
						<div className='nav-buttons-background'>
							<Link className='nav-buttons' to='/'>Login</Link>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Header;