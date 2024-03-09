import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Row, Col, Table, Card, CardTitle, CardBody } from "reactstrap";
import ReactPaginate from "react-paginate";

const ExpertsSubs = () => {
  const [pendingExperts, setPendingExperts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0); // Current page number
  const usersPerPage = 10; // Number of users to display per page
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    // Fetch Pending Experts data from the server when the component mounts
    fetchPendingExperts();
  }, [pageNumber]);

  const fetchPendingExperts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/getPendingExperts?page=${
          pageNumber + 1
        }&perPage=${usersPerPage}`
      );
      setPendingExperts(response.data.pendingExperts);
      setTotalPages(response.data.totalPages); // Set total number of pages
    } catch (error) {
      console.error("Error fetching pending experts:", error);
    }
  };

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  const acceptExpert = async (expertId) => {
    try {
      await axios.put(`http://localhost:8000/approuverExpert/${expertId}`);
      // After approval, fetch updated pending experts list
      fetchPendingExperts();
    } catch (error) {
      console.error("Error approving expert:", error);
    }
  };

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
                  <th>Specialiter</th>
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
                        <Button
                          className="btn"
                          color="success"
                          size="sm"
                          onClick={() => acceptExpert(PExpert.ExpertId._id)}
                        >
                          accepter
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" class="table-active">
                      <center>
                        Non, pas d'experts en attente. Ça doit être l'heure de
                        leur pause café ♨️!
                      </center>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
            {pendingExperts.length > 0 ? (
              <nav aria-label="Page navigation ">
                <ul class="pagination justify-content-center">
                  <ReactPaginate
                    previousLabel={
                      <li class="page-item">
                        <a class="page-link">Previous</a>
                      </li>
                    }
                    nextLabel={<a class="page-link">Next</a>}
                    pageCount={totalPages} // Total number of pages, calculate based on total users count and usersPerPage
                    onPageChange={handlePageClick}
                    containerClassName={"pagination "}
                    activeClassName={" active"}
                    pageClassName={"page-item"} // Style for inactive page numbers
                    pageLinkClassName={"page-link"} // Style for inactive page number links
                  />
                </ul>
              </nav>
            ) : (
              ""
            )}
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default ExpertsSubs;
