import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { UserContextData, ILoggedInUser } from "../API/Interfaces/Interfaces";
import { initialContextData } from "../API/Interfaces/InitialValues";
import axios from "axios";
import { CheckAuth, SignOut, UpdateUserFavoriteCocktails } from "../API/Api";
import Cookies from "js-cookie";
import { decodeToken } from "react-jwt";

// Create the Context
const UserContext = createContext<UserContextData>(initialContextData);

export const useUserContext = () => useContext(UserContext);

// Define the type for the 'AuthProvider' component props
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loggedInUser, setLoggedInUser] = useState<ILoggedInUser | undefined>();
  const [openModal, setOpenModal] = useState<() => void | undefined>();

  useEffect(() => {
    // When the AuthProvider mounts, check if the user is already authenticated
    CheckAuthentication();
  }, []);

  const login = (user: ILoggedInUser) => {
    // Your login logic here, setting isLoggedIn to true
    setIsLoggedIn(true);
    setLoggedInUser(user);
  };

  const logout = async () => {
    var logoutResult = await SignOut();
    if (logoutResult?.data.success) {
      Cookies.remove("token");
      setIsLoggedIn(false);
      setLoggedInUser(undefined);
      //   Cookies.remove("token");
    } else {
      alert("Error while loggin out. Please try again in a moment.");
    }
    // TODO redirect to main page, refresh
  };

  const GetUserFromToken = (data: any) => {
    const token = data.token;

    // // Store the token in a cookie called 'token'
    const decodedUserData = decodeToken(token) as ILoggedInUser;

    var result: ILoggedInUser | undefined = undefined;

    if (decodedUserData) {
      result = {
        firstName: decodedUserData.firstName,
        lastName: decodedUserData.lastName,
        email: decodedUserData.email,
        role: decodedUserData.role,
        profilePic: decodedUserData.profilePic,
        favoriteCocktails: decodedUserData.favoriteCocktails,
      };
    }

    return result;
  };

  const GetUserFromCookie = (cookie: any) => {
    const decodedUserData = decodeToken(cookie) as ILoggedInUser;

    var result: ILoggedInUser | undefined = undefined;

    if (decodedUserData) {
      result = {
        firstName: decodedUserData.firstName,
        lastName: decodedUserData.lastName,
        email: decodedUserData.email,
        role: decodedUserData.role,
        profilePic: decodedUserData.profilePic,
        favoriteCocktails: decodedUserData.favoriteCocktails,
      };
    }

    return result;
  };

  const CheckAuthentication = async () => {
    try {
      var cookie = Cookies.get("token");
      if (cookie) {
        var cookieUser = GetUserFromCookie(cookie);
        if (!loggedInUser && cookieUser) {
          setIsLoggedIn(true);
          if (!cookieUser.favoriteCocktails) {
            cookieUser.favoriteCocktails = [];
          }
          setLoggedInUser(cookieUser);
          return;
        }
      }
      const response = await CheckAuth();

      if (response != null) {
        // If the user is authenticated, update the state and set the loggedInUser
        if (!loggedInUser) {
          setIsLoggedIn(true);
          var user: ILoggedInUser = response.data.user;
          if (!user.favoriteCocktails) {
            user.favoriteCocktails = [];
          }
          setLoggedInUser(user);
        }
      }
    } catch (error) {
      // If the user is not authenticated or an error occurs, set the state accordingly
      setIsLoggedIn(false);
      setLoggedInUser(undefined);
    }
  };

  // Function to add a cocktail ID to the favoriteCocktails array
  const AddCocktailToFavorite = async (cocktailId: string) => {
    if (loggedInUser) {
      if (!loggedInUser.favoriteCocktails.includes(cocktailId)) {
        var newFavoriteCocktails = loggedInUser.favoriteCocktails;
        newFavoriteCocktails.push(cocktailId);
        await UpdateUserFavoriteCocktails(
          loggedInUser.email,
          newFavoriteCocktails
        ).then((res) => {
          if (res) {
            var newUser = GetUserFromToken(res.data);

            setLoggedInUser((prevUser) => ({
              ...prevUser!,
              favoriteCocktails: newUser?.favoriteCocktails!,
            }));
          }
        });
      } else {
        console.log("Cocktail already in favorites.");
      }
    }
  };

  // Function to remove a cocktail ID from the favoriteCocktails array
  const RemoveCocktailFromFavorite = async (cocktailId: string) => {
    if (loggedInUser) {
      if (loggedInUser.favoriteCocktails.includes(cocktailId)) {
        var newFavoriteCocktails = loggedInUser.favoriteCocktails;
        newFavoriteCocktails = newFavoriteCocktails.filter(
          (item) => item != cocktailId
        );
        await UpdateUserFavoriteCocktails(
          loggedInUser.email,
          newFavoriteCocktails
        ).then((res) => {
          if (res) {
            var newUser = GetUserFromToken(res.data);
            if (!newUser) {
              return;
            }
            if (
              !newUser.favoriteCocktails ||
              !newUser.favoriteCocktails.length
            ) {
              newUser!.favoriteCocktails = [];
            }
            setLoggedInUser((prevUser) => ({
              ...prevUser!,
              favoriteCocktails: newUser?.favoriteCocktails!,
            }));
          }
        });
      } else {
        console.log("Cocktail not found in favorites.");
      }
    }
  };

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        loggedInUser,
        login,
        logout,
        GetUserFromToken,
        RemoveCocktailFromFavorite,
        AddCocktailToFavorite,
        openModal,
        setOpenModal,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
