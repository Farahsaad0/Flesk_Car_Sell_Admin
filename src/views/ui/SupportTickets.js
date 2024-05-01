import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import axios from 'axios';

const SupportTickets = () => {
  const [ticketData, setTicketData] = useState([]);

  useEffect(() => {
    // fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://your-node-backend-url/tickets');
      setTicketData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <Row>
      <Col lg="8">
        <Card className="mb-4">
          <CardBody>
            <h5>Ticket</h5>
            <p className="mt-3 mb-0">
              Hi There, i was wondering, do you provide a service to build custom pages. I need some pages for a ticket system similar to the one you have. Please advise if you provide this service and i will send through my requirements. Regards.
            </p>
          </CardBody>
        </Card>
        <Card className="mb-4">
          <CardBody>
            <h5 className="mb-4">Ticket Replies</h5>
            {ticketData.map((ticket, index) => (
              <div key={index} className="d-flex media">
                <a href="#" className="media-left">
                  <img src={`/assets/user${index + 1}-image.jpg`} alt="Generic placeholder image" width="100" className="media-object" />
                </a>
                <div className="ms-3 media-body">
                  <h4 className="media-heading">{ticket.title}</h4>
                  <p>{ticket.description}</p>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </Col>
      <Col lg="4">
        <Card className="mb-4">
          <CardBody>
            <h5>Ticket Info</h5>
            <div className="bg-light my-3 align-items-center row">
              <div className="col-sm-6">
                <div className="py-3">
                  <span className="badge bg-warning">In-Progress</span>
                </div>
              </div>
              <div className="text-end col-sm-6">May 2, 2018 9:49</div>
            </div>
            <h6>Ticket Creator</h6>
            <span>Username</span><br /><br />
            <h6>Support Staff</h6>
            <span>Agent Name</span><br /><br />
            <Button color="success">Update</Button>
          </CardBody>
        </Card>
        <Card>
          {/* Your Card content here */}
        </Card>
      </Col>
    </Row>
  );
};

export default SupportTickets;
