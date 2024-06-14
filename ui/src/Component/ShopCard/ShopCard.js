import React from 'react';
import { Link } from "react-router-dom";
import { API } from "../../config";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCertificate, faClock, faCubes, faMapMarker, faPhone, faXmark } from '@fortawesome/free-solid-svg-icons';
import "./ShopCard.css"

const ShopCard = ({ props }) => {
  return (
    <>
      {/*
        <article>
                <div className="article-wrapper">
                    <figure>
                         <LazyLoadImage src={`${API}/${props.image}`} alt="" width="150px" /> 
                    </figure>
                    <div className="article-body">
                        <Link to={`${props.id}`}>Name: {props.name}</Link>
                        <div className="d-flex justify-content-between">
                            <p>
                                <b>Mobile</b>: {props.mobile}
                            </p>
                        </div>
                    </div>
                </div>
            </article>
        */}
      <div className="myCard">

        <div className="row">
          <div className="col-auto">
            <figure>
              <LazyLoadImage src={`${API}/${props.image}`} alt="" className="img-fluid cardImg" />
            </figure>

          </div>
          <div className="col">
            <h3>
              <a href={`${props.type}/${props.id}`}>{props.name}</a>
            </h3>
            <div className="">
              <p className="card-link">
                <FontAwesomeIcon icon={faCubes} />
                {props.category}
              </p>
              <p className="card-link">
                <FontAwesomeIcon icon={faMapMarker} />
                {props.profile_name}
              </p>
            </div>
            <div className="">
              <p className="card-link opennow">
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
              <FontAwesomeIcon icon={faPhone} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ShopCard