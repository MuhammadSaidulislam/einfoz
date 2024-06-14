import React from 'react';
import { Link } from "react-router-dom";
import { API } from "../../config";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCertificate, faClock, faCubes, faMapMarker, faPhone } from '@fortawesome/free-solid-svg-icons';

const ProfileCard = ({ props }) => {
  return (
    <div>
      <div className="myCard">
        <div className="row">
          <div className="col-auto cardImage">
            <figure>
              <LazyLoadImage src={`${API}/${props.image}`} alt="" className="img-fluid cardImg" />
            </figure>
          </div>
          <div className="col cardHeading">
            <h3>
              <a href={`${props.type}/${props.id}`}>{props.name}</a>
            </h3>
            <div className="d-flex">
              <p className="card-link">
                <FontAwesomeIcon icon={faCubes} />
                {props.category}
              </p>
              <p className="card-link">
              <FontAwesomeIcon icon={faMapMarker} />
                {props.profile_name} {props.building_no} {props.road_name}
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
          <div className="col-auto">
            <div className="vertical-center">
              <a href={`tel:+88${props.mobile}`}>
                <FontAwesomeIcon icon={faPhone} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileCard