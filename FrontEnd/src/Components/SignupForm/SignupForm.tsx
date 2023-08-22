import { useState } from "react";
import "./signupForm.css";
import popupCloseIcon from "../../images/popup-close-icon.png";
import { faL } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { SignIn } from "../../API/Api";
import {
  SignupFormProps,
  SignupFormValues,
} from "../../API/Interfaces/Interfaces";
import { useUserContext } from "../../Contexts/UserContext";

const emptySignupValues: SignupFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  profilePic: "",
};

const SignupForm: React.FC<SignupFormProps> = ({ togglePopup }) => {
  const [signupFormValues, setSignupFormValues] = useState(emptySignupValues);
  const [showMissingFieldMessage, setShowMissingFieldMessage] = useState(false);
  const [showShortPasswordMessage, setShowShortPasswordMessage] =
    useState(false);

  var userContext = useUserContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const lowerCaseValue = value.toLowerCase();
    setSignupFormValues((prevValues) => ({
      ...prevValues,
      [name]: lowerCaseValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      signupFormValues.firstName == "" ||
      signupFormValues.lastName == "" ||
      signupFormValues.email == "" ||
      signupFormValues.password == ""
    ) {
      setShowMissingFieldMessage(true);
    } else if (signupFormValues.password.length < 6) {
      setShowShortPasswordMessage(true);
    } else {
      setShowMissingFieldMessage(false);
      setShowShortPasswordMessage(false);
      try {
        const response = await axios.post(
          "http://localhost:5008/api/users/signup",
          signupFormValues,
          { withCredentials: true }
        );
        if (response.data) {
          // Handle the response from the server
          var userFromSignup = userContext.GetUserFromToken(response.data);
          if (userFromSignup) {
            userContext.login(userFromSignup);
            togglePopup();
          }
        }
      } catch (error) {
        console.error(error); // Handle any errors that occur during the request
      }
    }
  };

  return (
    <div className="signup-form-container">
      <div className="popup-headline-and-btn-container">
        <h1 className="popup-headline">Welcome!</h1>
        <button className="popup-close-btn" onClick={togglePopup}>
          <img className="popup-close-img" src={popupCloseIcon} alt="" />
        </button>
      </div>
      <h5 className="popup-h5">We Are Happy You Decided To Join Us</h5>

      <form onSubmit={handleSubmit}>
        <div className="all-form-container">
          <div className="form-sides-container">
            <div className="form-one-side-container">
              <div className="label-input-wrap">
                <label htmlFor="firstName">
                  <span className="signup-form-required-field">*</span>First
                  Name:
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={signupFormValues.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="label-input-wrap">
                <label htmlFor="lastName">
                  <span className="signup-form-required-field">*</span>Last
                  Name:
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={signupFormValues.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className="label-input-wrap">
                <label htmlFor="email">
                  <span className="signup-form-required-field">*</span>Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={signupFormValues.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-second-side-container">
              <div className="label-input-wrap">
                <label htmlFor="password">
                  <span className="signup-form-required-field">*</span>Password:
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={signupFormValues.password}
                  onChange={handleChange}
                />
                <div
                  className="signup-form-hidden-no-field-message"
                  style={{
                    display: showShortPasswordMessage ? "block" : "none",
                  }}
                >
                  <div>Password too short</div>
                </div>
              </div>
              <div className="form-second-side-container">
                <div className="label-input-wrap">
                  <label htmlFor="profilePic">Profile Picture Link:</label>
                  <input
                    type="text"
                    id="profilePic"
                    name="profilePic"
                    value={signupFormValues.profilePic}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="form-btn-container">
            <button type="submit" className="signup-form-submit-btn">
              Sign Up
            </button>
          </div>
          <div
            className="signup-form-hidden-no-field-message"
            style={{ display: showMissingFieldMessage ? "block" : "none" }}
          >
            <div>Oops! some fields are missing...</div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
