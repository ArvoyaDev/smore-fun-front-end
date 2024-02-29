import React from 'react';
import { Link } from "react-router-dom";

class Header extends React.Component {
	render() {
		return (
			<div>
				<h1 >HELLO!!!!!!!!</h1>
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