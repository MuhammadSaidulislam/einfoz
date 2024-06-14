import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCertificate, faClock, faCubes, faMapMarker } from '@fortawesome/free-solid-svg-icons';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { API } from "../../config";
import { getProfile } from '../../api/profile';
import { useParams } from 'react-router-dom';
import "./ViewProfile.css"

const ViewProfile = () => {
  const { id } = useParams();
  const [profileInfo, setProfileInfo] = useState([]);
  useEffect(() => {
    getProfile(id).then((data) => {
      setProfileInfo(data.data);
    })
  }, []);

  return (
    <div>
      <Container>
        <Row className='d-flex justify-content-center'>
          <Col md={6}>
            <div className='viewCard'>
              <h1>{profileInfo.name}</h1>
              <div className='cardInfo'>
                <div className="d-flex">
                  <p className="card-link">
                    <FontAwesomeIcon icon={faCubes} />
                    {profileInfo.category}
                  </p>
                  <p className="card-link">
                    <FontAwesomeIcon icon={faMapMarker} />
                    {profileInfo.building_no} {profileInfo.road_name}
                  </p>
                </div>
                <div className="d-flex">
                  <p className="card-link openNow">
                    <FontAwesomeIcon icon={faClock} />
                    Open now
                  </p>
                  <p className="card-link">
                    <FontAwesomeIcon icon={faCertificate} />
                    95% (30102)
                  </p>
                </div>
              </div>
              <div className='cardViewImage'>
                <figure>
                  <LazyLoadImage src={`${API}/${profileInfo.image}`} width="100%" alt="" />
                </figure>
              </div>
              <div dangerouslySetInnerHTML={{ __html: `${profileInfo.description}` }} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ViewProfile