import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Table,
  Button,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { Switch } from "reactstrap";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [pageNumber, setPageNumber] = useState(0); // Current page number
  const usersPerPage = 10; // Number of users to display per page
  const [totalPages, setTotalPages] = useState(0);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, [pageNumber]); // Re-fetch users when the page number changes

  const fetchUsers = async () => {
    try {
      const response = await axiosPrivate.get(
        `/getAllUsers?page=${pageNumber + 1}&perPage=${usersPerPage}`
      );
      console.log("Response from API:", response.data); // ! ___FOR_TEST_ONLY_REMEMBER_TO_DELETE_LATER___
      setUsers(response.data.users); // Set users data
      setTotalPages(response.data.totalPages); // Set total number of pages
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  const toggleBlocked = async (userId, blocked, e) => {
    try {
      e.stopPropagation()
      if (blocked) {
        await axiosPrivate.put(`/users/${userId}/unblock`);
      } else {
        await axiosPrivate.put(`/users/${userId}/block`);
      }
      // After approval, fetch updated pending experts list
      fetchUsers();
    } catch (error) {
      console.error("Error toggling user status:", error);
    }
  };

  const blockUser = async (expertId) => {
    try {
      await axiosPrivate.put(`/users/${expertId}/block`);
      // After approval, fetch updated pending experts list
      fetchUsers();
    } catch (error) {
      console.error("Error approving expert:", error);
    }
  };

  const goToProfile = async (user) => {
    navigate("/profile", { state: { user } });
  };

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Liste des utilisateurs</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Les utilisateurs
          </CardSubtitle>

          <Table className="no-wrap mt-3 align-middle" responsive borderless hover>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Status</th>
                <th>Rôle</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="border-top" >
                  <td onClick={() => goToProfile(user)} >
                    {user.Nom} {user.Prenom}
                  </td>
                  <td>{user.Email}</td>
                  <td>
                    {!user.Verified ? (
                      <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
                    ) : (
                      <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
                    )}
                  </td>
                  <td>{user.Role}</td>
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
                        {user.Statut !== "Bloqué" ? "Actif" : "blocker"}
                      </Label>
                    </FormGroup>
                  </td>
                  {/* <td>
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
                  </td> */}
                </tr>
              ))}
            </tbody>
          </Table>
          <nav aria-label="Page navigation ">
            <ul className="pagination justify-content-center">
              <ReactPaginate
                breakLabel="..."
                previousLabel={<div className="page-link">Previous</div>}
                nextLabel={<div className="page-link">Next</div>}
                pageCount={totalPages} // Total number of pages, calculate based on total users count and usersPerPage
                onPageChange={handlePageClick}
                containerClassName={"pagination "}
                pageRangeDisplayed={2}
                activeClassName={" active"}
                pageClassName={"page-item"} // Style for inactive page numbers
                pageLinkClassName={"page-link"} // Style for inactive page number links
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
