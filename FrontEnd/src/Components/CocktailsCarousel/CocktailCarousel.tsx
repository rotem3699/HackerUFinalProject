import "./CocktailCarousel.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { GetRandomCocktail } from "../../API/Api";
import { ConvertCocktailToModel } from "../../Utils";
import { ICocktailModel } from "../../Cocktail/ICocktail";
import CocktailsCarouselItem from "../CocktailsCarouselItem/CocktailsCarouselItem";

const CocktailCarousel = () => {
  const [cocktails, setCocktails] = useState<ICocktailModel[]>([]);
  const [cocktailsToDisplay, setCocktailsToDisplay] = useState(3);
  const goToSingleCocktailPage = () => {
    window.location.href = "/SingleCocktailPage";
  };

  useEffect(() => {
    const GetRandomCocktailsBunch = async (num: number) => {
      for (var i = 0; i < cocktailsToDisplay; i++) {
        await GetRandomCocktail().then((cocktail) => {
          var convertedCocktail = ConvertCocktailToModel([cocktail])[0];
          setCocktails((prevCocktails) => [
            ...prevCocktails,
            convertedCocktail,
          ]);
        });
      }
    };
    GetRandomCocktailsBunch(cocktailsToDisplay);
  }, []);

  const CarouselItem = (cocktail: ICocktailModel) => {
    return (
      <Carousel.Item
        className="carousel-item-container"
        key={`carouselItem-${cocktail.idDrink}`}
      >
        <div className="recommended-carousel-item">
          <img
            className="item-hero"
            src={cocktail.strDrinkThumb}
            alt={cocktail.strDrink}
          />
          <div className="item-content">
            <h2>{cocktail.strDrink}</h2>
            <p className="hide-on-mobile">
              {cocktail.strInstructions!.length > 150 ? (
                <>
                  {cocktail.strInstructions?.slice(0, 150) + "... "}
                  {
                    <a
                      className="read-more-link"
                      href={`/cocktail/${cocktail.idDrink}`}
                    >
                      Read More!
                    </a>
                  }
                </>
              ) : (
                <>{cocktail.strInstructions}</>
              )}
            </p>
          </div>
          <div className="item-button-container">
            <button
              className="item-button btn btn-dark"
              onClick={() =>
                (window.location.href = `/cocktail/${cocktail.idDrink}`)
              }
            >
              Go To Cocktail&nbsp;
              <FontAwesomeIcon icon={["fas", "arrow-right"]} />
            </button>
          </div>
        </div>
      </Carousel.Item>
    );
  };

  const GetCarouselItem = () => {
    return cocktails.map((cocktail) => {
      return CarouselItem(cocktail);
    });
  };

  return (
    <div id="recommended-carousel-container">
      {cocktails.length != cocktailsToDisplay ? (
        <h1>loading</h1>
      ) : (
        <Carousel className="recommended-carousel">
          {GetCarouselItem()}
        </Carousel>
      )}
    </div>
  );
};

export default CocktailCarousel;
