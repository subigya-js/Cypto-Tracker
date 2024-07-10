import axios from "axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { CryptoState } from "../../CryptoContext";
import { TrendingCoins } from "../../config/api";

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const SlideBanner = () => {
  const [trending, setTrending] = useState([]);
  const [error, setError] = useState(null);
  const { currency, symbol } = CryptoState();

  const fetchTrendingCoins = async () => {
    setError(null);

    try {
      const response = await axios.get(TrendingCoins(currency));
      setTrending(response.data);
    } catch (error) {
      setError("");
    }
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;

    return (
      <Link
        to={`/coins/${coin.id}`}
        className="flex flex-col items-center cursor-pointer uppercase text-white"
        key={coin.id}
      >
        <img
          src={coin?.image}
          alt={coin.name}
          width="80"
          style={{ marginBottom: 10 }}
        />

        <span className="flex flex-col items-center cursor-pointer uppercase text-white">
          {coin?.symbol} &nbsp;
          <span className={profit ? "text-green-500" : "text-red-500"}>
            {profit && "+"} {coin.price_change_percentage_24h?.toFixed(2)}%
          </span>
          <span className="text-[22px] text-semibold text-yellow-400">
            {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
          </span>
        </span>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    800: {
      items: 3,
    },
    1100: {
      items: 4,
    },
  };

  return (
    <div className="h-[50%] flex items-center bg-green-00 px-2">
      {error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <AliceCarousel
          mouseTracking
          infinite
          autoPlayInterval={1000}
          animationDuration={1500}
          disableButtonsControls
          disableDotsControls
          responsive={responsive}
          autoPlay
          items={items}
        />
      )}
    </div>
  );
};

export default SlideBanner;
