import { useLocation } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import user1 from "../../assets/images/users/user1.jpg";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import PostItem from "../../components/PostItem";

const Profile = () => {
  const location = useLocation();
  const { user: initialUser } = location.state || {};
  const axiosPrivate = useAxiosPrivate();
  const [user, setUser] = useState(initialUser);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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
        const userId = user._id;
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

    fetchUserPosts();
  }, []);

  return (
    <div>
      <Row>
        <Col sm="6" lg="6" xl="5" xxl="4">
          <Card>
            <CardBody className="text-center">
              {user && (
                <>
                  <img
                    src={user1}
                    alt="Profile"
                    className="img-fluid rounded-circle mb-3"
                    style={{ width: "150px" }}
                  />
                  {/* <img src={user.profilePicture} alt="Profile" className="img-fluid rounded-circle mb-3" style={{ width: '150px' }} /> */}
                  <div>
                    <p>User ID: {user._id}</p>
                    <p>Join Date: {user.joinDate || "jj/mm/aaaa"}</p>
                  </div>
                  <Button
                    className={
                      user.Statut !== "Bloqué" ? "btn" : "btn disabled"
                    }
                    color="danger"
                    size="sm"
                    onClick={() => blockUser(user._id)}
                  >
                    Blocker
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
          <Card>
            <CardBody>
              <Row>
                {loading ? (
                  <div>Loading...</div>
                ) : posts.length === 0 ? (
                  <div>No post ads found.</div>
                ) : (
                  posts.map((post) => (
                    <Col
                      key={post._id}
                      className="mb-3 d-flex align-items-center justify-content-between"
                    >
                      <PostItem post={post} />
                    </Col>
                  ))
                )}
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
