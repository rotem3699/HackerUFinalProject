import { IngredientsDictionary } from "./API/Interfaces/Interfaces";
import { ICocktail, ICocktailModel } from "./Cocktail/ICocktail";

//#region Cocktails
export const ConvertCocktailToModel = (
  cocktails: ICocktail[]
): ICocktailModel[] => {
  var result: ICocktailModel[] = [];

  cocktails.forEach((cocktail) => {
    var cocktailModel: ICocktailModel = {
      idDrink: cocktail.idDrink,
      ingredients: GetIngredientList(cocktail),
      measurements: GetMeasurementList(cocktail),
      strCategory: cocktail.strCategory,
      strDrink: cocktail.strDrink,
      strDrinkThumb: cocktail.strDrinkThumb,
      strGlass: cocktail.strGlass,
      strVideo: cocktail.strVideo,
      strAlcoholic: cocktail.strAlcoholic,
      strInstructions: cocktail.strInstructions,
    };
    result.push(cocktailModel);
  });
  return result;
};

export const GetIngredientList = (cocktail: ICocktail): string[] => {
  const ingredients: string[] = [];
  for (let i = 1; i <= 15; i++) {
    const ingredient = cocktail[`strIngredient${i}` as keyof ICocktail] as
      | string
      | null;
    if (ingredient) {
      ingredients.push(ingredient);
    }
  }
  return ingredients;
};

export const GetMeasurementList = (cocktail: ICocktail): string[] => {
  const measurements: string[] = [];
  for (let i = 1; i <= 15; i++) {
    const measurement = cocktail[`strMeasure${i}` as keyof ICocktail] as
      | string
      | null;
    if (measurement) {
      measurements.push(measurement);
    }
  }
  return measurements;
};

export const GetAllIngredients = (
  cocktails: ICocktailModel[]
): IngredientsDictionary => {
  const result: IngredientsDictionary = {};

  cocktails.forEach((cocktail) => {
    cocktail.ingredients.forEach((ingredient) => {
      if (!result.hasOwnProperty(ingredient)) {
        result[ingredient] = false;
      }
    });
  });

  const sortedResult: IngredientsDictionary = {};
  Object.keys(result)
    .sort()
    .forEach((key) => {
      sortedResult[key] = result[key];
    });

  return sortedResult;
};

export function capitalizeFirstLetter(str: string) {
  if (typeof str !== "string" || str.length === 0) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

//#endregion
