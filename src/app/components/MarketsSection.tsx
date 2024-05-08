"use client";

import { useState } from "react";
import DashboardSectionHeader from "./utils/DashboardSectionHeader";
import MarketForm from "../forms/MarketForm";
import DashboardModal from "./utils/DashboardModal";
import MarketsTable from "./MarketsTable";

const MarketsSection = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="w-full flex-initial md:w-7/12">
      <DashboardSectionHeader
        title="Markets"
        buttonText="add market"
        onClick={() => setShowModal(true)}
      />
      <MarketsTable />
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

export default MarketsSection;
