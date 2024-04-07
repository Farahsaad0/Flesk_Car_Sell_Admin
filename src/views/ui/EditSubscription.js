import React, { useState, useEffect } from "react";
import {
  Alert,
  Card,
  CardBody,
  CardTitle,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useLocation } from "react-router-dom";

const EditSubscription = () => {
  const location = useLocation();
  const { id } = location.state || {};

  const [subscriptionData, setSubscriptionData] = useState({
    type: "",
    price: "",
    duration: "",
    features: [],
    isActive: true,
  });
  const axiosPrivate = useAxiosPrivate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const response = await axiosPrivate.get(`/subscription/${id}`);
        setSubscriptionData(response.data);
      } catch (error) {
        setError("Failed to fetch subscription data.");
      }
    };
    fetchSubscription();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubscriptionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const featuresArray = subscriptionData.features.split(',').map(feature => feature.trim());
      
      const updatedSubscriptionData = {
        ...subscriptionData,
        features: featuresArray
      };
      await axiosPrivate.put(`/subscription/${id}`, updatedSubscriptionData);
      setSuccess(true);
    } catch (error) {
      setError("Failed to update subscription. Please try again.");
    }
    setLoading(false);
  };

  return (
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Edit Subscription
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
                  placeholder="Type of subscription (e.g., Gold, Silver, ...)"
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
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Loading..." : "Submit"}
              </button>
              {error && (
                <Alert color="danger" className="mt-3">
                  {error}
                </Alert>
              )}
              {success && (
                <Alert color="success" className="mt-3">
                  Subscription updated successfully!
                </Alert>
              )}
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default EditSubscription;
