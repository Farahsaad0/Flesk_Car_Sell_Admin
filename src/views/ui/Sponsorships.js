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
import SponsorshipItem from "../../components/sponsorships/SponsorshipItem";

const Sponsorships = () => {
  const navigate = useNavigate();
  const [sponsorships, setSponsorships] = useState([]);

  useEffect(() => {
    fetchSponsorships();
  }, []);

  const fetchSponsorships = async () => {
    try {
      const response = await axios.get("/sponsorships");
      setSponsorships(response.data);
    } catch (error) {
      console.error("Error fetching sponsorships:", error);
    }
  };

  const goToAddSponsorship = async () => {
    navigate("/addSponsorship");
  };

  return (
    <section>
      <Container>
        <Row>
          <Col>
            <Card>
              <CardTitle
                tag="h6"
                className="border-bottom d-flex justify-content-between p-3 mb-0"
              >
                <div>
                  <i className="bi bi-bell me-2"></i>
                  Parameter de Sponsorships
                </div>
                {/* <div
                  className="btn btn-sm mb-0 p-0"
                  onClick={() => goToAddSponsorship()}
                  color="primary"
                >
                  <i className="bi bi-gear me-2"></i>
                </div> */}
              </CardTitle>
              <CardBody>
                <Button
                  className="btn"
                  onClick={() => goToAddSponsorship()}
                  color="primary"
                >
                  Ajouter un plan de sponsorship
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          {sponsorships.map((sponsorship) => (
            <SponsorshipItem
              key={sponsorship._id}
              sponsorship={sponsorship}
              refreshSponsorships={fetchSponsorships}
            />
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Sponsorships;
