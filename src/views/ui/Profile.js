import { useLocation } from "react-router-dom";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Table,
} from "reactstrap";
import user1 from "../../assets/images/users/user1.jpg";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import PostItem from "../../components/PostItem";

const Profile = () => {
  const [open, setOpen] = useState(1);
  const location = useLocation();
  const { user: initialUser } = location.state || {};
  const axiosPrivate = useAxiosPrivate();
  const [user, setUser] = useState(initialUser);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sentTransactions, setSentTransactions] = useState([]);
  const [receivedTransactions, setReceivedTransactions] = useState([]);
  const userId = user._id;

  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  const fetchUser = async (userId) => {
    try {
      const response = await axiosPrivate.get(`/getUser/${userId}`);
      setUser(response.data);
    } catch (error) {
      console.error("Error updating user info:", error);
    }
  };

  const blockUser = async (userId) => {
    try {
      await axiosPrivate.put(`/users/${userId}/block`);
      fetchUser(userId);
    } catch (error) {
      console.error("Error blocking user:", error);
    }
  };

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        if (!userId) {
          throw new Error("User Id is missing");
        }

        const response = await axios.get(`/getCarAdByUserId/${userId}`);

        console.log(response.data);
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user posts:", error);
        setLoading(false);
      }
    };
    const fetchSentTransactions = async () => {
      try {
        const response = await axios.get(`/transactions/${userId}`);
        setSentTransactions(response.data.transactions);
      } catch (error) {
        console.error("Error fetching sent transactions", error);
      }
    };

    const fetchReceivedTransactions = async () => {
      try {
        const response = await axios.get(`/transactions/expert/${userId}`);
        setReceivedTransactions(response.data.completedTransactions);
      } catch (error) {
        console.error("Error fetching received transactions", error);
      }
    };

    fetchSentTransactions();
    fetchReceivedTransactions();
    fetchUserPosts();
  }, [userId]);

  const imageUrl = user?.photo
    ? `http://localhost:8000/images/${user.photo}`
    : null;

  return (
    <div>
      <Row>
        <Col sm="6" lg="6" xl="5" xxl="4">
          <Card>
            <CardBody className="text-center">
              {user._id && (
                <>
                  <img
                    src={imageUrl}
                    alt="Profile"
                    className="img-fluid rounded-circle mb-3"
                    style={{ width: "150px" }}
                  />
                  {/* <img src={user.profilePicture} alt="Profile" className="img-fluid rounded-circle mb-3" style={{ width: '150px' }} /> */}
                  <div>
                    <p>User ID: {user._id}</p>
                    <p>
                      Join Date:{" "}
                      {new Date(user.createdAt).toLocaleDateString() ||
                        "jj/mm/aaaa"}
                    </p>
                  </div>
                  <Button
                    className={
                      user.Statut !== "Bloqué" ? "btn" : "btn disabled"
                    }
                    color="danger"
                    size="sm"
                    onClick={() => blockUser(user._id)}
                  >
                    Bloquer
                  </Button>
                </>
              )}
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Card>
            <CardBody>
              <Form>
                {user && (
                  <>
                    <FormGroup>
                      <Label for="Email">Email</Label>
                      <Input
                        id="Email"
                        name="email"
                        placeholder="Email"
                        type="email"
                        value={user.Email || ""}
                        disabled
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="Nom">Nom</Label>
                      <Input
                        id="Nom"
                        name="nom"
                        placeholder="Nom"
                        type="text"
                        value={user.Nom || ""}
                        disabled
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="Prenom">Prenom</Label>
                      <Input
                        id="Prenom"
                        name="prenom"
                        placeholder="Prenom"
                        type="text"
                        value={user.Prenom || ""}
                        disabled
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="Role">Role</Label>
                      <Input
                        id="Role"
                        name="role"
                        placeholder="Role"
                        type="text"
                        value={user.Role || ""}
                        disabled
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="Statut">Statut</Label>
                      <Input
                        id="Statut"
                        name="statut"
                        placeholder="Statut"
                        type="text"
                        value={user.Statut || ""}
                        disabled
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="Verified">Verified</Label>
                      <Input
                        id="Verified"
                        name="verified"
                        placeholder="Verified"
                        type="text"
                        value={user.Verified ? "true" : "false"}
                        disabled
                      />
                    </FormGroup>
                  </>
                )}
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Accordion open={open} toggle={toggle} className="card bg-dark mt-5">
            <AccordionItem>
              <AccordionHeader targetId="1">
                Historique des transactions envoyées
              </AccordionHeader>
              <AccordionBody
                accordionId="1"
                style={{ backgroundColor: "white" }}
              >
                <Table bordered striped>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Type</th>
                      <th>Montant</th>
                      <th>Statut de paiement</th>
                      <th>Date de paiement</th>
                      <th>Bénéficiaire</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sentTransactions.length > 0 ? (
                      sentTransactions?.map((transaction, i) => (
                        <tr key={transaction?._id}>
                          <th scope="row">{i + 1}</th>
                          <td>{transaction?.type}</td>
                          <td>{transaction?.amount}</td>
                          <td>{transaction?.paymentStatus}</td>
                          <td>{transaction?.paymentDate}</td>
                          <td>
                            {transaction?.recipient?.Role === "Administrateur"
                              ? "Flesk Car Sell"
                              : `${transaction?.recipient?.Nom} ${transaction?.recipient?.Prenom}`}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6">
                          <center>
                            Votre historique de transactions est vide pour le
                            moment. Rien à voir ici.
                          </center>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </AccordionBody>
            </AccordionItem>
          </Accordion>
          {user.Role === "Expert" && (
            <Accordion
              open={open}
              toggle={toggle}
              color="white"
              className="card mt-5"
            >
              <AccordionItem>
                <AccordionHeader targetId="2">
                  Historique des transactions reçues
                </AccordionHeader>
                <AccordionBody
                  accordionId="2"
                  style={{ backgroundColor: "white" }}
                >
                  <Table bordered striped>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Type</th>
                        <th>Montant</th>
                        <th>Statut de paiement</th>
                        <th>Date de paiement</th>
                        <th>Expéditeur</th>
                      </tr>
                    </thead>
                    <tbody>
                      {receivedTransactions.length > 0 ? (
                        receivedTransactions?.map((transaction, i) => (
                          <tr key={transaction?._id}>
                            <th scope="row">{i + 1}</th>
                            <td>{transaction?.type}</td>
                            <td>{transaction?.amount}</td>
                            <td>{transaction?.paymentStatus}</td>
                            <td>{transaction?.paymentDate}</td>
                            <td>
                              {transaction?.sender?.Nom}{" "}
                              {transaction?.sender?.Prenom}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6">
                            <center>
                              Votre historique de transactions est vide pour le
                              moment. Rien à voir ici.
                            </center>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </AccordionBody>
              </AccordionItem>
            </Accordion>
          )}
        </Col>
      </Row>
      <Row className="mt-5">
        {/* <Col> */}
        {/* <Card>
        <CardBody> */}
        {loading ? (
          <div>Loading...</div>
        ) : posts.length === 0 ? (
          <Col>
            <Card>
              <CardBody>
                Cet utilisateur n'a publié aucune annonce jusqu'à présent.
              </CardBody>
            </Card>
          </Col>
        ) : (
          <>
            {/* <Row sm="6" lg="8" xl="8" xxl="8" className="d-flex flex-wrap "> */}
            {posts.map((post) => (
              <Col key={post._id} sm="4" lg="6" xl="5" xxl="4" className="mb-3">
                <PostItem post={post} />
              </Col>
            ))}
            {/* </Row> */}
          </>
        )}
        {/* </CardBody>
      </Card> */}
        {/* </Col> */}
      </Row>
    </div>
  );
};

export default Profile;
