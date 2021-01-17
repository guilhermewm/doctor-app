import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';

import './styles.scss';


const Login: React.FC = () => {
	
	return (
		<>
			<Container className="login">
				<Form>					
					<h2>Login</h2>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control type="email" placeholder="Enter email" />
					</Form.Group>
					<Form.Group controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" placeholder="Password" />
					</Form.Group>
					<Button variant="dark" type="submit">
						Login
					</Button>
				</Form>	
			</Container>
		</>
	)
}

export default Login;
