import React, { useEffect, useState } from 'react'
import AdminNav from '../../../Component/AdminNav/AdminNav'
import { Col, Row, Container, Table } from 'react-bootstrap'
import { profileActive, profileList } from '../../../api/profile'
import { postActive, postList } from '../../../api/post'
import { serviceActive, serviceList } from '../../../api/service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEye, faHome, faUser, faXmark } from '@fortawesome/free-solid-svg-icons';
import { API } from "../../../config";
import "./Dashboard.css";
import { showNotifications } from '../../../Function/toaster'
import { ToastContainer } from 'react-toastify'

const Dashboard = () => {
    const [profileLists, setProfileLists] = useState([]);
    const [postLists, setPostLists] = useState([]);
    const [serviceLists, setServiceLists] = useState([]);
    const [count, setCount] = useState(0);


    useEffect(() => {
        profileList().then((data) => {
            setProfileLists(data);
        })
        postList().then((data) => {
            setPostLists(data);
        })
        serviceList().then((data) => {
            setServiceLists(data);
        })
    }, [count]);


    const profileStatus = (id, status) => {
        let profile = {
            "active": status
        }
        profileActive(id, profile).then((data) => {
            showNotifications("success", "Profile update")
            setCount(count + 1)
        })
    }

    const postStatus = (id, status) => {
        let profile = {
            "active": status
        }
        postActive(id, profile).then((data) => {
            showNotifications("success", "Post update")
            setCount(count + 1)
        })
    }

    const serviceStatus = (id, status) => {
        let profile = {
            "active": status
        }
        serviceActive(id, profile).then((data) => {
            showNotifications("success", "Service update")
            setCount(count + 1)
        })
    }

    return (
        <div>
            <AdminNav />
            <ToastContainer />
            <Container>
                <Row>
                    <Col md={4} className='tableList'>
                        <h1>Profile List</h1>
                        <Table striped="columns" responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {profileLists && profileLists.map((profile) => <tr>
                                    <td>1</td>
                                    <td><img src={`${API}/${profile.image}`} alt="profile" width="50px" height="50px" /></td>
                                    <td>{profile.name}</td>
                                    <td className='listBtn'>
                                        {profile.active ? <><button className='close' onClick={() => profileStatus(profile.id, false)}><FontAwesomeIcon icon={faXmark} /></button>&nbsp;</>
                                            : <><button className='accept' onClick={() => profileStatus(profile.id, true)}><FontAwesomeIcon icon={faCheck} /></button>&nbsp;</>}
                                        <button className='view'><FontAwesomeIcon icon={faEye} /></button>
                                    </td>
                                </tr>)}
                            </tbody>
                        </Table>

                    </Col>
                    <Col md={4} className='tableList'>
                        <h1>Post List</h1>
                        <Table striped="columns">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {postLists && postLists.map((post) => <tr>
                                    <td>1</td>
                                    <td><img src={`${API}/${post.image}`} alt="profile" width="50px" height="50px" /></td>
                                    <td>{post.name}</td>
                                    <td className='listBtn'>
                                        {post.active ? <> <button className='close' onClick={() => postStatus(post.id, false)}><FontAwesomeIcon icon={faXmark} /></button>&nbsp;</>
                                            : <><button className='accept' onClick={() => postStatus(post.id, true)}><FontAwesomeIcon icon={faCheck} /></button>&nbsp;</>
                                        }
                                        <button className='view'><FontAwesomeIcon icon={faEye} /></button>
                                    </td>
                                </tr>)}
                            </tbody>
                        </Table>

                    </Col>
                    <Col md={4} className='tableList'>
                        <h1>Service List</h1>
                        <Table striped="columns">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {serviceLists && serviceLists.map((service) => <tr>
                                    <td>1</td>
                                    <td><img src={`${API}/${service.image}`} alt="profile" width="50px" height="50px" /></td>
                                    <td>{service.name}</td>
                                    <td className='listBtn'>
                                        {service.active ? <><button className='close' onClick={() => serviceStatus(service.id, false)}><FontAwesomeIcon icon={faXmark} /></button>&nbsp;</>
                                            : <> <button className='accept' onClick={() => serviceStatus(service.id, true)}><FontAwesomeIcon icon={faCheck} /></button>&nbsp;</>}


                                        <button className='view'><FontAwesomeIcon icon={faEye} /></button>
                                    </td>
                                </tr>)}
                            </tbody>
                        </Table>

                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Dashboard