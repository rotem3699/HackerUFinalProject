import "./Header.css";
import mainLogo from "../../images/main-logo.png";
import profilePic from "../../images/profile-pic-example.jpg";
import { useEffect, useState } from "react";
import Popup from "../SignupPopup/Popup";
import { useUserContext } from "../../Contexts/UserContext";
import { capitalizeFirstLetter } from "../../Utils";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignin, setIsSignin] = useState(true);
  const userContext = useUserContext();
  const userFirstName = userContext.loggedInUser?.firstName;
  const [animationState, setAnimationState] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const capitalizedName = capitalizeFirstLetter(userFirstName!);

  useEffect(() => {
    if (userContext) {
      userContext.setOpenModal(() => OpenSignUpModal);
    }
  }, []);

  const OpenSignUpModal = () => {
    setIsSignin(false);
    setIsOpen(true);
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const goToHomepage = () => {
    window.location.href = "/";
  };

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const openMobileMenu = () => {
    // setAnimationState(!animationState);
    // setMobileMenuOpen(!mobileMenuOpen);
    // setTimeout(() => {
    //   setAnimationState(!animationState);
    // }, 1000);
    setMobileMenuOpen(true);

    // setTimeout(()=> {
    //   setAnimationState(true);
    // },500)
  };

  const closeMobileMenu = () => {
    setAnimationState(true);
    setTimeout(() => {
      setMobileMenuOpen(false);
      setAnimationState(false);
    }, 500);
  };

  const HandleSignOut = async () => {
    await userContext.logout();
    window.location.reload();
  };

  return (
    <>
      <div className="header-comp">
        <div className="header-links-container hide-on-mobile">
          <img
            className="header-logo"
            src={mainLogo}
            alt="website-logo"
            onClick={goToHomepage}
            height="150px"
            width="150px"
          />
          <a className="header-link" href="/about-us">
            About Us
          </a>
          <a className="header-link" href="/contact-us">
            Contact Us
          </a>
          <a className="header-link" href="/cocktail-generator">
            Cocktail Generator
          </a>
        </div>
        <div className="user-display-container hide-on-mobile">
          {userContext.isLoggedIn ? (
            <div className="header-user-logged-in-content">
              <p className="header-user-hello">Hello, {capitalizedName}</p>
              <img
                className="profile-pic"
                src={userContext.loggedInUser?.profilePic}
                alt=""
                onClick={() => {
                  window.location.href = "/user-profile";
                }}
              />
              <button
                className="header-signout-btn hide-on-tablet"
                onClick={() => userContext.logout()}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <>
              <button
                className="header-sign-link"
                onClick={() => {
                  togglePopup();
                  setIsSignin(false);
                }}
              >
                Sign Up
              </button>
              <Popup
                isOpen={isOpen}
                togglePopup={togglePopup}
                isSignin={isSignin}
                setIsSignin={setIsSignin}
              />
              <span className="header-sign-link ">|</span>
              <button
                className="header-sign-link "
                onClick={() => {
                  togglePopup();
                  setIsSignin(true);
                }}
              >
                Sign In
              </button>
            </>
          )}
        </div>
        <div className="mobile-header-container hide-on-desktop">
          <div
            className={`mobile-burger-icon`}
            onClick={() => openMobileMenu()}
          >
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
          {/* {mobileMenuOpen && (
          <div className="mobile-opens-menu">
            <div className="mobile-header-wrapper">
              <div className="mobile-header-content-container">
                <div className="mobile-links-container">
                  <a className="header-link" href="/about-us">
                    About Us
                  </a>
                  <a className="header-link" href="/contact-us">
                    Contact Us
                  </a>
                  <a className="header-link" href="/cocktail-generator">
                    Cocktail Generator
                  </a>
                </div>
                <div
                  className="menu-open-burger-container"
                  onClick={() => toggleMenu()}
                >
                  <div className="bar"></div>
                  <div className="bar"></div>
                  <div className="bar"></div>
                </div>
              </div>
            </div>
          </div>
        )} */}
          <img
            className="mobile-header-logo"
            src={mainLogo}
            alt="main-logo"
            onClick={() => (window.location.href = "/")}
          />
          <div className="mobile-header-user-display">
            {userContext.isLoggedIn ? (
              <div className="header-user-logged-in-content">
                <img
                  className="profile-pic"
                  src={userContext.loggedInUser?.profilePic}
                  alt="user-profile-picture"
                  onClick={() => {
                    window.location.href = "/user-profile";
                  }}
                />
                <button
                  className="header-signout-btn hide-on-tablet"
                  onClick={() => userContext.logout()}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <>
                <button
                  className="header-sign-link"
                  onClick={() => {
                    togglePopup();
                    setIsSignin(false);
                  }}
                >
                  Sign Up
                </button>
                <Popup
                  isOpen={isOpen}
                  togglePopup={togglePopup}
                  isSignin={isSignin}
                  setIsSignin={setIsSignin}
                />
                <span className="header-sign-link ">|</span>
                <button
                  className="header-sign-link "
                  onClick={() => {
                    togglePopup();
                    setIsSignin(true);
                  }}
                >
                  Sign In
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay">
          <div
            className={`mobile-menu-container ${
              animationState ? "slide-out-element" : "slide-in-element"
            }`}
          >
            <div
              className="menu-open-burger-container"
              onClick={() => closeMobileMenu()}
            >
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
            <div className="mobile-links-container">
              <a className="header-link" href="/about-us">
                About Us
              </a>
              <a className="header-link" href="/contact-us">
                Contact Us
              </a>
              <a className="header-link " href="/cocktail-generator">
                Cocktail Generator
              </a>
              <div className="logout-container">
                <a
                  style={{
                    display: userContext.loggedInUser ? "block" : "none",
                  }}
                  className="header-logout header-link"
                  href="/#"
                  target="_self"
                  onClick={() => HandleSignOut()}
                >
                  Sign Out
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
