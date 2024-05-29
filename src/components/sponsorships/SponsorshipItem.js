import { Col } from "reactstrap";
import "./style.css";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const SponsorshipItem = ({ sponsorship, refreshSponsorships }) => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const goToEditSponsorship = async (id) => {
    navigate("/editSponsorship", { state: { id } });
  };

  const deleteSponsorship = async (id) => {
    try {
      await axiosPrivate.delete(`/sponsorship/${id}`);
      refreshSponsorships();
    } catch (error) {
      console.log("error deleting sponsorship: ", error);
    }
  };

  const getPricePerDay = () => {
    return (sponsorship.price / sponsorship.duration).toFixed(2);
  };

  return (
    <Col sm="6" md="4" lg="4" style={{ marginBlock: "1rem" }}>
      <div className="pricingTable">
        <div
          className="deleteButton bi bi-trash"
          title="Supprimer"
          onClick={() => deleteSponsorship(sponsorship._id)}
          role="delete sponsorship button"
        ></div>
        <div className="pricingTable-header">
          <i className="fa fa-adjust"></i>
          <div className="price-value">
            {new Intl.NumberFormat("en-TN", {
              style: "currency",
              currency: "TND",
            }).format(sponsorship.price)}
            <span className="month">
              {new Intl.NumberFormat("en-TN", {
                style: "currency",
                currency: "TND",
              }).format(getPricePerDay())}
              par jour
            </span>
          </div>
        </div>
        <h3 className="heading">{sponsorship.type}</h3>
        <div className="pricing-content">
          <ul>
            {sponsorship.features.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>
        </div>
        <div className="pricingTable-signup">
          <a onClick={() => goToEditSponsorship(sponsorship._id)}>Modifier</a>
        </div>
      </div>
    </Col>
  );
};

export default SponsorshipItem;
