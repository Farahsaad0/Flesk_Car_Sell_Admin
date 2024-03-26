import React from "react";
import "./styles.css";
import _404_robot from "../../assets/images/bg/404.png";
import { useNavigate } from "react-router-dom";

const Missing = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <div className="_404_container">
      <section className="_404_section">
        <div className="illustration">
          <img src={_404_robot} alt="logo" className="_404_robot_img" />
        </div>
        <div className="text_content">
          <h1 className="text404">404!</h1>
          <h1>
            Désolé mais la page que vous recherchez n'existe pas, ont été
            supprimé, le nom a été changé ou est temporairement indisponible
          </h1>
          <p>Veuillez revenir à la page précédente. </p>
          <button className="back_btn" onClick={goBack}>
            Retourner
          </button>
        </div>
      </section>
    </div>
  );
};

export default Missing;
