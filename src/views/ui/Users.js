import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Table,
  FormGroup,
  Input,
  Label,
  Row,
  Col,
} from "reactstrap";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "sonner";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("JoinDate");
  const [sortOrder, setSortOrder] = useState(-1);
  const [filter, setFilter] = useState("all");
  const [role, setRole] = useState("all");

  useEffect(() => {
    fetchUsers();
  }, [
    pageNumber,
    searchTerm,
    sortField,
    sortOrder,
    filter,
    role,
    usersPerPage,
  ]);

  const fetchUsers = async () => {
    try {
      const response = await axiosPrivate.get(
        `/getAllUsers?page=${
          pageNumber + 1
        }&perPage=${usersPerPage}&search=${searchTerm}&sortField=${sortField}&sortOrder=${sortOrder}&filter=${filter}&role=${role}`
      );
      setUsers(
        response.data.users.map((user) => ({
          ...user,
          createdAt: new Date(user.JoinDate),
        }))
      ); // Convert JoinDate to Date object
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Un erreur s'est produite lors de la récupération des données des utilisateurs")
    }
  };

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  const handlePerPageChange = (e) => {
    setUsersPerPage(parseInt(e.target.value)); // Parse the selected value to an integer
    setPageNumber(0); // Reset page number when changing the number of users per page
  };

  const toggleBlocked = async (userId, blocked, e) => {
    try {
      e.stopPropagation();
      if (blocked) {
        await axiosPrivate.put(`/users/${userId}/unblock`);
        toast.success("L'utilisateur a été bloqué avec succès")
      } else {
        await axiosPrivate.put(`/users/${userId}/block`);
        toast.success("L'utilisateur a été débloqué avec succès")
      }
      fetchUsers();
    } catch (error) {
      console.error("Error toggling user status:", error);
      toast.error("Un erreur s'est produite lors du blocage de l'utilisateur")
    }
  };

  const goToProfile = async (user) => {
    navigate(`/profile/${user._id}`);
  };

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Liste des utilisateurs</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Les utilisateurs
          </CardSubtitle>

          {/* Search and Filter */}
          <FormGroup>
            <Row>
              <Col className="my-3">
                <Input
                  type="text"
                  placeholder="Recherche par nom ou email"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Col>
            </Row>
            <Row className="row-cols-lg-auto g-3 align-items-center">
              <Col>
                <Label for="exampleSelect">Filtrer par status</Label>
                <Input
                  type="select"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">Tous</option>
                  <option value="En attente">En attente</option>
                  <option value="Approuvé">Approuvé</option>
                  <option value="Rejeté">Rejeté</option>
                  <option value="Bloqué">Bloqué</option>
                </Input>
              </Col>
              <Col>
                <Label for="exampleSelect">Afficher sauf les</Label>
                <Input
                  type="select"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="all">Tous</option>
                  <option value="Expert">Expert</option>
                  <option value="Utilisateur">Utilisateur</option>
                </Input>
              </Col>
              <Col>
                <Label for="perPageSelect">Utilisateurs par page</Label>
                <Input
                  type="select"
                  id="perPageSelect"
                  value={usersPerPage}
                  onChange={handlePerPageChange}
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={30}>30</option>
                </Input>
              </Col>
            </Row>
          </FormGroup>

          {/* Users Table */}
          <Table
            className="no-wrap mt-3 align-middle"
            responsive
            borderless
            hover
          >
            <thead>
              <tr>
                <th
                  onClick={() => {
                    setSortField("Nom");
                    setSortOrder(sortOrder === 1 ? -1 : 1);
                  }}
                >
                  Nom
                  {sortField === "Nom" && (
                    <i
                      className={`bi-chevron-${
                        sortOrder === 1 ? "down" : "up"
                      }`}
                    ></i>
                  )}
                </th>
                <th
                  onClick={() => {
                    setSortField("Email");
                    setSortOrder(sortOrder === 1 ? -1 : 1);
                  }}
                >
                  Email{" "}
                  {sortField === "Email" && (
                    <i
                      className={`bi-chevron-${
                        sortOrder === 1 ? "down" : "up"
                      }`}
                    ></i>
                  )}
                </th>
                <th>Status</th>
                <th>Rôle</th>
                <th
                  onClick={() => {
                    setSortField("JoinDate");
                    setSortOrder(sortOrder === 1 ? -1 : 1);
                  }}
                >
                  Date de joint{" "}
                  {sortField === "JoinDate" && (
                    <i
                      className={`bi-chevron-${
                        sortOrder === -1 ? "down" : "up"
                      }`}
                    ></i>
                  )}
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="border-top">
                  <td onClick={() => goToProfile(user)}>
                    {user.Nom} {user.Prenom}
                  </td>
                  <td onClick={() => goToProfile(user)}>{user.Email}</td>
                  <td onClick={() => goToProfile(user)}>
                    {!user.Verified ? (
                      <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
                    ) : (
                      <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
                    )}
                  </td>
                  <td onClick={() => goToProfile(user)}>{user.Role}</td>
                  <td onClick={() => goToProfile(user)}>
                    {formatDistanceToNow(user.createdAt, { locale: fr })}
                  </td>{" "}
                  {/* Display how long ago the account was created */}
                  <td>
                    <FormGroup switch>
                      <Input
                        type="switch"
                        id={`switch-${index}`}
                        checked={user.Statut !== "Bloqué"}
                        onChange={(e) =>
                          toggleBlocked(user._id, user.Statut === "Bloqué", e)
                        }
                      />
                      <Label for={`switch-${index}`} check>
                        {user.Statut !== "Bloqué" ? "Actif" : "bloqué"}
                      </Label>
                    </FormGroup>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Pagination */}
          <nav aria-label="Page navigation ">
            <ul className="pagination justify-content-center">
              <ReactPaginate
                breakLabel="..."
                previousLabel={
                  <div className="page-link" style={{ textDecoration: "none" }}>
                    Précédente
                  </div>
                }
                nextLabel={
                  <div className="page-link" style={{ textDecoration: "none" }}>
                    suivante
                  </div>
                }
                pageCount={totalPages}
                onPageChange={handlePageClick}
                containerClassName={"pagination "}
                pageRangeDisplayed={2}
                activeClassName={" active"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                renderOnZeroPageCount={null}
              />
            </ul>
          </nav>
        </CardBody>
      </Card>
    </div>
  );
};

export default Users;
