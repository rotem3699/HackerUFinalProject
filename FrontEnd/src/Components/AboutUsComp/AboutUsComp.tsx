import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./aboutUsComp.css";

function AboutUsComp() {
  return (
    <div className="about-us-comp-container">
      <h1 className="about-us-headline">About Us</h1>
      <p className="about-us-paragraph">
        Welcome to Cocktail4u, your ultimate destination for exquisite cocktail
        recipes, mixology techniques, and a celebration of the art of crafting
        extraordinary drinks.<br></br>
        We are passionate about cocktails and dedicated to sharing our love for
        the artistry and creativity that goes into every glass.
      </p>

      <h3 className="about-us-h3">Our Mission</h3>
      <p className="about-us-paragraph">
        At Cocktail4u, our mission is to inspire and empower cocktail
        enthusiasts of all levels, from beginners to seasoned mixologists.
        <br></br>
        We strive to be the go-to resource for discovering and mastering the art
        of cocktail making.<br></br>
        Whether you're hosting a social gathering, seeking a special drink to
        enjoy on your own, or simply looking to expand your knowledge and
        skills, we're here to guide you on an unforgettable journey through the
        world of cocktails.
      </p>
      <h3 className="about-us-h3">Expertly Curated Recipes</h3>
      <p className="about-us-paragraph">
        Our collection of cocktail recipes is thoughtfully curated to encompass
        a wide range of flavors, styles, and occasions.<br></br>
        From classic cocktails that have stood the test of time to innovative
        creations that push the boundaries of mixology, we take pride in
        offering a diverse selection that caters to every taste preference.
        <br></br>
        Each recipe is meticulously crafted, tested, and presented with detailed
        instructions and garnish suggestions, ensuring you can recreate the
        perfect cocktail experience in the comfort of your own home.
      </p>
      <h3 className="about-us-h3">Unleash Your Inner Mixologist</h3>
      <p className="about-us-paragraph">
        Whether you're a novice or an experienced bartender, we believe that
        everyone has the potential to become a skilled mixologist.<br></br>
        Cocktail4u is designed to be your trusted companion on this journey,
        providing you with a wealth of resources to enhance your cocktail-making
        prowess.<br></br>
        Explore our articles, tutorials, and tips that cover a wide range of
        topics, including essential bartending techniques, ingredient knowledge,
        glassware selection, and garnishing techniques.<br></br>
        We aim to equip you with the knowledge and confidence to experiment,
        innovate, and create your own signature cocktails.
      </p>
      <h3 className="about-us-h3">Community and Collaboration</h3>
      <p className="about-us-paragraph">
        We believe that the cocktail culture thrives on collaboration and the
        sharing of ideas.<br></br>
        That's why we foster a vibrant and inclusive community where cocktail
        enthusiasts from around the globe can connect, exchange insights, and
        inspire one another.<br></br>
        Join our forums, engage in discussions, and share your own cocktail
        creations.<br></br>
        We encourage you to be an active participant in our community, where you
        can learn from others, receive feedback on your recipes, and discover
        new perspectives that will elevate your cocktail journey.
      </p>
      <h3 className="about-us-h3">Embrace the Craft</h3>
      <p className="about-us-paragraph">
        At Cocktail4u, we embrace the craft of cocktail making as an art form.
        <br></br>
        It's not just about the drink; it's about the experience, the
        creativity, and the passion that goes into every step.<br></br>
        We celebrate the stories behind the cocktails, the cultural influences
        that shape them, and the history that makes them timeless.<br></br>
        Immerse yourself in the rich tapestry of mixology, and let us be your
        guide as you embark on a remarkable exploration of flavors, techniques,
        and the artistry that turns a simple drink into a masterpiece.
      </p>
      <h3 className="about-us-h3">Join Us</h3>
      <p className="about-us-paragraph">
        Whether you're a casual cocktail enthusiast or a dedicated aficionado,
        we invite you to join our vibrant community of cocktail lovers.<br></br>
        Sign up for our newsletter to receive regular updates on new recipes,
        featured articles, and exclusive offers.<br></br>
        Follow us on social media to stay connected, share your experiences, and
        be part of the exciting world of cocktails.
      </p>
      <p className="about-us-paragraph">
        Thank you for choosing Cocktail4u as your trusted source for cocktail
        inspiration.<br></br>
        Cheers to your mixology adventure! &nbsp;
        <FontAwesomeIcon icon={["fas", "martini-glass-citrus"]} />
      </p>
    </div>
  );
}

export default AboutUsComp;
