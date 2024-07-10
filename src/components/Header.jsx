import React from "react";
import { Link } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

const Header = () => {
  const { currency, setCurrency } = CryptoState();

  console.log(currency);

  return (
    <div className="bg-gray-800 static flex justify-between px-4 md:px-12 h-[8vh] items-center">
      <Link to="/" className="text-blue-400 text-2xl font-semibold">
        CryptoTracker
      </Link>

      <select
        name="currency"
        className="outline-none p-1 text-green-400 bg-gray-800 border border-green-300 rounded-md"
        onChange={(event) => setCurrency(event.target.value)}
      >
        <option value={"INR"}>INR</option>
        <option value={"USD"}>USD</option>
      </select>
    </div>
  );
};

export default Header;
