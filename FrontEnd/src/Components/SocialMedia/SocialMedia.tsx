import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./socialMedia.css";

const SocialMedia = () => {
  return (
    <div className="social-media-container">
      <p className="social-media-paragraph">
        <FontAwesomeIcon icon={["fab", "facebook"]} /> Cocktail4U
      </p>
      <p className="social-media-paragraph">
        <FontAwesomeIcon icon={["fab", "instagram"]} /> Cocktail4U
      </p>
      <p className="social-media-paragraph">
        <FontAwesomeIcon icon={["fab", "twitter"]} /> Cocktail4U
      </p>
      <p className="social-media-paragraph">
        <FontAwesomeIcon icon={["fab", "youtube"]} /> Cocktail4U
      </p>
    </div>
  );
};

export default SocialMedia;
