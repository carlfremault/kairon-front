"use client";

import React, { useState } from "react";
import DashboardSectionHeader from "./utils/DashboardSectionHeader";
import MarketForm from "../forms/MarketForm";
import DashboardModal from "./utils/DashboardModal";

const MarketSection = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="w-full flex-initial md:w-7/12">
      <DashboardSectionHeader
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
        <MarketForm setShowModal={setShowModal} />
      </DashboardModal>
    </section>
  );
};

export default MarketSection;
