import React, { forwardRef } from "react";
import { Carousel } from "react-bootstrap";
import { ICocktailModel } from "../../Cocktail/ICocktail"; // Import your ICocktailModel type
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../CocktailsCarouselItem/cocktailsCarouselItem.css";

interface CocktailsCarouselItemProps {
  cocktail: ICocktailModel;
}

const CocktailsCarouselItem = forwardRef<
  HTMLDivElement,
  CocktailsCarouselItemProps
>((props, ref) => {
  const GoToCocktailPage = () => {
    window.location.href = `/cocktail/${props.cocktail.idDrink}`;
  };

  return (
    <Carousel.Item interval={1000}>
      <div ref={ref} className="recommended-carousel-item">
        <img
          className="item-hero"
          src={props.cocktail.strDrinkThumb}
          alt={props.cocktail.strDrink}
        />
        <div className="item-content">
          <h2>{props.cocktail.strDrink}</h2>
          <p>{props.cocktail.strInstructions}</p>
        </div>
        <div className="item-button-container">
          <button
            className="item-button btn btn-dark"
            onClick={GoToCocktailPage}
          >
            Go To Cocktail&nbsp;
            <FontAwesomeIcon icon={["fas", "arrow-right"]} />
          </button>
        </div>
      </div>
    </Carousel.Item>
  );
});

export default CocktailsCarouselItem;
