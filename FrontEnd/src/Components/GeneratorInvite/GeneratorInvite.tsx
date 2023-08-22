import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./generatarInvite.css";

function GeneratorInvite() {
  return (
    <div className="generator-invite-container">
      <h1 className="generator-invite-header">
        Make A Cocktail Today With What You Have At Home!
      </h1>
      <p className="generator-invite-content">
        Visit our cocktail-generator and experience the thrill of creating
        unique and tantalizing concoctions tailored to your preferences.{" "}
        <br className="hide-on-tablet"></br>Whether you're a seasoned mixologist
        or just starting your cocktail journey, our generator will inspire you
        with exciting combinations of spirits, mixers, and garnishes. Cheers!
        &nbsp;
      </p>
      <a href="/cocktail-generator" className="generator-invite-link">
        Try It Now!
      </a>
    </div>
  );
}

export default GeneratorInvite;
