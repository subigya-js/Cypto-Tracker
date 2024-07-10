import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import { SingleCoin } from "../config/api";
import CoinInfo from "./CoinInfo";
import { numberWithCommas } from "./Banner/SlideBanner";
import Progress from "./Progress";
import parse from "html-react-parser";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    try {
      const response = await axios.get(SingleCoin(id));

      setCoin(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(coin);

  useEffect(() => {
    fetchCoin();
  }, [currency]);

  if (!coin)
    return (
      <div className="min-h-[91vh] flex justify-center items-center">
        <Progress />
      </div>
    );

  return (
    <div>
      <div className="min-h-[91vh] flex flex-col lg:flex-row">
        <div className="w-[100%] lg:w-[30%] flex flex-col items-center mt-25 lg:border-r-2 lg:border-blue-500">
          <img
            src={coin?.image.large}
            alt={coin?.name}
            className="py-10 h-[270px]"
          />

          <h1 className="text-3xl sm:text-4xl font-bold mb-20">{coin?.name}</h1>

          <p className="w-[100%] p-5 pb-15 pt-0 lg:text-justify text-center">
            {parse(coin?.description.en.split(". ")[0])}.
          </p>

          <div
            className="w-full bg-green-00 p-5 mt-3 flex flex-col gap-2 md:items-center xl:items-start md:flex-row md:justify-between lg:flex-col md:px-8"
            style={{ alignSelf: "start" }}
          >
            <span className="flex">
              <h1 className="text-xl font-bold text-blue-400">
                Rank: &nbsp;
                <span className="font-normal text-white">
                  {coin?.market_cap_rank}
                </span>
              </h1>
            </span>

            <span className="flex">
              <h1 className="text-xl font-bold text-blue-400">
                Current Price: &nbsp;
                <span className="font-normal text-white">
                  {symbol}{" "}
                  {numberWithCommas(
                    coin?.market_data.current_price[currency.toLowerCase()]
                  )}
                </span>
              </h1>
            </span>

            <span className="flex">
              <h1 className="text-xl font-bold text-blue-400">
                Market Cap: &nbsp;
                <span className="font-normal text-white">
                  {symbol}{" "}
                  {numberWithCommas(
                    coin.market_data.market_cap[currency.toLowerCase()]
                      .toString()
                      .slice(0, -6)
                  )}{" "}
                  M
                </span>
              </h1>
            </span>
          </div>
        </div>

        <div>
          <CoinInfo coin={coin} />
        </div>
      </div>
    </div>
  );
};

export default CoinPage;
