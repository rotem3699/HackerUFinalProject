import "./searchResultsPage.css";
import SearchBar from "../../Components/SearchBar/SearchBar";
import SearchResultComp from "../../Components/SearchResults/SearchResultComp";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { SearchCocktails } from "../../API/Api";
import { ICocktailModel } from "../../Cocktail/ICocktail";
import { ConvertCocktailToModel } from "../../Utils";

const SearchResultsPage = () => {
  const [searchResults, setSearchResults] = useState<ICocktailModel[]>([]);
  const [noResults, setNoResults] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string | null>("");
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const term = searchParams.get("term");
    setSearchTerm(term);

    if (term && term.length) {
      SearchForCocktails(term);
    }

    async function SearchForCocktails(searchTerm: string) {
      await SearchCocktails(searchTerm).then((data) => {
        if (data) {
          setSearchResults(ConvertCocktailToModel(data));
        } else {
          setNoResults(true);
        }
      });
    }
  }, []);

  const GetSearchTerm = () => {
    const searchParams = new URLSearchParams(location.search);
    const term = searchParams.get("term");
    return term;
  };

  const GetCocktailResults = () => {
    return searchResults.map((cocktail) => {
      return (
        <SearchResultComp
          {...cocktail}
          key={`cocktail-${cocktail.idDrink}`}
        ></SearchResultComp>
      );
    });
  };

  const GetSearchResults = () => {
    if (!noResults) {
      if (searchResults.length > 0) {
        return GetCocktailResults();
      } else {
        return <h1>Loading</h1>;
      }
    } else {
      return <h1>No Results</h1>;
    }
  };

  return (
    <div className="search-results-page-container">
      <SearchBar searchTerm={GetSearchTerm()}></SearchBar>
      <div className="search-results-container">{GetSearchResults()}</div>
    </div>
  );
};

export default SearchResultsPage;
