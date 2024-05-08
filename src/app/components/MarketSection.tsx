"use client";

import React, { useState } from "react";
import DashboardTableHeader from "./DashboardTableHeader";
import MarketForm from "../forms/MarketForm";
import DashboardModal from "./DashboardModal";

const MarketSection = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="w-full flex-initial md:w-7/12">
      <DashboardTableHeader
        title="Markets"
        buttonText="add market"
        onClick={() => setShowModal(true)}
      />
      <div className="border border-sky-500">Here comes a table</div>
      <DashboardModal
        showModal={showModal}
        setShowModal={setShowModal}
        dialogTitle="Add a market"
      >
        <MarketForm />
      </DashboardModal>
    </section>
  );
};

export default MarketSection;
