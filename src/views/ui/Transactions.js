import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Col,
  Input,
  Label,
  Row,
  Table,
} from "reactstrap";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import ReactPaginate from "react-paginate";

const Transactions = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [transactionPerPage, setTransactionPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [sortOrder, setSortOrder] = useState(-1);
  const [transactions, setTransactions] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axiosPrivate.get(`/transactions`, {
          params: {
            page: pageNumber + 1,
            limit: transactionPerPage,
            sortOrder,
          },
        });
        setTransactions(response?.data?.transactions);
        setTotalPages(response?.data?.totalPages);
      } catch (error) {
        console.error("Error fetching sent transactions", error);
        // toast.error("Une erreur s'est produite lors de la récupération de l'historique de vos transactions")
      }
    };
    fetchTransactions();
  }, [sortOrder, pageNumber, transactionPerPage]);

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };
  const handlePerPageChange = (e) => {
    setTransactionPerPage(parseInt(e.target.value)); // Parse the selected value to an integer
    setPageNumber(0); // Reset page number when changing the number of users per page
  };
  const handleSortChange = (e) => {
    const value = e.target.value;
    if (value === "croissant") {
      setSortOrder(1);
    } else {
      setSortOrder(-1);
    }
  };

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Liste de toutes les transactions</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            <Row className="row-cols-lg-auto  d-flex justify-content-between align-items-center mb-3">
              <Col className=" d-flex align-items-center  gap-2">
                <Col>
                  {/* <div className=" d-flex align-items-center gap-3 mb-5"> */}
                  <Label for="priceOrder">
                    <i className="ri-sort-asc"></i> Trier par
                  </Label>
                </Col>
                <Col>
                  <Input
                    type="select"
                    id="priceOrder"
                    onChange={handleSortChange}
                    style={{ width: "fit-content" }}
                  >
                    <option value="décroissant">les plus récent</option>
                    <option value="croissant">les plus ancien</option>
                  </Input>
                </Col>
              </Col>

              <Col className=" d-flex align-items-center gap-1">
                <Col>
                  <Input
                    type="select"
                    id="perPageSelect"
                    value={transactionPerPage}
                    onChange={handlePerPageChange}
                    style={{ width: "fit-content" }}
                  >
                    <option value={10}> 10 </option>
                    <option value={20}> 20 </option>
                    <option value={35}> 35 </option>
                    <option value={50}> 50 </option>
                  </Input>
                </Col>
                <Col>
                  <Label for="perPageSelect">par page</Label>
                </Col>
              </Col>
            </Row>
            <Table bordered striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Type</th>
                  <th>Montant</th>
                  <th>Statut de paiement</th>
                  <th>Date de paiement</th>
                  <th>expéditeur</th>
                  <th>Bénéficiaire</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length > 0 ? (
                  transactions?.map((transaction, i) => (
                    <tr key={transaction?._id}>
                      <th scope="row">{i + 1}</th>
                      <td>{transaction?.type}</td>
                      <td>{transaction?.amount}</td>
                      <td>{transaction?.paymentStatus}</td>
                      <td>{new Date(transaction?.paymentDate).toLocaleDateString()}</td>
                      <td>
                        {transaction?.sender?.Role === "Administrateur"
                          ? "Flesk Car Sell"
                          : `${transaction?.sender?.Nom} ${transaction?.sender?.Prenom}`}
                      </td>
                      <td>
                        {transaction?.recipient?.Role === "Administrateur"
                          ? "Flesk Car Sell"
                          : `${transaction?.recipient?.Nom} ${transaction?.recipient?.Prenom}`}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">
                      <center>
                        L'historique de transactions est vide pour le moment.
                        Rien à voir ici.
                      </center>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
            <Row>
              <nav aria-label="Page navigation ">
                <ul className="pagination justify-content-center">
                  <ReactPaginate
                    breakLabel="..."
                    previousLabel={<div className="page-link">Previous</div>}
                    nextLabel={<div className="page-link">Next</div>}
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
            </Row>
          </CardSubtitle>
        </CardBody>
      </Card>
    </div>
  );
};

export default Transactions;
