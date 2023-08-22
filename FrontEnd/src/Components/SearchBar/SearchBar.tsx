import { useEffect, useRef, useState } from "react";
import "./SearchBar.css";
import { ICocktailModel } from "../../Cocktail/ICocktail";
import { SearchCocktails } from "../../API/Api";
import { ConvertCocktailToModel } from "../../Utils";

export interface ISearchBarProps {
  searchTerm?: string | null;
}
const SearchBar = (props: ISearchBarProps) => {
  const [searchBarValue, setSearchBarValue] = useState(
    props.searchTerm ? props.searchTerm : ""
  );
  const [suggestions, setSuggestions] = useState<ICocktailModel[]>([]);
  const [suggestionsBoxOpen, setSuggestionsBoxOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const goToSearchResults = () => {
    if (searchBarValue != "") {
      window.location.href = `/search-results?term=${searchBarValue}`;
    }
  };

  const handleOnChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchBarValue(event.target.value);
    await SearchCocktails(event.target.value).then((data) => {
      if (data == null) {
        setSuggestions([]);
        return;
      }
      setSuggestions(ConvertCocktailToModel(data));
    });
  };

  useEffect(() => {
    const GetPreSuggestions = async (term: string) => {
      await SearchCocktails(term).then((data) => {
        setSuggestions(ConvertCocktailToModel(data));
      });
    };

    if (props.searchTerm && props.searchTerm.length) {
      GetPreSuggestions(props.searchTerm);
    }
  }, []);

  const GetSuggestions = () => {
    return suggestions.map((cocktail) => {
      return (
        <div
          className="suggestion"
          key={`suggestions-${cocktail.idDrink}`}
          onClick={() =>
            (window.location.href = `/search-results?term=${cocktail.strDrink}`)
          }
        >
          <p>{cocktail.strDrink}</p>
        </div>
      );
    });
  };

  return (
    <div className="search-bar-div">
      <div className="search-suggest-container">
        <input
          ref={inputRef}
          onFocus={() => setSuggestionsBoxOpen(true)}
          onBlur={() =>
            setTimeout(() => {
              setSuggestionsBoxOpen(false);
            }, 200)
          }
          value={searchBarValue}
          className="search-bar-input"
          type="text"
          placeholder="Search Cocktail By Name Now!"
          onChange={handleOnChange}
        />

        {suggestionsBoxOpen && suggestions.length > 0 ? (
          <div className="suggestions-container">
            {suggestions.length ? GetSuggestions() : <></>}
          </div>
        ) : (
          <></>
        )}
      </div>
      <button className="search-btn" type="submit" onClick={goToSearchResults}>
        <img
          className="search-img"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Search_Icon.svg/1024px-Search_Icon.svg.png"
        ></img>
      </button>
    </div>
  );
};

export default SearchBar;
