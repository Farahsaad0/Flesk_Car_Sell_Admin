import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {
  Button,
  Row,
  Col,
  Table,
  Card,
  CardTitle,
  CardBody,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import ReactPaginate from "react-paginate";

const ExpertsSubs = () => {
  const [pendingExperts, setPendingExperts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0); // Current page number
  const usersPerPage = 10; // Number of users to display per page
  const [totalPages, setTotalPages] = useState(0);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    // Fetch Pending Experts data from the server when the component mounts
    fetchPendingExperts();
  }, [pageNumber]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchPendingExperts = async () => {
    try {
      const response = await axiosPrivate.get(
        `/getPendingExperts?page=${pageNumber + 1}&perPage=${usersPerPage}`
      );
      setPendingExperts(response?.data?.pendingExperts);
      setTotalPages(response?.data?.totalPages); // Set total number of pages
    } catch (error) {
      console.error("Error fetching pending experts:", error);
    }
  };

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  const acceptExpert = async (expertId) => {
    try {
      await axiosPrivate.put(`/approuverExpert/${expertId}`);
      // After approval, fetch updated pending experts list
      fetchPendingExperts();
    } catch (error) {
      console.error("Error approving expert:", error);
    }
  };

  const toggleBlocked = async (expertId, blocked) => {
    try {
      // if (blocked) {
      //   await axiosPrivate.put(`/users/${expertId}/unblock`);
      // } else {
        await axiosPrivate.put(`/approuverExpert/${expertId}`);
      // }
      // After approval, fetch updated pending experts list
      fetchPendingExperts();
    } catch (error) {
      console.error("Error toggling user status:", error);
    }
  };

  // const blockExpert = async (expertId) => {
  //   try {
  //     await axiosPrivate.put(`/users/${expertId}/block`);
  //     // After approval, fetch updated pending experts list
  //     fetchPendingExperts();
  //   } catch (error) {
  //     console.error("Error approving expert:", error);
  //   }
  // };

  return (
    <Row>
      <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-card-text me-2"> </i>
            Demandes des Experts
          </CardTitle>
          <CardBody className="">
            <Table bordered hover>
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>email</th>
                  <th>Spécialité</th>
                  <th>action</th>
                </tr>
              </thead>
              <tbody>
                {pendingExperts.length > 0 ? (
                  pendingExperts.map((PExpert, index) => (
                    <tr key={index}>
                      <td>
                        {PExpert.Nom} {PExpert.Prenom}
                      </td>
                      <td>{PExpert.Email}</td>
                      <td>{PExpert.ExpertId && PExpert.ExpertId.spécialité}</td>
                      <td>
                        <FormGroup switch>
                          <Input
                            type="switch"
                            id={`switch-${index}`}
                            checked={
                              PExpert.Statut !== ("En attente" || "Rejeté")
                            }
                            onChange={() =>
                              toggleBlocked(
                                PExpert._id,
                                PExpert.Statut === "Bloqué"
                              )
                            }
                          />
                          <Label for={`switch-${index}`} check>
                            En attente
                            {/* {PExpert.Statut !== "Bloqué" ? "Actif" : "Inactif"} */}
                          </Label>
                        </FormGroup>
                        {/* <Button
                          className="btn"
                          color="danger"
                          size="sm"
                          onClick={() => blockExpert(PExpert.ExpertId._id)}
                        >
                          accepter
                        </Button> */}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="table-active">
                      <center>
                        Non, pas d'experts en attente. Ça doit être l'heure de
                        leur pause café ♨️!
                      </center>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
            {/* {pendingExperts.length > 0 ? ( */}
            <nav aria-label="Page navigation ">
              <ul className="pagination justify-content-center">
                <ReactPaginate
                  breakLabel="..."
                  previousLabel={<div className="page-link">Previous</div>}
                  nextLabel={<div className="page-link">Next</div>}
                  pageRangeDisplayed={4}
                  containerClassName={"pagination "}
                  activeClassName={" active"}
                  pageCount={totalPages} // Total number of pages, calculate based on total users count and usersPerPage
                  onPageChange={handlePageClick}
                  pageClassName={"page-item"} // Style for inactive page numbers
                  pageLinkClassName={"page-link"} // Style for inactive page number links
                  renderOnZeroPageCount={null}
                />
              </ul>
            </nav>
            {/* ) : (
              ""
            )} */}
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default ExpertsSubs;
