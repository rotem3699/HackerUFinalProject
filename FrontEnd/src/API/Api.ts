import axios from "axios";
import { ICocktail, ICocktailModel } from "../Cocktail/ICocktail";
import { ILoggedInUser, SigninFormValues } from "./Interfaces/Interfaces";
import Cookies from "js-cookie";
import { decodeToken } from "react-jwt";
import { rejects } from "assert";
import { ObjectId } from "mongoose";

// Auth
export async function CheckAuth() {
  try {
    return await axios.get("http://localhost:5008/api/users/check-auth", {
      withCredentials: true,
    });
  } catch (err) {
    console.log(err);
  }
}

export async function SignOut() {
  try {
    return await axios.post("http://localhost:5008/api/users/log-out", {
      withCredentials: true,
    });
  } catch (err) {
    console.log(err);
  }
}

export async function UpdateUserFavoriteCocktails(
  email: string,
  favoriteCocktails: string[]
) {
  try {
    return await axios.post(
      "http://localhost:5008/api/users/update-cocktails",
      { email: email, favoriteCocktails: favoriteCocktails },
      {
        withCredentials: true,
      }
    );
  } catch (err) {
    console.log(err);
  }
}

export async function SignIn(
  signInValue: SigninFormValues
): Promise<ILoggedInUser | undefined> {
  try {
    const response = await axios.post(
      "http://localhost:5008/api/users/signin",
      signInValue,
      { withCredentials: true }
    );

    const { token } = response.data;

    // // Store the token in a cookie called 'token'
    // Cookies.set("token", token);

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
  } catch (err) {
    console.log(err);
  }
}

export async function GetAllUsers() {
  try {
    const response = await axios.get(
      "http://localhost:5008/api/users/get-all-users"
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function DeleteUser(id: string) {
  try {
    await axios.delete(`http://localhost:5008/api/users/delete-user?id=${id}`);
  } catch (err) {
    console.log(err);
  }
}

export async function UpdateUserRole(id: string, role: string) {
  let url = `http://localhost:5008/api/users/update-user-role?id=${id}&role=${role}`;

  try {
    await axios.put(url);
  } catch (err) {
    console.log(err);
  }
}

//Cocktails
export async function GetRandomCocktail(): Promise<ICocktail> {
  return new Promise<ICocktail>((resolve, reject) => {
    axios
      .get("https://www.thecocktaildb.com/api/json/v1/1/random.php")
      .then((res: any) => {
        resolve(res.data.drinks[0]);
      })
      .catch((error: Error) => {
        reject(error);
      });
  });
}

export async function GetCocktailById(id: string): Promise<ICocktail> {
  return new Promise<ICocktail>((resolve, reject) => {
    axios
      .get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res: any) => {
        resolve(res.data.drinks[0]);
      })
      .catch((error: Error) => {
        reject(error);
      });
  });
}

export async function GetAllCocktails() {
  return new Promise<ICocktail[]>((resolve, reject) => {
    axios
      .get("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=")
      .then((res: any) => {
        resolve(res.data.drinks);
      })
      .catch((error: Error) => {
        reject(error);
      });
  });
}

export async function SearchCocktails(searchTerm: string) {
  return new Promise<ICocktail[]>((resolve, reject) => {
    axios
      .get(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`
      )
      .then((res: any) => {
        resolve(res.data.drinks);
      })
      .catch((error: Error) => {
        reject(error);
      });
  });
}

export async function GetSimiliarCocktails(ingredient: string) {
  return new Promise<ICocktail[]>((resolve, reject) => {
    axios
      .get(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`
      )
      .then((res: any) => {
        resolve(res.data.drinks);
      })
      .catch((error: Error) => {
        reject(error);
      });
  });
}
