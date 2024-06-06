import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Card, CardBody } from "reactstrap";

const SponsorshipDonut = () => {
  const axiosPrivate = useAxiosPrivate();
  const [options, setOptions] = useState({ labels: [] });
  const [series, setSeries] = useState([]);
  const [counts, setCounts] = useState({});

  useEffect(() => {
    const fetchSponsorshipStats = async () => {
      try {
        const response = await axiosPrivate.get("/carAds/sponsorship/stat");
        const {
          activeSponsoredPercentage,
          unsponsoredPercentage,
          activeSponsoredCount,
          unsponsoredCount,
        } = response.data;

        setOptions({
          labels: ['Active Sponsored', 'Unsponsored'],
          tooltip: {
            y: {
              formatter: (value, { seriesIndex }) => {
                const count =
                  seriesIndex === 0
                    ? activeSponsoredCount
                    : unsponsoredCount;
                return `${count} cars`;
              },
            },
          },
        });
        setSeries([parseFloat(activeSponsoredPercentage), parseFloat(unsponsoredPercentage)]);
        setCounts({ activeSponsoredCount, unsponsoredCount });
      } catch (error) {
        console.error('Error fetching car sponsorship stats:', error);
      }
    };

    fetchSponsorshipStats();
  }, [axiosPrivate]);

  return (
    <Card>
      <CardBody>
        <div className="donut">
          <Chart options={options} series={series} type="donut" width="380" />
        </div>
      </CardBody>
    </Card>
  );
};

export default SponsorshipDonut;
