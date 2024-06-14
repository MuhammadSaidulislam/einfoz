import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCertificate, faClock, faCubes, faMapMarker } from '@fortawesome/free-solid-svg-icons';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { API } from "../../config";
import { getProfile } from '../../api/profile';
import { useParams } from 'react-router-dom';
import { getService } from '../../api/service';

const ViewService = () => {
    const { id } = useParams();
    const [serviceInfo, setServiceInfo] = useState([]);
    useEffect(() => {
        getService(id).then((data) => {
            setServiceInfo(data.data);
      })
    }, []);
  return (
    <div>
    <Container>
      <Row className='d-flex justify-content-center'>
        <Col md={6}>
          <div className='viewCard'>
            <h1>{serviceInfo.name}</h1>
            <div className='cardInfo'>
              <div className="d-flex">
                <p className="card-link">
                  <FontAwesomeIcon icon={faCubes} />
                  {serviceInfo.category}
                </p>
                <p className="card-link">
                <img src={`${API}/${serviceInfo.profile_image}`} alt="service" width="20px" height="20px" style={{borderRadius: "50%", marginRight: "4px"}} />
                {serviceInfo.profile_name}
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
                <LazyLoadImage src={`${API}/${serviceInfo.image}`} width="100%" alt="" />
              </figure>
            </div>
            <div dangerouslySetInnerHTML={{ __html: `${serviceInfo.description}` }} />
          </div>
        </Col>
      </Row>
    </Container>
  </div>
  )
}

export default ViewService