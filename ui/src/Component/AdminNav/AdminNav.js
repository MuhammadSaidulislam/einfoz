import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser } from '@fortawesome/free-solid-svg-icons';
import { NavDropdown } from 'react-bootstrap';
import { logout } from '../../api/admin';

const AdminNav = () => {
    const navigate = useNavigate();
    const logoutBtn = () => {
        logout();
        return navigate(`/`);
    };
    return (
        <div>
            <div className='navbar'>
                <Container>
                    <Nav className="d-flex justify-content-between w-100 align-items-center flex-row">
                        <Nav.Link className='homeIcon' href="/"><FontAwesomeIcon icon={faHome} /></Nav.Link>
                        <Nav.Link href="/" className='logo'><img src="https://niomit.einfo.website/asset/img/logo/logo.png" alt="logo" width="120px" /></Nav.Link>
                        <NavDropdown className='userIcon' id="nav-dropdown" title={<FontAwesomeIcon icon={faUser} />}>
                            <NavDropdown.Item href="/my-dashboard">Dashboard</NavDropdown.Item>
                            <NavDropdown.Item href="/my-course">My Course</NavDropdown.Item>
                            <NavDropdown.Item onClick={logoutBtn} className='logout'>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Container>
            </div>
        </div>
    )
}

export default AdminNav