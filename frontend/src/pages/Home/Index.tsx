import React from 'react';
import { Button, Card, Col, Container, Form, Nav, Navbar, Row } from 'react-bootstrap';

import './styles.scss';


const Home: React.FC = () => {
	const name = "Dr. teste";

	return (
		<>
			<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="mr-auto">						
					</Nav>
					<Nav>
						<Nav.Link>
							Logged in os: {name}
						</Nav.Link>
						<Nav.Link href="/login">Log Out</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
			<Container className="case">
				<Row>
					<Col>
						<Card>
							<Card.Body>
								<Card.Title>Please Review This Case: </Card.Title>
								<Card.Text>
									Some quick example text to build on the card title and make up the bulk of
									the card's content.
								</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col>
						<Card>
							<Card.Body>
								<Card.Title>Select Condition: </Card.Title>
								<Card.Text>
									<Form>
										<Form.Group controlId="exampleForm.ControlSelect1">
											<Form.Control as="select">
											<option>1</option>
											<option>2</option>
											<option>3</option>
											<option>4</option>
											<option>5</option>
											</Form.Control>
										</Form.Group>	
										<Button variant="success">Next Case</Button>						
									</Form>	
								</Card.Text>
							</Card.Body>
						</Card>										
					</Col>
				</Row>
			</Container>		
		</>
	)
}

export default Home;
