import React from 'react';
import { Link } from "react-router-dom";
import { Offcanvas } from 'react-bootstrap';
import logo from '../../public/assests/SVG/logo-green.svg';
import { withAuth0 } from "@auth0/auth0-react";
import Login from "./Login.jsx";
import Logout from "./Logout.jsx";

class Header extends React.Component {
	state = {
		showOffcanvas: false,
		windowWidth: window.innerWidth
	}

	handleResize = () => {
		this.setState({ windowWidth: window.innerWidth });
	}

	componentDidMount() {
		window.addEventListener('resize', this.handleResize);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	}

	handleToggleOffcanvas = () => {
		this.setState(prevState => ({ showOffcanvas: !prevState.showOffcanvas }));
	}

	render() {
		const { user, isAuthenticated } = this.props.auth0;
		const { windowWidth, showOffcanvas } = this.state;

		return (
			<div className='header'>
				{windowWidth < 830 ? (
					<>
						<Offcanvas show={showOffcanvas} onHide={this.handleToggleOffcanvas}>
							<Offcanvas.Header  closeButton>
							</Offcanvas.Header>
							<Offcanvas.Body>
								<>
									<div className='nav-bar'>
											<div className='nav-buttons-background'>
												<Link className='nav-buttons' to="/" >Home</Link>
											</div>
											<div className='nav-buttons-background' >
												<Link className='nav-buttons' to="/Notebook" >Notebook</Link>
											</div>
									</div>
									<div className='login-bar'>
											{isAuthenticated ?<Link className='nav-buttons' to='/profile'>Profile</Link> : null}
											{isAuthenticated ? <Logout/> : <Login/>}
									</div>
								</>
							</Offcanvas.Body>
						</Offcanvas>
						<button className='mobile-menu' onClick={this.handleToggleOffcanvas}>
							<div className="hamburger-line"></div>
							<div className="hamburger-line"></div>
							<div className="hamburger-line"></div>
						</button>
						<div className='LogoHolder'>
							<img className='Logo' src={logo}/>
						</div>
					</>
				) : (
					<>
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
					</>
				)}
			</div>
		)
	}
}

export default withAuth0(Header);