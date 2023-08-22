import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faS } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faR } from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faFacebook,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  faArrowTurnDown,
  faRightLong,
  faMartiniGlassCitrus,
  faHeartCirclePlus,
  faHeartCircleMinus,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { UserProvider } from "./Contexts/UserContext";
library.add(
  faR,
  faS,
  fab,
  faArrowTurnDown,
  faRightLong,
  faMartiniGlassCitrus,
  faTwitter,
  faFacebook,
  faInstagram,
  faYoutube,
  faHeart,
  faHeartCirclePlus,
  faHeartCircleMinus,
  faArrowRight
);
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <UserProvider>
    <App />
  </UserProvider>
);

reportWebVitals();
