import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row,
} from "reactstrap";
import axios from "../../api/axios";
import SubscriptionItem from "../../components/subscription/SubscriptionItem";

const Subscriptions = () => {
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const response = await axios.get("/subscriptions");
      setSubscriptions(response.data);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
    }
  };

  const goToAddSubscription = async () => {
    navigate("/addSubscription");
  };

  return (
    <section>
      <Container>
        <Row>
          <Col>
            <Card>
              <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                <i className="bi bi-bell me-2"></i>
                Form Example
              </CardTitle>
              <CardBody>
                <Button
                  className="btn"
                  onClick={() => goToAddSubscription()}
                  color="primary"
                >
                  Ajouter un abonnement
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          {subscriptions.map((subscription) => (
            <SubscriptionItem
              key={subscription._id}
              subscription={subscription}
              refreshSubscriptions={fetchSubscriptions}
            />
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Subscriptions;
