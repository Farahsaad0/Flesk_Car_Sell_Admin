import React, { useState } from "react";
import {
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

const SponsorshipForm = () => {
  const [sponsorshipData, setSponsorshipData] = useState({
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSponsorshipData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFeatureChange = (feature) => {
    const updatedFeatures = sponsorshipData.features.includes(feature)
      ? sponsorshipData.features.filter((f) => f !== feature)
      : [...sponsorshipData.features, feature];

    setSponsorshipData((prevData) => ({
      ...prevData,
      features: updatedFeatures,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await axiosPrivate.post("/sponsorship", sponsorshipData);
      setSuccess(true);
      setSponsorshipData({
        type: "",
        price: "",
        duration: "",
        features: [],
        isActive: true,
      });
    } catch (error) {
      setError("Failed to create sponsorship. Please try again.");
    }
    setLoading(false);
  };

  return (
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Ajouter un nouveaux Sponsorship
          </CardTitle>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="type">Titre:</Label>
                <Input
                  id="type"
                  name="type"
                  value={sponsorshipData.type}
                  onChange={handleChange}
                  placeholder="titre de sponsorship (exp: Gold, Silver, ...)"
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <Label for="price">Price:</Label>
                <Input
                  id="price"
                  name="price"
                  value={sponsorshipData.price}
                  onChange={handleChange}
                  placeholder="Price"
                  type="number"
                />
              </FormGroup>
              <FormGroup>
                <Label for="duration">Duration:</Label>
                <Input
                  id="duration"
                  name="duration"
                  value={sponsorshipData.duration}
                  onChange={handleChange}
                  placeholder="Duration"
                  type="number"
                />
              </FormGroup>
              <FormGroup>
                <Label for="features">Features:</Label>
                <div>
                  <FormGroup check >
                    <Label check>
                      <Input
                        type="checkbox"
                        checked={sponsorshipData.features.includes("Highlighted Listing")}
                        onChange={() => handleFeatureChange("Highlighted Listing")}
                      />{" "}
                      Highlighted Listing
                    </Label>
                  </FormGroup>
                  <FormGroup check >
                    <Label check>
                      <Input
                        type="checkbox"
                        checked={sponsorshipData.features.includes("Featured in Search Results")}
                        onChange={() => handleFeatureChange("Featured in Search Results")}
                      />{" "}
                      Featured in Search Results
                    </Label>
                  </FormGroup>
                  <FormGroup check >
                    <Label check>
                      <Input
                        type="checkbox"
                        checked={sponsorshipData.features.includes("Featured on Homepage")}
                        onChange={() => handleFeatureChange("Featured on Homepage")}
                      />{" "}
                      Featured on Homepage
                    </Label>
                  </FormGroup>
                  <FormGroup check >
                    <Label check>
                      <Input
                        type="checkbox"
                        checked={sponsorshipData.features.includes("Priority Support")}
                        onChange={() => handleFeatureChange("Priority Support")}
                      />{" "}
                      Priority Support
                    </Label>
                  </FormGroup>
                  <FormGroup check >
                    <Label check>
                      <Input
                        type="checkbox"
                        checked={sponsorshipData.features.includes("Extended Listing Duration")}
                        onChange={() => handleFeatureChange("Extended Listing Duration")}
                      />{" "}
                      Extended Listing Duration
                    </Label>
                  </FormGroup>
                  {/* Repeat similar FormGroup check inline for each feature */}
                </div>
              </FormGroup>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Loading..." : "Submit"}
              </button>
              {error && <p className="text-danger">{error}</p>}
              {success && (
                <p className="text-success">
                  Sponsorship created successfully!
                </p>
              )}
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default SponsorshipForm;
