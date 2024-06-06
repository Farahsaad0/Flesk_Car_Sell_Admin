// import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
// import Chart from "react-apexcharts";

// const SalesChart = () => {
//   const chartoptions = {
//     series: [
//       {
//         name: "Iphone 13",
//         data: [0, 31, 40, 28, 51, 42, 109, 100],
//       },
//       {
//         name: "Oneplue 9",
//         data: [0, 11, 32, 45, 32, 34, 52, 41],
//       },
//     ],
//     options: {
//       chart: {
//         type: "area",
//       },
//       dataLabels: {
//         enabled: false,
//       },
//       grid: {
//         strokeDashArray: 3,
//       },

//       stroke: {
//         curve: "smooth",
//         width: 1,
//       },
//       xaxis: {
//         categories: [
//           "Jan",
//           "Feb",
//           "March",
//           "April",
//           "May",
//           "June",
//           "July",
//           "Aug",
//         ],
//       },
//     },
//   };
//   return (
//     <Card>
//       <CardBody>
//         <CardTitle tag="h5">Sales Summary</CardTitle>
//         <CardSubtitle className="text-muted" tag="h6">
//           Yearly Sales Report
//         </CardSubtitle>
//         <Chart
//           type="area"
//           width="100%"
//           height="390"
//           options={chartoptions.options}
//           series={chartoptions.series}
//         ></Chart>
//       </CardBody>
//     </Card>
//   );
// };

// export default SalesChart;

import React, { useEffect, useState } from "react";
import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import Chart from "react-apexcharts";
import axios from "../../api/axios";

const SalesChart = () => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: "area",
        zoom: {
          type: "x",
          enabled: true,
          autoScaleYaxis: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        strokeDashArray: 3,
      },
      stroke: {
        curve: "smooth",
        width: 1,
      },
      xaxis: {
        categories: [],
      },
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/transactions/profit/stat");
        const { categories, series } = response.data;

        setChartData({
          series,
          options: {
            ...chartData.options,
            xaxis: {
              categories,
            },
          },
        });
      } catch (error) {
        console.error("Error fetching transaction data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Sales Summary</CardTitle>
        <CardSubtitle className="text-muted" tag="h6">
          Yearly Sales Report
        </CardSubtitle>
        <Chart
          type="area"
          width="100%"
          height="390"
          options={chartData.options}
          series={chartData.series}
        />
      </CardBody>
    </Card>
  );
};

export default SalesChart;
