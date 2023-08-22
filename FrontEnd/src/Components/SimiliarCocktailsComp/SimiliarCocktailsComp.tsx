import "./similiarCocktailsComp.css";
import { ICocktail, ICocktailModel } from "../../Cocktail/ICocktail";
import CocktailCard from "../CocktailCard/CocktailCard";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { GetSimiliarCocktails } from "../../API/Api";
import { ConvertCocktailToModel } from "../../Utils";

export interface ISimilarCocktailProps {
  loadingSetter: Dispatch<SetStateAction<boolean>>;
  cocktail: ICocktailModel;
}
const SimiliarCocktailsComp = (props: ISimilarCocktailProps) => {
  const [similarCocktails, setSimilarcocktails] = useState<ICocktailModel[]>(
    []
  );

  useEffect(() => {
    const GetSimilarSuggestions = async () => {
      await GetSimiliarCocktails(props.cocktail.ingredients[0]).then((res) => {
        setSimilarcocktails(ConvertCocktailToModel(res));
        if (props.loadingSetter != undefined) {
          props.loadingSetter(true);
        }
      });
    };

    GetSimilarSuggestions();
  }, []);

  const GetCocktailCards = () => {
    if (similarCocktails.length == 0) {
      return <></>;
    } else {
      return similarCocktails.map((cocktail) => {
        return (
          <CocktailCard
            id={cocktail.idDrink}
            imageUrl={cocktail.strDrinkThumb}
            name={cocktail.strDrink}
            key={`similarCocktail-${cocktail.idDrink}`}
          ></CocktailCard>
        );
      });
    }
  };

  return (
    <div className="similiar-cocktails-comp">
      <h1>You May Also Like:</h1>
      <div className="similiar-cocktails-container">{GetCocktailCards()}</div>
    </div>
  );
};

export default SimiliarCocktailsComp;
