import React from "react";
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";

interface DashboardModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  dialogTitle: string;
  children: React.ReactNode;
}
const DashboardModal = ({
  showModal,
  setShowModal,
  dialogTitle,
  children,
}: DashboardModalProps) => {
  return (
    <Transition
      show={showModal}
      enter="duration-200 ease-out"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="duration-300 ease-out"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Dialog
        open={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        className="relative z-50"
      >
        <div
          className="backdrop fixed inset-0 bg-black/30"
          aria-hidden="true"
        />
        <div
          className="fixed inset-0 flex w-screen items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <DialogPanel className="w-full max-w-md divide-y border bg-white">
            <DialogTitle className="px-6 pb-3 pt-6 text-3xl">
              {dialogTitle}
            </DialogTitle>
            <div className="p-6">{children}</div>
          </DialogPanel>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DashboardModal;
