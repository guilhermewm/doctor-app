import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import './styles.scss';

type HeaderProps = {
    userName?: string
}

const Header: React.FC<HeaderProps> = ({userName}) => {
    const history = useHistory();

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
		history.push("/login");
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">						
                </Nav>
                <Nav>
                    <Nav.Link>
                        Logged in os: {userName}
                    </Nav.Link>
                    <Nav.Link onClick={() => {logout()}}>Log Out</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header;
