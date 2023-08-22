import Welcome from "../../Components/Welcome/Welcome";
import SearchBar from "../../Components/SearchBar/SearchBar";
import CocktailCarousel from "../../Components/CocktailsCarousel/CocktailCarousel";
import GeneratorInvite from "../../Components/GeneratorInvite/GeneratorInvite";
import SignupInvite from "../../Components/SignupInvite/SignupInvite";
import SingleCocktailComp from "../../Components/SingleCocktailComp/SingleCocktailComp";
import "./homepage.css";
import { useState } from "react";
export default function Homepage() {
  return (
    <div id="homepage-container">
      <div id="homepage-content">
        <Welcome></Welcome>
        <SearchBar></SearchBar>
        <CocktailCarousel></CocktailCarousel>
        <GeneratorInvite></GeneratorInvite>
        <SignupInvite></SignupInvite>
      </div>
    </div>
  );
}
