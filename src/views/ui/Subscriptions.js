import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Row,
} from "reactstrap";
import axios from "../../api/axios";

const Subscriptions = () => {
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const response = await axios.get("/getAllSubscriptions");
      setSubscriptions(response.data);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
    }
  };

  const goToAddSubscription = async () => {
    navigate("/addSubscription");
  };

  return (
    <>
      <Row>
        <Col>
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              <i className="bi bi-bell me-2"> </i>
              Form Example
            </CardTitle>
            <CardBody>
              <Button
                className="btn"
                onClick={() => goToAddSubscription()}
                color="primary"
              >
                +
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        {subscriptions.map((subscription, index) => (
          <Col key={index} sm="6" md="4" lg="3">
            <Card>
              <CardBody>
                <CardTitle tag="h5">{subscription.type}</CardTitle>
                <p>Price: {subscription.price}</p>
                <p>Duration: {subscription.duration} months</p>
                <p>Features:</p>
                <ul>
                  {subscription.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Subscriptions;
