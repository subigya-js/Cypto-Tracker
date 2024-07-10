import React, { useEffect, useState } from "react";
import { CryptoState } from "../CryptoContext";
import { HistoricalChart } from "../config/api";
import axios from "axios";
import Progress from "./Progress";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  CategoryScale,
  Tooltip,
  Legend
);

const CoinInfo = ({ coin }) => {
  const [historicalData, setHistoricalData] = useState([]);
  const [days, setDays] = useState(1);
  const [loading, setLoading] = useState(true);

  const { currency } = CryptoState();

  const fetchHistoricalData = async () => {
    try {
      const { data } = await axios.get(
        HistoricalChart(coin.id, days, currency)
      );
      setHistoricalData(data.prices);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch historical data", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchHistoricalData();
  }, [currency, days, coin.id]);

  return (
    <>
      <div className="w-[95vw] h-[90vh] md:w-[70vw] px-10">
        {loading ? (
          <div className="w-full flex justify-center items-center h-full">
            <Progress />
          </div>
        ) : (
          <div className="relative w-full h-full">
            <Line
              data={{
                labels: historicalData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;

                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    data: historicalData.map((coin) => coin[1]),
                    label: `Price of last 1 Day in ${currency}`,
                    borderColor: "#3a68e8",
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "top",
                  },
                },
                layout: {
                  padding: {
                    top: 20,
                    bottom: 20,
                  },
                },
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: "Date",
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: `Price (Past ${days} days) in ${currency}`,
                    },
                  },
                },
              }}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default CoinInfo;
