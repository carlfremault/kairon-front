"use client";

import React, { useState } from "react";
import DashboardTableHeader from "./DashboardTableHeader";
import AccountForm from "../forms/AccountForm";
import DashboardModal from "./DashboardModal";

const AccountSection = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="w-full flex-initial md:w-5/12">
      <DashboardTableHeader
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
        <AccountForm />
      </DashboardModal>
    </section>
  );
};

export default AccountSection;
