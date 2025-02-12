import { useRef, useState, useEffect } from "react";
import {
  Form,
  Button,
  Card,
  Container,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

const LOGIN_URL = "/adminLogin";

const Login = () => {
  const { setAuth, persist, setPersist } = useAuth();


  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || { pathname: "/" };

  const emailRef = useRef();
  const pwdRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/login",
        { email, password },
        { withCredentials: true }
      );
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.token;
      // const Role = response?.data?.adminUser.Role;
      const Nom = response?.data?.User.Nom;
      const Prenom = response?.data?.User.Prenom;
      const _id = response?.data?.User._id;
      // setAuth({ _id, Nom, Prenom, Email : email, password, Role, accessToken });
      setAuth({ _id, Nom, Prenom, Email: email, accessToken });
      // console.log(Role + "<<<< Role"); // ! ___for_debugging_only_REMEMBER_TO_DELETE_LATER___
      setEmail("");
      setPassword("");
      navigate(from, { replace: true });
    } catch (err) {
      // setPassword("");
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Email or Password");
      } else {
        setErrMsg(err.response.data.message);
      }
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);


  return (
    <Container>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} xs={12}>
          <div className="border border-3 border-primary"></div>
          <Card className="shadow">
            <Card.Body>
              <h2 className="fw-bold mb-2 text-uppercase">Admin Login</h2>
              <p className="mb-5">
                SVP entrer votre email et mot de passe
              </p>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Adresse Email </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="example@example.com"
                    ref={emailRef}
                    autoComplete="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Mot de Passe</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Mot de Passe"
                    ref={pwdRef}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    id="persist"
                    onChange={togglePersist}
                    label="Rester connecté (24h)"
                    checked={persist}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="me-2">
                  Login
                </Button>

                {errMsg && (
                  <Alert
                    color="info"
                    className="mt-3"
                    // onClose={() => setVisible(false)}
                    // dismissible
                  >
                    {errMsg}
                  </Alert>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
