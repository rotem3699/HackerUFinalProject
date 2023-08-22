import UserProfileComp from "../../Components/UserProfileComp/UserProfileComp";
import FavoriteCocktails from "../../Components/FavoriteCocktails/FavoriteCocktails";
import "./userProfilePage.css";
import { useUserContext } from "../../Contexts/UserContext";
import AdminUsersTable from "../../Components/AdminUsersTable/AdminUsersTable";

const UserProfilePage = () => {
  const userContext = useUserContext();

  const GetAdminUsersTable = () => {
    if (userContext.loggedInUser?.role == "admin") {
      return <AdminUsersTable></AdminUsersTable>;
    }
  };

  if (userContext.isLoggedIn) {
    return (
      <div className="user-profile-page-container">
        <UserProfileComp></UserProfileComp>
        <FavoriteCocktails></FavoriteCocktails>
        {GetAdminUsersTable()}
      </div>
    );
  } else {
    return (
      <div className="unauthorized-div">
        Oops! Looks like you're not a user.<br></br> sign up or sign in please
        and try again.
      </div>
    );
  }
};

export default UserProfilePage;
