import "./SingleCocktailComp.css";
import { ICocktailModel } from "../../Cocktail/ICocktail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUserContext } from "../../Contexts/UserContext";

interface singleCocktailProps {
  cocktail: ICocktailModel;
}

const SingleCocktailComp = (props: singleCocktailProps) => {
  const userContext = useUserContext();

  const GetFavoriteButton = () => {
    if (userContext.loggedInUser) {
      if (
        !userContext.loggedInUser.favoriteCocktails ||
        !userContext.loggedInUser.favoriteCocktails.includes(
          props.cocktail.idDrink
        )
      ) {
        return (
          <FontAwesomeIcon
            icon={["fas", "heart-circle-plus"]}
            className="favorite-drink-icon"
            onClick={() =>
              userContext.AddCocktailToFavorite(props.cocktail.idDrink)
            }
          />
        );
      } else {
        return (
          <FontAwesomeIcon
            icon={["fas", "heart-circle-minus"]}
            className="favorite-drink-icon"
            onClick={() =>
              userContext.RemoveCocktailFromFavorite(props.cocktail.idDrink)
            }
          />
        );
      }
    }
  };

  return (
    <div className="cocktail-comp-container">
      <img className="cocktail-img" src={props.cocktail.strDrinkThumb} alt="" />
      <div className="cocktail-info-container">
        <h1 className="single-cocktail-headline">
          {props.cocktail.strDrink}
          <span className="span-favorite-icon">{GetFavoriteButton()}</span>
        </h1>
        <h5 className="single-cocktail-content">
          Category: {props.cocktail.strCategory} , {props.cocktail.strAlcoholic}
        </h5>
        <h6 className="single-cocktail-content">
          Best Glass For Experience: {props.cocktail.strGlass}
        </h6>
        <h3 className="single-cocktail-headline">How To Make:</h3>
        <p className="cocktail-description">{props.cocktail.strInstructions}</p>
        <h5 className="single-cocktail-ingredients-headline single-cocktail-headline">
          Ingredients:
        </h5>
        <ul className="cocktail-ingredients-list">
          {props.cocktail.ingredients.map((ingredient, index) => (
            <li key={index}>
              {props.cocktail.measurements[index]} {ingredient}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SingleCocktailComp;
