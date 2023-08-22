import { Dispatch, SetStateAction } from "react";
import { ICocktailCard } from "../../Components/FavoriteCocktails/FavoriteCocktails";

export interface SigninFormProps {
  setIsSignin: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  togglePopup: () => void;
}

export interface SigninFormValues {
  email: string;
  password: string;
}

export interface UserForTable {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface ILoggedInUser {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  profilePic: string;
  favoriteCocktails: string[];
}

export interface UserContextData {
  isLoggedIn: boolean;
  loggedInUser: ILoggedInUser | undefined;
  login: (user: ILoggedInUser) => void;
  GetUserFromToken: (data: string) => ILoggedInUser | undefined;
  logout: () => void;
  RemoveCocktailFromFavorite: (cocktailId: string) => void;
  AddCocktailToFavorite: (cocktailId: string) => void;
  openModal: (() => void) | undefined;
  setOpenModal: Dispatch<SetStateAction<(() => void) | undefined>>;
}

export interface IngredientsDictionary {
  [ingredient: string]: boolean;
}

export interface ICocktailCardProps {
  id: string;
  name: string;
  imageUrl: string;
  cocktailsSetter?: React.Dispatch<React.SetStateAction<ICocktailCard[]>>;
  favoriteCocktailsSetter?: Dispatch<SetStateAction<string[]>>;
}

export interface SignupFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profilePic: string;
}

export interface SignupFormProps {
  isOpen: boolean;
  togglePopup: () => void;
}
