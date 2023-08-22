import { UserContextData } from "./Interfaces";

export const initialContextData: UserContextData = {
  isLoggedIn: false,
  loggedInUser: undefined,
  login: () => {},
  logout: () => {},
  GetUserFromToken: () => undefined,
  AddCocktailToFavorite: () => {},
  RemoveCocktailFromFavorite: () => {},
  openModal: () => {},
  setOpenModal: () => {},
};
