import CocktailGenerator from "../../Components/CocktailGenerator/CocktailGenerator";
import "../CocktailGeneratorPage/cocktailGeneratorPage.css";

import React from "react";

const CocktailGeneratorPage = () => {
  return (
    <div id="cocktail-generator-page-container">
      <h1 id="cocktail-generator-page-headline">
        Which Ingredients Do You Have?
      </h1>
      <p id="cocktail-generator-page-p">
        select all the ingredients that you have at home and find out which
        cocktails you can make!
      </p>
      <CocktailGenerator />
    </div>
  );
};

export default CocktailGeneratorPage;
