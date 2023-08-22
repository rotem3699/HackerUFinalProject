import React from "react";
import "../Spinner/spinner.css";
import SpinnerImage from "../../images/cocktail-spinner.png";

export interface ISpinnerProps {
  isLoading: boolean;
}
const Spinner = (props: ISpinnerProps) => {
  return props.isLoading ? (
    <div className="spinner-overlay">
      <div className="spinner-container">
        <img src={SpinnerImage} />
        <div className="spinner"></div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Spinner;
