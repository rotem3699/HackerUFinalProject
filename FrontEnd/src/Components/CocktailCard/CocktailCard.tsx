import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ICocktailCardProps } from "../../API/Interfaces/Interfaces";
import { useUserContext } from "../../Contexts/UserContext";
import "./cocktailCard.css";
import { ICocktailCard } from "../FavoriteCocktails/FavoriteCocktails";

const CocktailCard = (props: ICocktailCardProps) => {
  const userContext = useUserContext();
  const GoToCocktailPage = () => {
    window.location.href = `/cocktail/${props.id}`;
  };

  const HandleFavoriteClick = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>,
    add: boolean,
    id: string
  ) => {
    event?.stopPropagation();
    if (add) {
      userContext.AddCocktailToFavorite(id);
    } else {
      userContext.RemoveCocktailFromFavorite(id);
      if (props.cocktailsSetter) {
        props.cocktailsSetter((prevState: ICocktailCard[]) =>
          prevState.filter((item) => item.id != id)
        );
      }
      if (props.favoriteCocktailsSetter) {
        props.favoriteCocktailsSetter((prevState: string[]) =>
          prevState.filter((item) => item != id)
        );
      }
    }
  };

  const GetFavoriteButton = () => {
    if (userContext.loggedInUser) {
      if (
        !userContext.loggedInUser.favoriteCocktails ||
        !userContext.loggedInUser.favoriteCocktails.includes(props.id)
      ) {
        return (
          <FontAwesomeIcon
            icon={["fas", "heart-circle-plus"]}
            className="favorite-drink-icon"
            onClick={(e) => HandleFavoriteClick(e, true, props.id)}
          />
        );
      } else {
        return (
          <FontAwesomeIcon
            icon={["fas", "heart-circle-minus"]}
            className="favorite-drink-icon"
            onClick={(e) => HandleFavoriteClick(e, false, props.id)}
          />
        );
      }
    }
  };
  return (
    <div onClick={() => GoToCocktailPage()} className="cocktail-card-container">
      <div className="single-similiar-cocktail-content">
        {GetFavoriteButton()}
        <img src={props.imageUrl} alt="" className="similiar-cocktails-img" />
        <h5 className="similiar-cocktails-name">{props.name}</h5>
      </div>
    </div>
  );
};

export default CocktailCard;
