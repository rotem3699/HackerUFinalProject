import "./userProfileComp.css";
import profilePic from "../../images/profile-pic-example.jpg";
import { useUserContext } from "../../Contexts/UserContext";
import { capitalizeFirstLetter } from "../../Utils";

const UserProfileComp = () => {
  const userContext = useUserContext();
  const user = userContext.loggedInUser;

  if (user) {
    const firstNameCapitalized = capitalizeFirstLetter(user!.firstName);
    const lastNameCapitalized = capitalizeFirstLetter(user!.lastName);
    return (
      <div className="user-profile-comp-container">
        <div className="user-profile-img-container">
          <img
            className="user-profile-pic"
            src={user!.profilePic}
            alt="profile-pic"
          />
        </div>
        <div className="user-profile-full-details-container">
          <div className="user-profile-details-container">
            <p className="user-profile-comp-parameter">First Name:</p>
            <p className="user-profile-detail-p">{firstNameCapitalized}</p>
          </div>
          <div className="user-profile-details-container">
            <p className="user-profile-comp-parameter">Last Name:</p>
            <p className="user-profile-detail-p">{lastNameCapitalized}</p>
          </div>
          <div className="user-profile-details-container">
            <p className="user-profile-comp-parameter">Email:</p>
            <p className="user-profile-detail-p">{user?.email}</p>
          </div>
          <button
            className="user-page-log-out-btn"
            onClick={() => userContext.logout()}
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default UserProfileComp;
