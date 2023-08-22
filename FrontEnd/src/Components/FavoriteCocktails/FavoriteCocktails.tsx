import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./favoriteCocktails.css";
import CocktailCard from "../CocktailCard/CocktailCard";
import { useUserContext } from "../../Contexts/UserContext";
import { useEffect, useState } from "react";
import { GetCocktailById } from "../../API/Api";
import Spinner from "../Spinner/Spinner";

export interface ICocktailCard {
  key: string;
  id: string;
  imageUrl: string;
  name: string;
}

const FavoriteCocktails = () => {
  const userContext = useUserContext();
  const [favoriteCocktails, setFavoriteCocktails] = useState(
    userContext.loggedInUser!.favoriteCocktails
  );
  const [cocktailCards, setCocktailCards] = useState<ICocktailCard[]>([]);

  useEffect(() => {
    const GetFavoriteCocktails = async () => {
      if (favoriteCocktails.length) {
        favoriteCocktails.map(async (cocktail) => {
          GetCocktailById(cocktail).then((res) => {
            setCocktailCards((cocktails) => [
              ...cocktails,
              {
                id: res.idDrink,
                imageUrl: res.strDrinkThumb,
                key: res.idDrink,
                name: res.strDrink,
              },
            ]);
          });
        });
      }
    };
    GetFavoriteCocktails();
  }, []);

  const GetCocktailCards = () => {
    if (favoriteCocktails.length == 0) {
      return (
        <div className="no-favorites-container">
          <h2>You don't have any favorite cocktails yet...</h2>
          <p>Start exploring and add your favorite cocktails to your list!</p>
          <button
            className="go-to-homepage-button"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            Back To Homepage &nbsp;
            <FontAwesomeIcon icon={["fas", "arrow-right"]} />
          </button>
        </div>
      );
    } else {
      return cocktailCards.map((cocktailCard) => {
        return (
          <CocktailCard
            {...cocktailCard}
            cocktailsSetter={setCocktailCards}
            favoriteCocktailsSetter={setFavoriteCocktails}
          ></CocktailCard>
        );
      });
    }
  };

  return (
    <div className="favorite-cocktails-comp">
      <h1 className="favorite-cocktails-headline">Your Favorite Cocktails</h1>
      <div className="favorite-cocktails-content-container">
        {GetCocktailCards()}
        <Spinner
          isLoading={
            favoriteCocktails.length != 0 &&
            cocktailCards.length != favoriteCocktails.length
          }
        ></Spinner>
      </div>
    </div>
  );
};

export default FavoriteCocktails;
