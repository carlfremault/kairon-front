"use client";

import { useState } from "react";
import AccountsTable from "./AccountsTable";
import AccountForm from "../forms/AccountForm";
import DashboardSectionHeader from "./utils/DashboardSectionHeader";
import DashboardModal from "./utils/DashboardModal";

const AccountsSection = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="w-full flex-initial md:w-5/12">
      <DashboardSectionHeader
        title="Accounts"
        buttonText="add account"
        onClick={() => setShowModal(true)}
      />
      <AccountsTable />
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

export default AccountsSection;
