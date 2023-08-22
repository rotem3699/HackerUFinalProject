import { useUserContext } from "../../Contexts/UserContext";
import "./signupInvite.css";

function SignupInvite() {
  const userContext = useUserContext();

  const HandleSignUpClick = () => {
    if (userContext && userContext.openModal != undefined) {
      userContext.openModal();
    }
  };

  return (
    <div className="signup-invite-container">
      <div className="signup-invite-div">
        <h1 className="signup-invite-header"> Sign Up And Start Having Fun!</h1>
        <div id="signup-invite-round-container">
          <div className="signup-invite-round">
            <h3> Save Your Favorite Cocktails</h3>
          </div>
          <div className="signup-invite-round">
            <h3> Discover Some New Recipes</h3>
          </div>
          <div className="signup-invite-round">
            <h3>Get Your Own Cocktails Suggestions</h3>
          </div>
        </div>
        <button onClick={() => HandleSignUpClick()} className="signup-now-link">
          Sign Up Now!
        </button>
      </div>
    </div>
  );
}

export default SignupInvite;
