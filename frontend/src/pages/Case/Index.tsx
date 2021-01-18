import React, { useCallback, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import Header from '../../Components/Header/Header';
import ModalWrapper from '../../Components/ModalWrapper/ModalWrapper';
import SpinnerWrapper from '../../Components/SpinnerWrapper/SpinnerWrapper';
import { getCase, getConditions, updateCase } from '../../request/request';
import { User } from '../Login/type';

import './styles.scss';
import { ConditionType, CaseType } from './type';


const Case: React.FC = () => {
	const [user, setUser] = useState<User>();
	const [isLoading, setIsLoading] = useState(false);

	const [error, setError] = useState<any>({});
	const [caseCondition, setCaseCondition] = useState<CaseType>();
	const [conditions, setConditions] = useState<ConditionType[]>([]);

	const [value, setValue] = useState<any>();

	const fetchData = useCallback( async() => {
		setUser(JSON.parse(localStorage.getItem('user')!))
		setIsLoading(true);
		try {
			const resCase = await getCase();
			setCaseCondition(resCase.data[0]);
			const resConditions = await getConditions();
			setConditions(resConditions.data);
			setValue(resConditions.data[0]._id);
		} catch (err) {
			setError(err);
		} finally {
			setIsLoading(false);
		}
  }, [setCaseCondition, setConditions, setValue, setError, setIsLoading]);

	useEffect(() => {
		fetchData();		
	}, [fetchData]);

	const nextCase = async () => {
		setIsLoading(true);
		try {
			await updateCase(caseCondition!._id!, value, user!._id!);
			setIsLoading(false);
			fetchData();
		} catch (err) {
			setIsLoading(false);
			setError(err);
		}
	}

	const handleClose = () => setError(false);

	return (
		<>
			{isLoading && (<SpinnerWrapper />)}
			<Header userName={user?.name} />
			<ModalWrapper show={!!error.status} handleClose={handleClose} error={error.message}/>
			<Container className="case">
				{caseCondition && !!conditions.length && (
					<Row>
						<Col>
							<Card>
								<Card.Body>
									<Card.Title>Please Review This Case: </Card.Title>
									<Card.Text className="case-description">
										{caseCondition.description}
									</Card.Text>
								</Card.Body>
							</Card>
						</Col>
						<Col>
							<Card>
								<Card.Body>
									<Card.Title>Select Condition: </Card.Title>
									<Form onSubmit={(evt) => {
										evt.preventDefault();
										nextCase();
									}}>
										<Form.Group controlId="exampleForm.ControlSelect1">
											<Form.Control as="select" name="condition" onChange={(evt) => setValue(evt.target.value)}>
												{conditions.map(
													condition => 
													<option key={condition._id} value={condition._id}>
														({condition.code}) {condition.description}
													</option>)}
											</Form.Control>
										</Form.Group>	
										<Button type="submit" variant="success">Next Case</Button>						
									</Form>	
								</Card.Body>
							</Card>										
						</Col>
					</Row>
				)}
				{!isLoading && !caseCondition && (<div>You are Done!</div>)}
				{!isLoading && caseCondition && !conditions.length && (<div>No conditions avaiable, please register some condition in the system!</div>)}
			</Container>		
		</>
	)
}

export default Case;
