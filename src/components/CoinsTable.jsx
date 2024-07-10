import React, { useContext, useEffect, useState } from "react";
import { CoinList } from "../config/api";
import axios from "axios";
import { CryptoState } from "../CryptoContext";
import Progress from "./Progress";
import { numberWithCommas } from "./Banner/SlideBanner";
import { Link } from "react-router-dom";

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const { currency, symbol } = CryptoState();

  const fetchCoins = async () => {
    setError(null);

    try {
      const response = await axios.get(CoinList(currency));
      setCoins(response.data);
    } catch (error) {
      setError("Failed to fetch data. Please try again later.");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  };

  const handlePagination = (coins) => {
    const indexOfLastCoin = currentPage * rowsPerPage;
    const indexOfFirstCoin = indexOfLastCoin - rowsPerPage;
    return coins.slice(indexOfFirstCoin, indexOfLastCoin);
  };

  const paginatedCoins = handlePagination(handleSearch());

  const totalPages = Math.ceil(handleSearch().length / rowsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="text-center">
        <h1 className="py-8 text-2xl">Today's Crypto Values</h1>

        <input
          type="text"
          placeholder="Search by Currency Name or Symbol..."
          className="w-[300px] md:w-[500px] xl:w-[600px] p-3 outline-none rounded-md text-gray-800"
          onChange={(event) => setSearch(event.target.value)}
        />

        {loading ? (
          <div className="flex justify-center mt-10">
            <Progress />
          </div>
        ) : error ? (
          <div className="flex justify-center mt-10">
            <Progress />
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 w-[90vw] pb-5">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-blue-400 dark:text-gray-900">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Coin
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      24hr Change
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Market Capital
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedCoins.map((row) => {
                    let profit = row.price_change_percentage_24h >= 0;

                    return (
                      <tr
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
                        key={row.id}
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          <Link
                            to={`/coins/${row.id}`}
                            className="flex gap-15 items-center"
                          >
                            <div className="">
                              <img
                                src={row?.image}
                                alt={row.name}
                                width="50"
                                className="bg-green-00"
                              />
                            </div>
                            <div className="ml-5">
                              <h1 className="uppercase text-xl font-medium">
                                {row.symbol}
                              </h1>
                              <h1 className="font-light text-xs">{row.name}</h1>
                            </div>
                          </Link>
                        </th>
                        <td className="px-6 py-4">
                          <Link to={`/coins/${row.id}`}>
                            {symbol}{" "}
                            {numberWithCommas(row.current_price.toFixed(2))}
                          </Link>
                        </td>
                        <td
                          className="px-6 py-4"
                          style={{ color: profit ? "green" : "red" }}
                        >
                          <Link to={`/coins/${row.id}`}>
                            {profit && "+"}
                            {row.price_change_percentage_24h.toFixed(2)}%
                          </Link>
                        </td>
                        <td className="px-6 py-4">
                          <Link to={`/coins/${row.id}`}>
                            {symbol}{" "}
                            {numberWithCommas(
                              row.market_cap.toString().slice(0, -6)
                            )}
                            M
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <nav aria-label="Page navigation example">
              <ul className="flex items-center -space-x-px h-8 text-sm mb-4">
                <li>
                  <button
                    className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}`}
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <span className="sr-only">Previous</span>
                    <svg
                      className="w-2.5 h-2.5 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 1 1 5l4 4"
                      />
                    </svg>
                  </button>
                </li>
                {[...Array(totalPages)].map((_, index) => (
                  <li key={index}>
                    <button
                      className={`flex items-center justify-center px-3 h-8 leading-tight ${
                        currentPage === index + 1
                          ? "text-blue-600 bg-blue-50 border border-blue-300"
                          : "text-gray-500 bg-white border border-gray-300"
                      } hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                      onClick={() => paginate(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}`}
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <span className="sr-only">Next</span>
                    <svg
                      className="w-2.5 h-2.5 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </>
  );
};

export default CoinsTable;
