import React from "react";

interface FormFeedbackProps {
  children: React.ReactNode;
}

const FormFeedback = ({ children }: FormFeedbackProps) => {
  return <span className="text-xs text-red-400">{children}</span>;
};

export default FormFeedback;
