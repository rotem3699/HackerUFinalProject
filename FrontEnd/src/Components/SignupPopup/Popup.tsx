import React, { useState } from "react";
import "./popup.css";
import Modal from "react-modal";
import "../SignupForm/SignupForm";
import SignupForm from "../SignupForm/SignupForm";
import SigninForm from "../SigninForm/SigninForm";
import { Styles } from "react-modal";

interface PopupProps {
  isOpen: boolean;
  isSignin: boolean;
  togglePopup: () => void;
  setIsSignin: React.Dispatch<React.SetStateAction<boolean>>;
}

const Popup: React.FC<PopupProps> = ({
  isOpen,
  togglePopup,
  isSignin,
  setIsSignin,
}) => {
  const customStyles: Styles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    content: {
      backgroundColor: "#ffffff",
    },
  };

  return (
    <Modal
      id={"react-modal-style"}
      isOpen={isOpen}
      onRequestClose={togglePopup}
      style={customStyles}
    >
      {isSignin ? (
        <SigninForm
          isOpen={isOpen}
          togglePopup={togglePopup}
          setIsSignin={setIsSignin}
        ></SigninForm>
      ) : (
        <SignupForm isOpen={isOpen} togglePopup={togglePopup}></SignupForm>
      )}
    </Modal>
  );
};

export default Popup;
