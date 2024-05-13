"use client";

import { useState } from "react";
import AccountForm from "../forms/AccountForm";
import DashboardSectionHeader from "./utils/DashboardSectionHeader";
import DashboardModal from "./utils/DashboardModal";

const ClientAccountsSection = ({ children }: { children: React.ReactNode }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="w-full flex-initial md:w-5/12">
      <DashboardSectionHeader
        title="Accounts"
        buttonText="add account"
        onClick={() => setShowModal(true)}
      />
      {children}
      <DashboardModal
        showModal={showModal}
        setShowModal={setShowModal}
        dialogTitle="Add an account"
      >
        <AccountForm setShowModal={setShowModal} />
      </DashboardModal>
    </section>
  );
};

export default ClientAccountsSection;
