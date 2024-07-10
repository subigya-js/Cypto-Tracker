import React from "react";
import Banner from "../components/Banner/Banner";
import CoinsTable from "../components/CoinsTable";

const HomePage = () => {
  return (
    <div className="min-h-[91vh]">
      <Banner />
      <CoinsTable />
    </div>
  );
};

export default HomePage;
