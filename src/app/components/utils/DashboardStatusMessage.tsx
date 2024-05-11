import React from "react";

const DashboardStatusMessage = ({ statusText }: { statusText: string }) => {
  return (
    <p className="mt-20 w-full border border-dark-grey bg-light-grey py-20 text-center text-xl">
      {statusText}
    </p>
  );
};

export default DashboardStatusMessage;
