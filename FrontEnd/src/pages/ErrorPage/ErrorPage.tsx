import "./errorPage.css";
import Error404Image from "../../images/404-Page.png";
const ErrorPage = () => {
  return (
    <div className="error-page">
      <div className="error-content">
        <h1 className="error-page-headline">Oops! Something went wrong.</h1>

        <p className="error-page-p">Looks like this page doesnt exist.</p>
        <a className="error-page-link" href="/">
          Go back to homepage
        </a>
        <img className="error-page-img" src={Error404Image} alt="Error Icon" />
      </div>
    </div>
  );
};

export default ErrorPage;
