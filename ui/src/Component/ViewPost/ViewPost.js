import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCertificate, faClock, faCubes, faMapMarker } from '@fortawesome/free-solid-svg-icons';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { API } from "../../config";
import { getProfile } from '../../api/profile';
import { useParams } from 'react-router-dom';
import { getPost } from '../../api/post';

const ViewPost = () => {
    const { id } = useParams();
  const [postInfo, setPostInfo] = useState([]);
  useEffect(() => {
    getPost(id).then((data) => {
      setPostInfo(data.data);
    })
  }, []);
  return (
    <div>
    <Container>
      <Row className='d-flex justify-content-center'>
        <Col md={6}>
          <div className='viewCard'>
            <h1>{postInfo.name}</h1>
            <div className='cardInfo'>
              <div className="d-flex">
                <p className="card-link">
                  <FontAwesomeIcon icon={faCubes} />
                  {postInfo.category}
                </p>
                <p className="card-link">
                <img src={`${API}/${postInfo.profile_image}`} alt="service" width="20px" height="20px" style={{borderRadius: "50%", marginRight: "4px"}} />
                {postInfo.profile_name}
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
                <LazyLoadImage src={`${API}/${postInfo.image}`} width="100%" alt="" />
              </figure>
            </div>
            <div dangerouslySetInnerHTML={{ __html: `${postInfo.description}` }} />
          </div>
        </Col>
      </Row>
    </Container>
  </div>
  )
}

export default ViewPost