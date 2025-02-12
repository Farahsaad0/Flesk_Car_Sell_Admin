// import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
// import user1 from "../../assets/images/users/user1.jpg";
// import user2 from "../../assets/images/users/user2.jpg";
// import user3 from "../../assets/images/users/user3.jpg";
// import user4 from "../../assets/images/users/user4.jpg";
// import user5 from "../../assets/images/users/user5.jpg";

// const tableData = [
//   {
//     avatar: user1,
//     name: "Hanna Gover",
//     email: "hgover@gmail.com",
//     project: "Flexy React",
//     status: "pending",
//     weeks: "35",
//     budget: "95K",
//   },
//   {
//     avatar: user2,
//     name: "Hanna Gover",
//     email: "hgover@gmail.com",
//     project: "Lading pro React",
//     status: "done",
//     weeks: "35",
//     budget: "95K",
//   },
//   {
//     avatar: user3,
//     name: "Hanna Gover",
//     email: "hgover@gmail.com",
//     project: "Elite React",
//     status: "holt",
//     weeks: "35",
//     budget: "95K",
//   },
//   {
//     avatar: user4,
//     name: "Hanna Gover",
//     email: "hgover@gmail.com",
//     project: "Flexy React",
//     status: "pending",
//     weeks: "35",
//     budget: "95K",
//   },
//   {
//     avatar: user5,
//     name: "Hanna Gover",
//     email: "hgover@gmail.com",
//     project: "Ample React",
//     status: "done",
//     weeks: "35",
//     budget: "95K",
//   },
// ];

// const ProjectTables = () => {
//   return (
//     <div>
//       <Card>
//         <CardBody>
//           <CardTitle tag="h5">Liste des utilisateurs</CardTitle>
//           <CardSubtitle className="mb-2 text-muted" tag="h6">
//             Les utilisatuers
//           </CardSubtitle>

//           <Table className="no-wrap mt-3 align-middle" responsive borderless>
//             <thead>
//               <tr>
//                 <th>Team Lead</th>
//                 <th> Role</th>

//                 <th>Status</th>
//                 <th>Weeks</th>
//                 <th>Budget</th>
//               </tr>
//             </thead>
//             <tbody>
//               {tableData.map((tdata, index) => (
//                 <tr key={index} className="border-top">
//                   <td>
//                     <div className="d-flex align-items-center p-2">
//                       <img
//                         src={tdata.avatar}
//                         className="rounded-circle"
//                         alt="avatar"
//                         width="45"
//                         height="45"
//                       />
//                       <div className="ms-3">
//                         <h6 className="mb-0">{tdata.name}</h6>
//                         <span className="text-muted">{tdata.email}</span>
//                       </div>
//                     </div>
//                   </td>
//                   <td>{tdata.project}</td>
//                   <td>
//                     {tdata.status === "pending" ? (
//                       <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
//                     ) : tdata.status === "holt" ? (
//                       <span className="p-2 bg-warning rounded-circle d-inline-block ms-3"></span>
//                     ) : (
//                       <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
//                     )}
//                   </td>
//                   <td>{tdata.weeks}</td>
//                   <td>{tdata.budget}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </CardBody>
//       </Card>
//     </div>
//   );
// };

// export default ProjectTables;

import React, { useState, useEffect } from "react";
import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const ProjectTables = () => {
  const axiosPrivate = useAxiosPrivate();
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchLast5Users = async () => {
      try {
        const response = await axiosPrivate.get("/users/lastFive/stat");
        setTableData(response.data);
      } catch (error) {
        console.error("Error fetching last 5 users:", error);
      }
    };

    fetchLast5Users();
  }, [axiosPrivate]);

  // const imageUrl = tableData?.photo
  // ? `http://localhost:8000/images/${user.photo}`
  // : null;

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Liste des utilisateurs</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Les Utilisateurs les Plus Récents
          </CardSubtitle>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Avatar</th>
                <th>Nom</th>
                <th>Email</th>
                <th>Verifier</th>
                <th>Role</th>
                <th>Date d'inscription</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((user, index) => (
                <tr key={index} className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">
                      <img
                        src={`http://localhost:8000/images/${user.photo}`} // Replace with actual path to default avatar
                        className="rounded-circle"
                        alt="avatar"
                        width="45"
                        height="45"
                        style={{
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </td>
                  <td>
                    <div className="ms-3">
                      <h6 className="mb-0">
                        {user.Nom} {user.Prenom}
                      </h6>
                    </div>
                  </td>
                  <td>{user.Email}</td>{" "}
                  <td>
                    {!user.Verified ? (
                      <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
                    ) : (
                      <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
                    )}
                  </td>
                  <td>{user.Role}</td>
                  <td>{new Date(user.JoinDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProjectTables;
