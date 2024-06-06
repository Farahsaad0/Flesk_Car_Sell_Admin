import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Card, CardBody } from "reactstrap";

const UserRegistrationChart = () => {
  const axiosPrivate = useAxiosPrivate();
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({
    chart: {
      type: "area",
      stacked: false,
      height: 350,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: "zoom",
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    title: {
      text: "Les Inscriptions des Utilisateurs au Fil du Temps",
      align: "left",
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return val.toFixed(0);
        },
      },
      title: {
        text: "Nombre d'Utilisateurs",
      },
    },
    xaxis: {
      type: "datetime",
    },
    tooltip: {
      shared: false,
      y: {
        formatter: function (val) {
          return val.toFixed(0);
        },
      },
    },
  });

  useEffect(() => {
    const fetchUserRegistrations = async () => {
      try {
        const response = await axiosPrivate.get("/users/registration/stat");
        const registrations = response.data;

        const dates = registrations.map((reg) => reg._id);
        const counts = registrations.map((reg) => reg.count);

        setSeries([
          {
            name: "User Registrations",
            data: dates.map((date, index) => ({ x: date, y: counts[index] })),
          },
        ]);
      } catch (error) {
        console.error("Error fetching user registrations:", error);
      }
    };

    fetchUserRegistrations();
  }, [axiosPrivate]);

  return (
    <Card>
      <CardBody>
        <div id="chart">
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={350}
          />
        </div>
        <div id="html-dist"></div>
      </CardBody>
    </Card>
  );
};

export default UserRegistrationChart;
