import { useState } from "react";
import "./signinForm.css";
import popupCloseIcon from "../../images/popup-close-icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUserContext } from "../../Contexts/UserContext";
import {
  SigninFormProps,
  SigninFormValues,
} from "../../API/Interfaces/Interfaces";
import { SignIn } from "../../API/Api";

const SigninForm = (props: SigninFormProps) => {
  const [signinFormValues, setSigninFormValues] = useState<SigninFormValues>({
    email: "",
    password: "",
  });

  const [showPasswordMessage, setShowPasswordMessage] = useState(false);
  const [showEmailMessage, setShowEmailMessage] = useState(false);
  const [showPasswordAndEmailMessage, setShowPasswordAndEmailMessage] =
    useState(false);

  const [is404, setIs404] = useState(false);

  //functions:
  const handleSigninChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSigninFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  var userContext = useUserContext();

  const handleSigninSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signinFormValues.password == "" && signinFormValues.email == "") {
      setShowPasswordMessage(false);
      setShowEmailMessage(false);
      setShowPasswordAndEmailMessage(true);
      setIs404(false);
    } else if (signinFormValues.email == "") {
      setShowEmailMessage(true);
      setShowPasswordMessage(false);
      setShowPasswordAndEmailMessage(false);
      setIs404(false);
    } else if (signinFormValues.password == "") {
      setShowPasswordMessage(true);
      setShowEmailMessage(false);
      setShowPasswordAndEmailMessage(false);
      setIs404(false);
    } else {
      setShowPasswordMessage(false);
      setShowEmailMessage(false);
      setShowPasswordAndEmailMessage(false);
      handleUserSignin();
    }
  };

  function handleUserNotFound() {
    setIs404(true);
  }

  const handleUserSignin = async () => {
    var userToLogin = await SignIn(signinFormValues);
    if (userToLogin) {
      userContext.login(userToLogin);
      props.togglePopup();
    } else {
      handleUserNotFound();
    }
  };

  return (
    <div className="signin-form-container">
      <div className="popup-headline-and-btn-container">
        <h1 className="popup-headline">Welcome Back!</h1>
        <button className="popup-close-btn" onClick={props.togglePopup}>
          <img className="popup-close-img" src={popupCloseIcon} alt="" />
        </button>
      </div>
      <h5 className="popup-h5" id="signin-h5">
        Please Sign In
      </h5>
      <form onSubmit={handleSigninSubmit}>
        <div className="signin-form-container">
          <div className="field-and-hidden-no-field-message-container">
            <div className="form-user-details-container">
              <div className="field-and-hidden-no-field-message">
                <div className="label-input-wrap">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={signinFormValues.email}
                    onChange={handleSigninChange}
                  />
                </div>
                <div
                  className="hidden-no-field-message"
                  style={{ display: showEmailMessage ? "block" : "none" }}
                >
                  <p>email required</p>
                </div>
              </div>
              <div className="field-and-hidden-no-field-message">
                <div className="label-input-wrap">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={signinFormValues.password}
                    onChange={handleSigninChange}
                  />
                </div>
                <div
                  className="hidden-no-field-message"
                  style={{ display: showPasswordMessage ? "block" : "none" }}
                >
                  <p>password required</p>
                </div>
              </div>
            </div>
            <div
              className="hidden-no-field-message"
              id="no-email-and-password-message"
              style={{
                display: showPasswordAndEmailMessage ? "block" : "none",
              }}
            >
              <p>email and password required</p>
            </div>
          </div>
          <div className="signin-form-btn-container">
            <button type="submit" className="signin-form-submit-btn">
              Sign In
            </button>
          </div>
        </div>
      </form>
      {!is404 ? (
        <h3 className="signin-form-h3">Or</h3>
      ) : (
        <h5 id="user-not-found-message">
          <span id="wrong-user-details-meassge">
            {" "}
            wrong password or email..{" "}
          </span>
          <br></br> but no worries! you can always...
          <FontAwesomeIcon icon={["fas", "arrow-turn-down"]} />
        </h5>
      )}
      <button
        className="signin-form-go-to-signup"
        onClick={() => {
          props.setIsSignin(false);
        }}
      >
        Sign Up Here
      </button>
    </div>
  );
};

export default SigninForm;
