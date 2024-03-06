import React from 'react';
import { Link } from "react-router-dom";
import logo from '../../public/assests/SVG/Logo_1.svg';


class Header extends React.Component {
	render() {
		return (
			<div>
				<div className='LogoHolder'>
				<img className='Logo' src={logo}/>
				</div>
				<div >
					<Link to="/" >Home</Link>
				</div>
				<div >
					<Link to="/Notebook" >Notebook</Link>
				</div>
			</div>
		)
	}
}

export default Header;