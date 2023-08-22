import { GetAllCocktails } from "../../API/Api";
import { IngredientsDictionary } from "../../API/Interfaces/Interfaces";
import { ICocktail, ICocktailModel } from "../../Cocktail/ICocktail";
import { ConvertCocktailToModel, GetAllIngredients } from "../../Utils";
import CocktailCard from "../CocktailCard/CocktailCard";
import "../CocktailGenerator/cocktailGenerator.css";

import React, { useEffect, useState } from "react";
import Spinner from "../Spinner/Spinner";

const CocktailGenerator = () => {
  const [cocktails, setCocktails] = useState<ICocktailModel[]>();
  const [ingredients, setIngredients] = useState<IngredientsDictionary>({});
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (cocktails) {
      setInit(true);
    }
  }, [cocktails]);

  useEffect(() => {
    const GetCocktails = async () => {
      const allCocktails = await GetAllCocktails();
      if (allCocktails) {
        var cocktailsFormated = ConvertCocktailToModel(allCocktails);
        var allIngredients = GetAllIngredients(cocktailsFormated);
        setCocktails(cocktailsFormated);
        setIngredients(allIngredients);
      }
    };

    GetCocktails().catch(console.error);
  }, []);

  const handleCheckboxChange = (ingredient: string) => {
    setIngredients((prevIngredients) => ({
      ...prevIngredients,
      [ingredient]: !prevIngredients[ingredient], // Toggle the boolean value
    }));
  };

  const ResetIngredientFilters = () => {
    const updatedDictionary: IngredientsDictionary = {};

    // Set all ingredients to false in the updated dictionary
    Object.keys(ingredients).forEach((ingredient) => {
      updatedDictionary[ingredient] = false;
    });

    setIngredients(updatedDictionary);
  };

  const GetCheckboxes = () => {
    return Object.keys(ingredients).map((ingredient, index) => {
      return (
        <div className="checkbox-container" key={`ingredient-${index}`}>
          <input
            type="checkbox"
            id={`${ingredient}-checkbox`}
            key={`${ingredient}-${index}`}
            checked={ingredients[ingredient]}
            onChange={() => handleCheckboxChange(ingredient)}
          ></input>
          <label className="prevent-select" htmlFor={`${ingredient}-checkbox`}>
            {ingredient}
          </label>
        </div>
      );
    });
  };

  const GetCocktails = () => {
    var filteredCocktails = cocktails?.filter((cocktail) =>
      cocktail.ingredients.some(
        (ingredient) => ingredients[ingredient] === true
      )
    );
    if (filteredCocktails && filteredCocktails!.length > 0) {
      return filteredCocktails.map((cocktail) => {
        return (
          <CocktailCard
            id={cocktail.idDrink}
            imageUrl={cocktail.strDrinkThumb}
            name={cocktail.strDrink}
            key={`drink-${cocktail.idDrink}`}
          />
        );
      });
    } else {
      return cocktails?.map((cocktail) => {
        return (
          <CocktailCard
            id={cocktail.idDrink}
            imageUrl={cocktail.strDrinkThumb}
            name={cocktail.strDrink}
            key={`drink-${cocktail.idDrink}`}
          />
        );
      });
    }
  };

  return (
    <div className="cocktail-generator-container">
      <div className="checkbox-and-btn-container">
        <div className="checkbox-wrapper">{GetCheckboxes()}</div>
        <button
          className="generator-reset-button"
          onClick={() => ResetIngredientFilters()}
        >
          Reset
        </button>
      </div>
      <div className="cocktails-wrapper">
        {init ? GetCocktails() : <Spinner isLoading={true}></Spinner>}
      </div>
    </div>
  );
};

export default CocktailGenerator;
