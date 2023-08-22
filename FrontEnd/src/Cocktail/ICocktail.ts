export interface ICocktail {
  idDrink: string;
  strCategory: string;
  strDrink: string;
  strDrinkThumb: string;
  strGlass: string;
  strIngredient1: string | null;
  strIngredient2: string | null;
  strIngredient3: string | null;
  strIngredient4: string | null;
  strIngredient5: string | null;
  strIngredient6: string | null;
  strIngredient7: string | null;
  strIngredient8: string | null;
  strIngredient9: string | null;
  strIngredient10: string | null;
  strIngredient11: string | null;
  strIngredient12: string | null;
  strIngredient13: string | null;
  strIngredient14: string | null;
  strIngredient15: string | null;
  strInstructions: string | null;
  strmeasure1: string | null;
  strmeasure2: string | null;
  strmeasure3: string | null;
  strmeasure4: string | null;
  strmeasure5: string | null;
  strmeasure6: string | null;
  strmeasure7: string | null;
  strmeasure8: string | null;
  strmeasure9: string | null;
  strmeasure10: string | null;
  strmeasure11: string | null;
  strmeasure12: string | null;
  strmeasure13: string | null;
  strmeasure14: string | null;
  strmeasure15: string | null;
  strVideo: string | null;
  strAlcoholic: string;
  [key: string]: string | null; // Allow any string property with string or null value
}

export interface ICocktailModel {
  idDrink: string;
  strCategory: string;
  strInstructions: string | null;
  strDrink: string;
  strDrinkThumb: string;
  strGlass: string;
  ingredients: string[];
  measurements: string[];
  strVideo: string | null;
  strAlcoholic: string | null;
}

const defaultCocktail: ICocktail[] = [];
