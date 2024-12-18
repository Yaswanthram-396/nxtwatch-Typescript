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
  position?: string;
  zIndex?: number;
  top?: string;
  left?: string;
  backgroundColor?: string;
  "@media (min-width: 771px)"?: { display: string };
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
          <Poper mode={mode}>
            <Heading3 mode={mode}>Are you sure you want to logout?</Heading3>
            <PopBtn>
              <CancelBtn onClick={() => setpop(false)}>Cancel</CancelBtn>
              <ConfirmBtn onClick={handleRemove}>Confirm</ConfirmBtn>
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
            alt="logo"
          />
        </Link>

        <Panel props={stile} setting={setStile} display={""} />
        <NavbarList>
          <ListElement onClick={handleSet}>
            {mode ? <FaSun title="Sun Icon" /> : <FaMoon title="Moon Icon" />}
          </ListElement>
          <ListElement>
            <Poffile
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              alt="logo"
            />
            <LogoutSVG as={FaBars} onClick={handleProfile} />
          </ListElement>
          <ListElement>
            <LogoutBtn onClick={() => setpop(!showpop)}>Logout</LogoutBtn>
            <LogoutSVG as={FaSignOutAlt} onClick={() => setpop(!showpop)} />
          </ListElement>
        </NavbarList>
      </NavbarContainer>
    </>
  );
};

export default Navbar;