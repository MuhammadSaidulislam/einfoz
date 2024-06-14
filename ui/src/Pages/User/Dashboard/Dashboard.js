import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Dropdown } from 'react-bootstrap'
import AddService from '../../../Component/AddService/AddService'
import AddPost from '../../../Component/AddPost/AddPost';
import AddProfile from '../../../Component/AddProfile/AddProfile';
import { userProfileList } from '../../../api/profile';
import { userPostList } from '../../../api/post';
import { userServiceList } from '../../../api/service';
import ShopCard from '../../../Component/ShopCard/ShopCard';
import ProfileCard from '../../../Component/ProfileCard/ProfileCard';
import PostCard from '../../../Component/PostCard/PostCard';
import ServiceCard from '../../../Component/ServiceCard/ServiceCard';

const Dashboard = () => {

    const [mergedData, setMergedData] = useState([]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [postShow, setPostShow] = useState(false);
    const handlePostClose = () => setPostShow(false);
    const handlePostShow = () => setPostShow(true);

    const [profileShow, setProfileShow] = useState(false);
    const handleProfileClose = () => setProfileShow(false);
    const handleProfileShow = () => setProfileShow(true);

    const savedUserProfile = localStorage.getItem("niomit");
    const userProfile = JSON.parse(savedUserProfile);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const [profileData, postData, serviceData] = await Promise.all([
              userProfileList(userProfile.mobile),
              userPostList(userProfile.mobile),
              userServiceList(userProfile.mobile),
            ]);
    
            const profilesWithType = profileData.profiles.map(profile => ({
              ...profile,
              type: 'profile',
            }));
    
            const postsWithType = postData.posts.map(post => ({
              ...post,
              type: 'post',
            }));
    
            const servicesWithType = serviceData.services.map(service => ({
              ...service,
              type: 'service',
            }));
    
            const combinedData = [
              ...profilesWithType,
              ...postsWithType,
              ...servicesWithType,
            ];
    
            setMergedData(combinedData);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, [userProfile.mobile]);

    return (
        <>
            <Container>
                <Row>
                    <Col md={4}>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Dropdown Button
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={handleProfileShow}>Add Profile</Dropdown.Item>
                                <Dropdown.Item onClick={handlePostShow}>Add post</Dropdown.Item>
                                <Dropdown.Item onClick={handleShow}>Add Service</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>
                <Row>
                {mergedData && mergedData.map((profile) =>
                    <Col md={6}>
                    {profile.type === "service" ? <ServiceCard props={profile} /> : "" }
                    {profile.type === "post" ? <PostCard props={profile} /> : "" }
                    {profile.type === "profile" ? <ProfileCard props={profile} /> : "" }
                    </Col>
                )}
                </Row>
            </Container>

            <AddService show={show} setShow={setShow} handleClose={handleClose} />
            <AddPost postShow={postShow} setPostShow={setPostShow} handlePostClose={handlePostClose} />
            <AddProfile profileShow={profileShow} setProfileShow={setProfileShow} handleProfileClose={handleProfileClose} />

        </>
    )
}

export default Dashboard