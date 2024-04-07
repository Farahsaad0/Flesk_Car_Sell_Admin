import { Col } from "reactstrap";
import "./style.css";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const SubscriptionItem = ({ subscription, refreshSubscriptions }) => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const goToEditSubscription = async (id) => {
    console.log(id);
    navigate("/editSubscription", { state: { id } });
  };

  const deleteSubscription = async (id) => {
    try {
      const response = await axiosPrivate.delete(`/subscription/${id}`);
      console.log(response);
      refreshSubscriptions();
    } catch (error) {
      console.log("error deleting subscription: ", error);
    }
  };

  return (
    <Col sm="6" md="4" lg="4" style={{ marginBlock: "1rem" }}>
      <div className="pricingTable">
        <div
          className="deleteButton bi bi-trash"
          title="Supprimer"
          onClick={() => deleteSubscription(subscription._id)}
          role="delete subscription button"
        ></div>
        <div className="pricingTable-header">
          <i className="fa fa-adjust"></i>
          <div className="price-value">
            ${subscription.price} <span className="month">par mois</span>
          </div>
        </div>
        <h3 className="heading">{subscription.type}</h3>
        <div className="pricing-content">
          <ul>
            {subscription.features.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>
        </div>
        <div className="pricingTable-signup">
          <a onClick={() => goToEditSubscription(subscription._id)}>Modifer</a>
        </div>
      </div>
    </Col>
  );
};

export default SubscriptionItem;
