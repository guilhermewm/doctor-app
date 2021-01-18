import { Field, Formik } from 'formik';
import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import * as Yup from "yup";
import SpinnerWrapper from '../../Components/SpinnerWrapper/SpinnerWrapper';
import { doLogin } from '../../request/request';
import ModalWrapper from '../../Components/ModalWrapper/ModalWrapper';
import { User } from './type';

import './styles.scss';


const Login: React.FC = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<any>({});

	const history = useHistory();
	const onSubmitLogin = async (values: User) => {
		setIsLoading(true);
		try {
			const { data } = await doLogin(values);
			localStorage.setItem('token', data.token);
			localStorage.setItem('user', JSON.stringify(data.user));
			history.push("/");
		} catch(err) {
			setError(err.response.data);
		} finally {
			setIsLoading(false);
		}
	}

	const handleClose = () => setError(false);

	const SignupSchema = Yup.object().shape({
		password: Yup.string()
		  .min(6, 'Too Short!')
		  .max(50, 'Too Long!')
		  .required('Required'),
		email: Yup.string().email('Invalid email').required('Required'),
	  });
	  
	return (
		<>
			{isLoading && (
				<SpinnerWrapper />
			)}
			
			<ModalWrapper show={!!error.status} handleClose={handleClose} error={error.message}/>
			
			<Container className="login">	
				<Formik
					initialValues={{
						email: '',
						password: '',
					}}
					validationSchema={SignupSchema}
					onSubmit={(values) => {
						onSubmitLogin(values);
					}}
					>		
					{({ errors, touched, handleSubmit }) => (	
						<Form onSubmit={handleSubmit}>					
							<h2>Login</h2>
							<Form.Group controlId="formBasicEmail">
								<Form.Label>Email address</Form.Label>
								<Field name="email">
									{({field} : any)  => (
										<Form.Control type="email" placeholder="Enter email" {...field} />
									)}
								</Field>
								{touched.email && errors.email && <div>{errors.email}</div>}
							</Form.Group>
							<Form.Group controlId="formBasicPassword">
								<Form.Label>Password</Form.Label>
								<Field name="password">
									{({field} : any)  => (
										<Form.Control type="password" placeholder="Password" {...field} />
									)}
								</Field>
								{touched.password && errors.password && <div>{errors.password}</div>}
							</Form.Group>
							<Button variant="dark" type="submit">
								Login
							</Button>
						</Form>	
					)}
				</Formik>	
			</Container>
		</>
	)
}

export default Login;
