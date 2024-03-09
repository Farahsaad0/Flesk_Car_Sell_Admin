import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  Row,
  Col,
  CardTitle,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

const ProfileEdit = () => {
  const [adminInfo, setAdminInfo] = useState({
    Nom: "",
    Prenom: "",
    Email: "",
    Password: "",
  });

  useEffect(() => {
    // Fetch admin user info when the component mounts
    fetchAdminInfo();
  }, []);

  const fetchAdminInfo = async () => {
    try {
      // Fetch admin user info from the backend API
      const response = await axios.get(
        "http://localhost:8000/getAdminUser/65ec53a26c449ebae3adbe71"
      );
      const adminData = response.data;

      // Update state with admin user info
      setAdminInfo({
        Nom: adminData.Nom,
        Prenom: adminData.Prenom,
        Email: adminData.Email,
        Password: "", // Exclude password for security reasons
      });
    } catch (error) {
      console.error("Error fetching admin user info:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminInfo({ ...adminInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission, e.g., update admin user info in the backend
    // You can use axios or any other library to make a PUT request to update the admin user info
  };

  return (
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Form Example
          </CardTitle>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="Nom">Nom</Label>
                <Input
                  id="Nom"
                  name="Nom"
                  placeholder="Nom"
                  type="text"
                  value={adminInfo.Nom}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="Prenom">Prenom</Label>
                <Input
                  id="Prenom"
                  name="Prenom"
                  placeholder="Prenom"
                  type="text"
                  value={adminInfo.Prenom}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="Email">Email</Label>
                <Input
                  id="Email"
                  name="Email"
                  placeholder="email@example.com"
                  type="email"
                  value={adminInfo.Email}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="Password">mote de passe</Label>
                <Input
                  id="Password"
                  name="Password"
                  placeholder="mote de passe"
                  type="password"
                  value={adminInfo.Password}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <Button className="mt-2 " color="success" type="submit">
                Modifier
              </Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default ProfileEdit;
