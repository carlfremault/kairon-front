"use client";

import React, { useState } from "react";
import DashboardSectionHeader from "./utils/DashboardSectionHeader";
import AccountForm from "../forms/AccountForm";
import DashboardModal from "./utils/DashboardModal";

const AccountSection = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="w-full flex-initial md:w-5/12">
      <DashboardSectionHeader
        title="Accounts"
        buttonText="add account"
        onClick={() => setShowModal(true)}
      />
      <div className="border border-sky-500">Here comes a table</div>
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

export default AccountSection;
