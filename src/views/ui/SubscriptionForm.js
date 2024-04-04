import React, { useState } from "react";
import { Card, CardBody, CardTitle, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const SubscriptionForm = () => {
  const [subscriptionData, setSubscriptionData] = useState({
    type: "",
    price: "",
    duration: "",
    features: [],
    isActive: true
  });
  const axiosPrivate = useAxiosPrivate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubscriptionData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await axiosPrivate.post("/createSubscription", subscriptionData);
      console.log("Subscription data:", subscriptionData);
      setSuccess(true);
      setSubscriptionData({
        type: "",
        price: "",
        duration: "",
        features: [],
        isActive: true
      });
    } catch (error) {
      setError("Failed to create subscription. Please try again.");
    }
    setLoading(false);
  };

  return (
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Ajouter un nouveau abonnement
          </CardTitle>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="type">Type</Label>
                <Input
                  id="type"
                  name="type"
                  value={subscriptionData.type}
                  onChange={handleChange}
                  placeholder="Type d'abonnement (exp: Gold, Silver, ...)"
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <Label for="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                  value={subscriptionData.price}
                  onChange={handleChange}
                  placeholder="Price"
                  type="number"
                />
              </FormGroup>
              <FormGroup>
                <Label for="duration">Duration</Label>
                <Input
                  id="duration"
                  name="duration"
                  value={subscriptionData.duration}
                  onChange={handleChange}
                  placeholder="Duration"
                  type="number"
                />
              </FormGroup>
              <FormGroup>
                <Label for="features">Features</Label>
                <Input
                  id="features"
                  name="features"
                  value={subscriptionData.features}
                  onChange={handleChange}
                  placeholder="Features"
                  type="text"
                />
              </FormGroup>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Loading..." : "Submit"}
              </button>
              {error && <p className="text-danger">{error}</p>}
              {success && <p className="text-success">Subscription created successfully!</p>}
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default SubscriptionForm;
