import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
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
  Alert,
} from "reactstrap";
import useAuth from "../../hooks/useAuth";
import { toast } from "sonner";

const ProfileEdit = () => {
  const [adminInfo, setAdminInfo] = useState({
    Nom: "",
    Prenom: "",
    Email: "",
    oldPassword: "",
    newPassword: "",
  });
  const axiosPrivate = useAxiosPrivate();

  const [alert, setAlert] = useState({ type: "", message: "", visible: false });
  const SUCCESS_MESSAGE = " Vos modifications ont été appliquées avec succès.";
  const FAIL_MESSAGE =
    " Une erreur s'est produite lors de la mise à jour. Veuillez réessayer plus tard.";

  const { auth } = useAuth();

  useEffect(() => {
    fetchAdminInfo();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchAdminInfo = async () => {
    try {
      const adminData = auth;

      // Update state with admin user info
      setAdminInfo({
        Nom: adminData.Nom,
        Prenom: adminData.Prenom,
        Email: adminData.Email,
        oldPassword: "",
        newPassword: "",
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
    try {
      // Make a PUT request to update admin user info
      const response = await axiosPrivate.put(
        `/updateUserData/${auth._id}`,
        adminInfo
      );
      console.log(response.data);
      // setAlert({ type: "success", message: SUCCESS_MESSAGE, visible: true });
      toast.success(SUCCESS_MESSAGE);
      setAdminInfo((prevState) => ({
        ...prevState,
        oldPassword: "", // Clear old password
        newPassword: "", // Clear new password
      }));
    } catch (error) {
      console.error("Error updating admin info:", error);
      // setAlert({ type: "danger", message: FAIL_MESSAGE, visible: true });
      alert.error(FAIL_MESSAGE);
    }
  };

  const handleAlertDismiss = () => {
    setAlert({ ...alert, visible: false });
  };

  return (
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Profil
          </CardTitle>
          <CardBody>
            {/* Render alert if visible */}
            {alert.visible && (
              <Alert color={alert.type} className="alert-dismissible fade show">
                <strong>
                  {alert.type === "success" ? "succès!" : "Erreur!"}
                </strong>
                {alert.message}
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleAlertDismiss}
                ></button>
              </Alert>
            )}
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
                  required
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
                  required
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
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="oldPassword">mot de passe</Label>
                <Input
                  id="oldPassword"
                  name="oldPassword"
                  placeholder="mot de passe"
                  type="password"
                  value={adminInfo.oldPassword}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="newPassword">Nouveau mot de passe</Label>
                <Input
                  id="newPassword"
                  name="newPassword"
                  placeholder="Nouveau mot de passe"
                  type="password"
                  value={adminInfo.newPassword}
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
