import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Header.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, NavDropdown } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import Registration from './../../Pages/User/Registration/Registration';
import { logout } from '../../api/admin';

const Header = () => {
    const navigate = useNavigate();
    const [loginShow, setLoginShow] = useState(false);
    const savedUserProfile = localStorage.getItem("niomit");
    const userProfile = JSON.parse(savedUserProfile);
    const loginOption = () => {
        setLoginShow(!loginShow)
    };
    const logoutBtn = () => {
         logout();
        return navigate(`/`);
    };
    return (
        <>
            <div className='navbar'>
                <Container>
                    <Nav className="d-flex justify-content-between w-100 align-items-center flex-row">
                        <Nav.Link className='homeIcon' href="/"><FontAwesomeIcon icon={faHome} /></Nav.Link>
                        <Nav.Link href="/" className='logo'><img src="https://niomit.einfo.website/asset/img/logo/logo.png" alt="logo" width="120px" /></Nav.Link>


                        {userProfile && userProfile ?
                            <>
                                <NavDropdown className='userIcon' id="nav-dropdown" title={<FontAwesomeIcon icon={faUser} />}>
                                    <NavDropdown.Item href="/dashboard">Profile</NavDropdown.Item>
                                    <NavDropdown.Item onClick={logoutBtn} className='logout'>Logout</NavDropdown.Item>
                                </NavDropdown>
                            </>
                            :
                            <button className='userIcon' onClick={loginOption}><FontAwesomeIcon icon={faUser} /></button>
                        }


                    </Nav>
                </Container>
            </div>
            <Registration loginShow={loginShow} setLoginShow={setLoginShow} />
        </>
    )
}

export default Header