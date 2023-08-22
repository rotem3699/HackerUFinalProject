import "./singleCocktailPage.css";
import SingleCocktailComp from "../../Components/SingleCocktailComp/SingleCocktailComp";
import SimiliarCocktailsComp from "../../Components/SimiliarCocktailsComp/SimiliarCocktailsComp";
import { useEffect, useState } from "react";
import { ICocktailModel } from "../../Cocktail/ICocktail";
import { useParams } from "react-router-dom";
import { GetCocktailById } from "../../API/Api";
import { ConvertCocktailToModel } from "../../Utils";
import Spinner from "../../Components/Spinner/Spinner";

function SingleCocktail() {
  const [cocktailToShow, setCocktailToShow] = useState<ICocktailModel>();
  const [similarCocktailsLoaded, setSimilarCocktailsLoaded] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    const GetCocktailByIdAsync = async (id: string) => {
      var cocktailFromAPI = await GetCocktailById(id);
      var cocktailModel = ConvertCocktailToModel([cocktailFromAPI])[0];
      setCocktailToShow(cocktailModel);
    };
    if (id) {
      GetCocktailByIdAsync(id).catch(console.error);
    }
  }, []);

  return (
    <div style={{ minHeight: "600px" }}>
      {cocktailToShow ? (
        <div className="single-cocktail-exists-container">
          <SingleCocktailComp cocktail={cocktailToShow}></SingleCocktailComp>
          <SimiliarCocktailsComp
            cocktail={cocktailToShow}
            loadingSetter={setSimilarCocktailsLoaded}
          ></SimiliarCocktailsComp>
        </div>
      ) : (
        <>
          <Spinner
            isLoading={cocktailToShow == undefined || !similarCocktailsLoaded}
          ></Spinner>
        </>
      )}
    </div>
  );
}

export default SingleCocktail;
