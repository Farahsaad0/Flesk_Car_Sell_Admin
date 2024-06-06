import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Card, CardBody } from "reactstrap";

const RoleDonut = () => {
  const axiosPrivate = useAxiosPrivate();
  const [options, setOptions] = useState({ labels: [] });
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const fetchUserRoles = async () => {
      try {
        const response = await axiosPrivate.get("/users/role/stat");
        const rolesData = response.data;
        const labels = rolesData.map((role) => role._id);
        const series = rolesData.map((role) => role.count);

        setOptions({ labels });
        setSeries(series);
      } catch (error) {
        console.error("Error fetching user roles data:", error);
      }
    };

    fetchUserRoles();
  }, [axiosPrivate]);

  return (
    <Card>
      <CardBody>
        <div className="donut">
          <Chart options={options} series={series} type="donut" width="355" />
        </div>
      </CardBody>
    </Card>
  );
};

export default RoleDonut;
