import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage/Homepage";
import SingleCocktailPage from "./pages/SingleCocktailPage/SingleCocktailPage";
import SearchResultsPage from "./pages/SearchResultsPage/SearchResultsPage";
import AboutUsPage from "./pages/AboutUsPage/AboutUsPage";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import ContactUsPage from "./pages/ContactUsPage/ContactUsPage";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";
import CocktailGeneratorPage from "./pages/CocktailGeneratorPage/CocktailGeneratorPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage></Homepage>} />
          <Route
            path="/SingleCocktailPage"
            element={<SingleCocktailPage></SingleCocktailPage>}
          />
          <Route path="/about-us" element={<AboutUsPage></AboutUsPage>} />
          <Route path="/contact-us" element={<ContactUsPage></ContactUsPage>} />
          <Route
            path="/cocktail-generator"
            element={<CocktailGeneratorPage></CocktailGeneratorPage>}
          />
          <Route
            path="/search-results"
            element={<SearchResultsPage></SearchResultsPage>}
          />
          <Route
            path="/user-profile"
            element={<UserProfilePage></UserProfilePage>}
          />
          <Route path="/Cocktail/:id" element={<SingleCocktailPage />} />
          <Route path="*" element={<ErrorPage></ErrorPage>} />
        </Routes>
      </Router>
      <Footer></Footer>
    </div>
  );
}

export default App;
