import { FaMoon, FaSun, FaBars, FaSignOutAlt } from "react-icons/fa";
import ConfigurationContext from "../../context";
import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Panel } from "../Sidebar";
import Cookies from "js-cookie";
import {
  Poper,
  EntirePop,
  PopBtn,
  CancelBtn,
  ConfirmBtn,
  LogoNavbar,
  NavbarList,
  LogoutSVG,
  Poffile,
  LogoutBtn,
  NavbarContainer,
  Heading3,
  ListElement,
} from "./styled";

// Refined StyleState interface
interface StyleState {
  display: string;
  position?: "static" | "relative" | "absolute" | "fixed" | "sticky" | undefined;
  zIndex?: number;
  top?: string;
  left?: string;
  backgroundColor?: string;
  [key: string]: any; // To allow media query or additional keys
}


const Navbar = () => {
  const { mode, handleMode } = useContext(ConfigurationContext);
  const [showpop, setpop] = useState(false);
  const navigate = useNavigate();

  const handleSet = () => {
    handleMode();
  };

  const handleRemove = () => {
    Cookies.remove("jwt_token");
    navigate("/");
  };

  const [stile, setStile] = useState<StyleState>({ 
    display: "none",
    "@media (min-width: 771px)": {
      display: "none"
    }
  });

  const handleProfile = () => {
    setStile({
      display: "block",
      position: "absolute",
      zIndex: 2,
      top: "0",
      left: "0",
      backgroundColor: !mode ? "#fff" : "#000",
      "@media (min-width: 771px)": {
        display: "none"
      },
    });
  };

  return (
    <>
      {showpop && (
        <EntirePop>
          <Poper mode={mode}   data-testid="poper-logout">
            <Heading3 mode={mode}>Are you sure you want to logout?</Heading3>
            <PopBtn>
              <CancelBtn data-testid="cancel-button" onClick={() => setpop(false)}>Cancel</CancelBtn>
              <ConfirmBtn data-testid="confirm-button" onClick={handleRemove}>Confirm</ConfirmBtn>
            </PopBtn>
          </Poper>
        </EntirePop>
      )}

      <NavbarContainer>
        <Link to="/NxtWatch/Home">
          <LogoNavbar
            src={
              !mode
                ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                : "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
            }
            alt={!mode? "lightmodelogo": "darkmodelogo"}
          />
        </Link>

        <Panel props={stile} setting={setStile} />
        <NavbarList>
          <ListElement data-testid="theme-icon" onClick={handleSet}>
            {mode ? <FaSun title="Sun Icon" data-testid="darkMode" className="lightModeIcon" /> : <FaMoon title="Moon Icon" data-testid="lightMode"/>}
          </ListElement>
          <ListElement>
            <Poffile
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              alt="logo"
            />
            <LogoutSVG as={FaBars}  data-testid="logout-svg" onClick={handleProfile} />
          </ListElement>
          <ListElement>
            <LogoutBtn data-testid="logout-button-nav" onClick={() => setpop(!showpop)}>Log out</LogoutBtn>
            <LogoutSVG as={FaSignOutAlt} data-testid="logout-popup" onClick={() => setpop(!showpop)} />
          </ListElement>
        </NavbarList>
      </NavbarContainer>
    </>
  );
};

export default Navbar;