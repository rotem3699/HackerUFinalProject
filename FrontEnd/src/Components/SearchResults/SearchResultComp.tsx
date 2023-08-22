import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./searchResultComp.css";
import { ICocktailModel } from "../../Cocktail/ICocktail";

const SearchResultComp = (props: ICocktailModel) => {
  return (
    <div className="search-result-comp-container">
      <div className="search-result-img-container">
        <img
          className="search-result-img"
          src={`${props.strDrinkThumb}`}
          alt="search-result-img"
        />
      </div>
      <div className="search-result-content-container">
        <h1 className="search-result-headline">{props.strDrink}</h1>
        <h6 className="hide-on-mobile">Best Glass: {props.strGlass}</h6>
        <h6 className="hide-on-mobile">Type: {props.strAlcoholic}</h6>
        <h6 className="hide-on-mobile">Category: {props.strCategory}</h6>
      </div>
      <div className="search-result-link-container">
        <a href={`/cocktail/${props.idDrink}`} className="search-result-link">
          Go To Cocktail <FontAwesomeIcon icon={["fas", "right-long"]} />
        </a>
      </div>
    </div>
  );
};

export default SearchResultComp;
