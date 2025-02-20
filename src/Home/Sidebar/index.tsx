import { FaHome, FaGamepad, FaFire } from "react-icons/fa";
import { MdVideoLibrary } from "react-icons/md";
import { Link } from "react-router-dom";
import ConfigurationContext from "../../context";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import {
  InnersidePanel,
  EntireSide,
  SidePanelOptionsContainer,
  SidePanelOptions,
  ContentWithPanel,
  SidePanelFooter,
  IconsContainer,
  Icon,
  SidePanelOptionsDivert,
  CloseIcon,
  Paragraph,
  Headers,
} from "./styled";
interface StyleState {
  display: string;
  position?: "static" | "relative" | "absolute" | "fixed" | "sticky" | undefined;
  zIndex?: number;
  top?: string;
  left?: string;
  backgroundColor?: string;
  [key: string]: any; // To allow media query or additional keys
}



export function Panel({ props, setting }: { props: StyleState; setting: (state: StyleState) => void }) {
  const { mode, handlePage } = useContext(ConfigurationContext);
  const pagein = localStorage.getItem("pagein");
  const darkMode = { color: "white" };
  const light = { color: "black" };
  const location = useLocation();

  useEffect(() => {
    const currentPath = location;
    const newItem = currentPath.pathname?.split("/").pop() || "";
    handlePage(newItem);
  }, [location, handlePage]);

  const Num = (word: string) => {
    handlePage(word);
    setting({ display: "none" });
  };

  return (
    <Headers style={props} data-testid="panel-props">
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ textAlign: "end", paddingRight: "5%", paddingTop: "3%" }}>
          <CloseIcon
            as={FaTimes}
            data-testid="closeIcon-sidebar"
            onClick={() => setting({ display: "none" })}
          />
        </div>
        <EntireSide>
          <SidePanelOptionsContainer>
            <Link to="/NxtWatch/Home" data-testid="home-panel" onClick={() => Num("Home")}>
              <SidePanelOptions
                mode={mode}
                check={pagein === "Home"}
                
               
              >
                <FaHome
                  style={{ color: pagein === "Home" ? "red" : mode ? "#fff" : "#000" }}
                />
                <SidePanelOptionsDivert mode={mode}  >
                  Home
                </SidePanelOptionsDivert>
              </SidePanelOptions>
            </Link>
            <Link to="/NxtWatch/Trending"  onClick={() => Num("Trending")}
                data-testid="trending-panel">
              <SidePanelOptions
                mode={mode}
                check={pagein === "Trending"}
               
              >
                <FaFire
                  style={{ color: pagein === "Trending" ? "red" : mode ? "#fff" : "#000" }}
                />
                <SidePanelOptionsDivert mode={mode}>
                  Trending
                </SidePanelOptionsDivert>
              </SidePanelOptions>
            </Link>
            <Link to="/NxtWatch/Gaming"  onClick={() => Num("Gaming")}
                data-testid="gaming-panel">
              <SidePanelOptions
                mode={mode}
                check={pagein === "Gaming"}
               
              >
                <FaGamepad
                  style={{ color: pagein === "Gaming" ? "red" : mode ? "#fff" : "#000" }}
                />
                <SidePanelOptionsDivert mode={mode}>
                  Gaming
                </SidePanelOptionsDivert>
              </SidePanelOptions>
            </Link>
            <Link to="/NxtWatch/Saved" onClick={() => Num("Saved")}
                data-testid="saved-panel">
              <SidePanelOptions
                mode={mode}
                check={pagein === "Saved"}
                
              >
                <MdVideoLibrary
                  style={{ color: pagein === "Saved" ? "red" : mode ? "#fff" : "#000" }}
                />
                <SidePanelOptionsDivert mode={mode}>
                  Saved videos
                </SidePanelOptionsDivert>
              </SidePanelOptions>
            </Link>
          </SidePanelOptionsContainer>
          <SidePanelFooter data-testid="sidePanel-footer">
            <h2 style={mode ? darkMode : light}>CONTACT US</h2>
            <IconsContainer>
              <Icon
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                alt="facebook logo"
                data-testid="facebook-icon"
              />
              <Icon
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                alt="twitter logo"
                data-testid="twitter-icon"
              />
              <Icon
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                alt="linked in logo"
                data-testid="linkedin-icon"
              />
            </IconsContainer>
            <Paragraph mode={mode} data-testid="panel-paragraph">
              Enjoy! Now to see your channels and recommendations!
            </Paragraph>
          </SidePanelFooter>
        </EntireSide>
      </div>
    </Headers>
  );
}



interface SidePanelProps {
  Num: React.ReactNode;
}

function SidePanel({ Num }: SidePanelProps) {
  const { mode, handlePage } = useContext(ConfigurationContext);
  const location = useLocation();
  const pagein = localStorage.getItem("pagein");
  
  useEffect(() => {
    const num = location.pathname.split("/").pop();
    handlePage(num);
  }, [location, handlePage]);

  return (
    <ContentWithPanel>
      <InnersidePanel>
        <SidePanelOptionsContainer>
              <Link to="/NxtWatch/Home" 
              data-testid="home-sidebar"
              onClick={() => handlePage("Home")}
              
              >
            <SidePanelOptions
              mode={mode}
              check={pagein === "Home"}
            >
              <FaHome style={{ color: pagein === "Home" ? "red" : mode ? "#fff" : "#000" }} />
              <SidePanelOptionsDivert mode={mode}>Home</SidePanelOptionsDivert>
            </SidePanelOptions>
          </Link>
          <Link to="/NxtWatch/Trending"  onClick={() => handlePage("Trending")}
              data-testid="trending-sidebar">
            <SidePanelOptions
              mode={mode}
              check={pagein === "Trending"}
             
            >
              <FaFire style={{ color: pagein === "Trending" ? "red" : mode ? "#fff" : "#000" }} />
              <SidePanelOptionsDivert mode={mode}>Trending</SidePanelOptionsDivert>
            </SidePanelOptions>
          </Link>
          <Link to="/NxtWatch/Gaming" onClick={() => handlePage("Gaming")}
              data-testid="gaming-sidebar">
            <SidePanelOptions
              mode={mode}
              check={pagein === "Gaming"}
              
            >
              <FaGamepad style={{ color: pagein === "Gaming" ? "red" : mode ? "#fff" : "#000" }} />
              <SidePanelOptionsDivert mode={mode}>Gaming</SidePanelOptionsDivert>
            </SidePanelOptions>
          </Link>
          <Link to="/NxtWatch/Saved"  onClick={() => handlePage("Saved")}
              data-testid="saved-sidebar">
            <SidePanelOptions
              mode={mode}
              check={pagein === "Saved"}
             
            >
              <MdVideoLibrary style={{ color: pagein === "Saved" ? "red" : mode ? "#fff" : "#000" }} />
              <SidePanelOptionsDivert mode={mode}>Saved videos</SidePanelOptionsDivert>
            </SidePanelOptions>
          </Link>
        </SidePanelOptionsContainer>
        <SidePanelFooter>
          <h2 style={{ color: mode ? "white" : "black" }}>CONTACT US</h2>
          <IconsContainer>
            <Icon
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
              alt="facebook logo"
              data-testid="facebook-icon"
            />
            <Icon
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
              alt="twitter logo"
              data-testid="twitter-icon"
            />
            <Icon
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
              alt="linkedin logo"
              data-testid="linkedin-icon"
            />
          </IconsContainer>
          <p style={{ color: mode ? "white" : "black" }}>
            Enjoy! Now to see your channels and recommendations!
          </p>
        </SidePanelFooter>
      </InnersidePanel>
      {Num}
    </ContentWithPanel>
  );
}

export default SidePanel;