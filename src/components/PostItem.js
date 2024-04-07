import React from "react";
import {
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Row,
} from "reactstrap";
import { Link } from "react-router-dom";

const PostItem = ({ post }) => {
  const {
    titre,
    description,
    prix,
    marque,
    modele,
    annee,
    photo,
    sponsorship,
    date,
  } = post;

  const imageUrl = `http://localhost:8000/images/${photo}`;
  const formattedDate = new Date(date).toLocaleDateString();

  return (
    // <Row>
    <Card sm="4" lg="4" xl="1" xxl="1">
      <CardImg top width="100%" src={imageUrl} alt={photo} />
      <CardBody>
        <CardTitle className="text-center">{titre}</CardTitle>
        <CardText>{description}</CardText>
        <h6 className="text-center mt-">Prix: {prix}</h6>
        <div className="d-flex align-items-center justify-content-between mt-3 mb-4">
          <span className="d-flex align-items-center gap-1">
            <i className="ri-car-line"></i>mark & model: {marque} {modele}
          </span>
          <span className="d-flex align-items-center gap-1">
            <i className="ri-settings-2-line"></i>anner: {annee}
          </span>
          {/* <span className="d-flex align-items-center gap-1">
            <i className="ri-timer-flash-line"></i> {sponsorship}
          </span> */}
          <span className="d-flex align-items-center gap-1">
            <i className="ri-calendar-line"></i>date de publication:
            {formattedDate}
          </span>
        </div>
        <Button className="w-50 car__item-btn car__btn-details">
          <Link to={`/cars/${post._id}`}>Details </Link>
        </Button>
      </CardBody>
    </Card>
    // {/* </Row> */}
  );
};

export default PostItem;
