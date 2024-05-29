import React, { useState, useEffect } from "react";
import { Table, Card, CardTitle, CardBody } from "reactstrap";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const ContactsPage = () => {
  const [contacts, setContacts] = useState([]);
    const navigate = useNavigate()
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/contacts');
      setContacts(response.data); // Supposons que le backend renvoie un tableau d'objets contenant les contacts
    } catch (error) {
      console.error("Erreur lors de la récupération des contacts :", error);
    }
  };
  const goToProfile = async (contact) => {
    navigate("/SupportTicket", { state: { contact } });
  };
  return (
    <div>
      <h2>Liste des Contacts</h2>
      <Card>
        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
          Contacts
        </CardTitle>
        <CardBody className="">
          <Table bordered hover>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Email</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, index) => (
                <tr onClick={() => goToProfile(contact)}  key={index}>
                  <td>{contact.Nom}</td>
                  <td>{contact.Prénom}</td>
                  <td>{contact.Email}</td>
                  <td>{contact.Message}</td>
                </tr>

              ) )}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>

  );

};

export default ContactsPage;
