import React from "react";
import { Button } from "@headlessui/react";
import AddIcon from "../svg/AddIcon";

interface TableHeaderProps {
  title: string;
  buttonText: string;
  onClick: () => void;
}

const DashboardTableHeader = ({
  title,
  buttonText,
  onClick,
}: TableHeaderProps) => {
  return (
    <div className="my-2 flex flex-row items-center justify-between">
      {title}
      <Button
        className="data-[active]:bg-kairon-green-active data-[hover]:bg-kairon-green-hover flex flex-row items-center justify-center gap-2 rounded-lg bg-kairon-green p-2 text-sm text-white"
        onClick={onClick}
      >
        <AddIcon />
        {buttonText}
      </Button>
    </div>
  );
};

export default DashboardTableHeader;
