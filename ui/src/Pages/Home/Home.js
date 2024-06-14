import React, { useEffect, useState } from 'react'
import ShopCard from '../../Component/ShopCard/ShopCard'
import { Row, Col, Container } from 'react-bootstrap';
import Layout from '../../Component/Layout/Layout';
import { allHomeData } from '../../api/home';
import ServiceCard from '../../Component/ServiceCard/ServiceCard';
import PostCard from '../../Component/PostCard/PostCard';
import ProfileCard from '../../Component/ProfileCard/ProfileCard';


const Home = () => {
    const [dataLists, setDataLists] = useState([]);

    useEffect(() => {
        allHomeData().then((data) => {
            setDataLists(data.data);
        })
    }, []);
    return (
        <Layout>
            <Container>
                <Row>

                    {dataLists && dataLists.map((profile) =>
                        <Col md={6}>
                        {profile.type === "service" ? <ServiceCard props={profile} /> : "" }
                        {profile.type === "post" ? <PostCard props={profile} /> : "" }
                        {profile.type === "profile" ? <ProfileCard props={profile} /> : "" }
                        </Col>
                    )}

                </Row>
            </Container>
        </Layout>
    )
}

export default Home