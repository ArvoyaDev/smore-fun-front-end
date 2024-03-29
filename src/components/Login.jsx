import { useAuth0 } from "@auth0/auth0-react";
import { Button } from 'react-bootstrap';

const LoginButton = () => {
	const { loginWithRedirect } = useAuth0();
	return <button className='nav-buttons' onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButton;