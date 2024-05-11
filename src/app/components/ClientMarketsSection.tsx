"use client";

import { useState } from "react";
import MarketForm from "../forms/MarketForm";
import DashboardSectionHeader from "./utils/DashboardSectionHeader";
import DashboardModal from "./utils/DashboardModal";

const ClientMarketsSection = ({ children }: { children: React.ReactNode }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="w-full flex-initial md:w-7/12">
      <DashboardSectionHeader
        title="Markets"
        buttonText="add market"
        onClick={() => setShowModal(true)}
      />
      {children}
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

export default ClientMarketsSection;
