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

const EditSponsorship = () => {
  const location = useLocation();
  const { id } = location.state || {};

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

  useEffect(() => {
    const fetchSponsorship = async () => {
      try {
        const response = await axiosPrivate.get(`/sponsorship/${id}`);
        setSponsorshipData(response.data);
      } catch (error) {
        setError("Failed to fetch sponsorship data.");
      }
    };
    fetchSponsorship();
  }, [id]);

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
      await axiosPrivate.put(`/sponsorship/${id}`, sponsorshipData);
      setSuccess(true);
    } catch (error) {
      setError("Failed to update sponsorship. Please try again.");
    }
    setLoading(false);
  };

  return (
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Edit Sponsorship
          </CardTitle>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="type">Type</Label>
                <Input
                  id="type"
                  name="type"
                  value={sponsorshipData.type}
                  onChange={handleChange}
                  placeholder="Type of sponsorship (e.g., Gold, Silver, ...)"
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <Label for="price">Prix</Label>
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
                <Label for="duration">Durée</Label>
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
                <Label for="features">Caractéristiques</Label>
                <div>
                  {[
                    "Annonce mise en avant",
                    "Mis en avant dans les résultats de recherche",
                    "Mis en avant sur la page d'accueil",
                    "Durée de publication prolongée",
                  ].map((feature, index) => (
                    <FormGroup check key={index}>
                      <Label check>
                        <Input
                          type="checkbox"
                          checked={sponsorshipData.features.includes(feature)}
                          onChange={() => handleFeatureChange(feature)}
                        />{" "}
                        {feature}
                      </Label>
                    </FormGroup>
                  ))}
                </div>
              </FormGroup>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "En cours..." : "Enregistrer"}
              </button>
              {error && (
                <Alert color="danger" className="mt-3">
                  {error}
                </Alert>
              )}
              {success && (
                <Alert color="success" className="mt-3">
                  Sponsorship modifiée avec succés!
                </Alert>
              )}
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default EditSponsorship;
