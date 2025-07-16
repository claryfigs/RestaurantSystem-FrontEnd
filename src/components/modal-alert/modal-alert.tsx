import React from "react";
import "./modal-alert.css";
import Button from "../Button/Button";

type ModalAlertProps = {
  isOpen: boolean;
  title: string;
  message: string;
  type: "success" | "error";
  onClose: () => void;
};

const ModalAlert: React.FC<ModalAlertProps> = ({
  isOpen,
  title,
  message,
  type,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-alert-overlay">
      <div className={`modal-alert-box ${type}`}>
        <div className="modal-alert-header">
          <h1 className="modal-alert-title">{title}</h1>
        </div>
        <div className="modal-alert-content">
          <p className="modal-alert-message">{message}</p>
        </div>
        <div className="modal-alert-buttons">
          <Button
            label="OK"
            variant={type === "success" ? "primary" : "secondary"}
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalAlert;
