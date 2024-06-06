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
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const PostItem = ({ post, onDelete }) => {
  const axiosPrivate = useAxiosPrivate();
  const {
    titre,
    description,
    prix,
    marque,
    modele,
    annee,
    photos,
    sponsorship,
    date,
  } = post;

//   const handleDelete = async (id) => {
//     try {
//         const response = await axiosPrivate.delete(`/carAds/${id}`);
//         console.log(response.data);
//         // Call onDeletePost to update the user's posts after deletion
//         // refreshPosts();
//         // Call onDeletePost to update the user's posts after deletion
//         onDeletePost();
//     } catch (error) {
//         console.error("Error deleting car ad:", error);
//     }
// };
  const imageUrl = `http://localhost:8000/images/${photos[0]}`;
  const formattedDate = new Date(date).toLocaleDateString();

  return (
    // <Col lg="4">
    // <Card sm="4" lg="3" xl="1" xxl="1" style={{ width: "fit-content" }}>
    <Card style={{ height: "100%" }}>
      {/* <CardImg top src={imageUrl} alt={photos} /> */}
      <div
        className="car__img"
        style={{
          width: "100%",
          height: 0,
          paddingBottom: "100%",
          position: "relative",
          overflow: "hidden",
          background: "#ddd",
        }}
      >
        <img
          src={imageUrl}
          alt={photos}
          className="w-100 h-100 position-absolute "
          style={{ objectFit: "contain" }}
        />
      </div>
      <CardBody
        style={{
          // position: "relative",
          // height: "fit-content",
        }}
      >
        <CardTitle className="text-center">{titre}</CardTitle>
        <CardText style={{ minHeight: "fit-content" }}>
          <div style={{ height: "3em", overflowY: "auto" }}>{description}</div>
          <h6 className="text-center mt-">Prix: {prix}</h6>
          <div
            style={{ minHeight: "3.5rem" }}
            className="d-flex align-items-center justify-content-between mt-3 mb-4"
          >
            <span className="d-flex align-items-center gap-1">
              <i className="ri-car-line"></i>mark & model: {marque} {modele}
            </span>
            <span className="d-flex align-items-center gap-1">
              <i className="ri-settings-2-line"></i>année: {annee}
            </span>
            {/* <span className="d-flex align-items-center gap-1">
            <i className="ri-timer-flash-line"></i> {sponsorship}
          </span> */}
            {/* <span className="d-flex align-items-center gap-1">
            <i className="ri-calendar-line"></i>date de publication:
            {formattedDate}
          </span> */}
          </div>
          <Link
            // to={`/cars/${post._id}`}
            style={{
              position: "relative",
              paddingTop: "auto",
            }}
          >
            <Button color="danger" className="w-100 b-0" onClick={onDelete}>
            Supprimer
            </Button>
          </Link>
        </CardText>
      </CardBody>
    </Card>
    // {/* </Col> */}
  );
};

export default PostItem;
