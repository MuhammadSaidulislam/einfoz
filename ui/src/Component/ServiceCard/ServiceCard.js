import React from 'react';
import { Link } from "react-router-dom";
import { API } from "../../config";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCubes, faMapMarker, faMoneyBill, faShoppingBag, faStar } from '@fortawesome/free-solid-svg-icons';

const ServiceCard = ({ props }) => {
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
                <img src={`${API}/${props.profile_image}`} alt="service" width="20px" height="20px" style={{borderRadius: "50%", marginRight: "4px"}} />
                {props.profile_name}
              </p>
            </div>
            <div className="d-flex">
              <p className="card-link openNow">
                <FontAwesomeIcon icon={faMoneyBill} />
                {props.price}
              </p>
              <p className="card-link">
                <FontAwesomeIcon icon={faStar} />
                4.8 (30102)
              </p>
            </div>
          </div>
          <div className="col-auto">
            <div className="vertical-center">
              <a href={`tel:+88${props.mobile}`}>
                <FontAwesomeIcon icon={faShoppingBag} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceCard