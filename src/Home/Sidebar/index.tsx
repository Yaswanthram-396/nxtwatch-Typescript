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
  position?: string;
  zIndex?: number;
  top?: string;
  left?: string;
  backgroundColor?: string;
  [key: string]: any; // To allow media query or additional keys
}



export function Panel({ props, setting }:StyleState) {
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
          {/* <CloseIcon onClick={() => setting({ display: "none" })} /> */}
          <CloseIcon
            as={FaTimes}
            onClick={() => setting({ display: "none" })}
          />
        </div>
        <EntireSide>
          <SidePanelOptionsContainer>
            <Link to="/NxtWatch/Home">
              <SidePanelOptions
                mode={mode}
                check={pagein === "Home"}
                onClick={() => Num("Home")}
              >
                <FaHome
                  style={{ color: pagein === "Home" ? "red" : mode ? "#fff" : "#000" }}
                />
                <SidePanelOptionsDivert mode={mode}>
                  Home
                </SidePanelOptionsDivert>
              </SidePanelOptions>
            </Link>
            <Link to="/NxtWatch/Trending">
              <SidePanelOptions
                mode={mode}
                check={pagein === "Trending"}
                onClick={() => Num("Trending")}
              >
                <FaFire
                  style={{ color: pagein === "Trending" ? "red" : mode ? "#fff" : "#000" }}
                />
                <SidePanelOptionsDivert mode={mode}>
                  Trending
                </SidePanelOptionsDivert>
              </SidePanelOptions>
            </Link>
            <Link to="/NxtWatch/Gaming">
              <SidePanelOptions
                mode={mode}
                check={pagein === "Gaming"}
                onClick={() => Num("Gaming")}
              >
                <FaGamepad
                  style={{ color: pagein === "Gaming" ? "red" : mode ? "#fff" : "#000" }}
                />
                <SidePanelOptionsDivert mode={mode}>
                  Gaming
                </SidePanelOptionsDivert>
              </SidePanelOptions>
            </Link>
            <Link to="/NxtWatch/Saved">
              <SidePanelOptions
                mode={mode}
                check={pagein === "Saved"}
                onClick={() => Num("Saved")}
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
          <SidePanelFooter>
            <h2 style={mode ? darkMode : light}>CONTACT US</h2>
            <IconsContainer>
              <Icon
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                alt="facebook logo"
              />
              <Icon
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                alt="twitter logo"
              />
              <Icon
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                alt="linked in logo"
              />
            </IconsContainer>
            <Paragraph mode={mode}>
              Enjoy! Now to see your channels and recommendations!
            </Paragraph>
          </SidePanelFooter>
        </EntireSide>
      </div>
    </Headers>
  );
}
// interface StyleState {
//   display: string;
//   position?: string;
//   zIndex?: number;
//   top?: string;
//   left?: string;
//   backgroundColor?: string;
//   [key: string]: any; // To allow media query or additional keys
// }

// interface PanelProps {
//   props: React.CSSProperties;
//   setting: React.Dispatch<React.SetStateAction<StyleState>>;
// }

// export function Panel({ props, setting }: PanelProps | StyleState) {
//   const { mode, handlePage } = useContext(ConfigurationContext);
//   const pagein = localStorage.getItem("pagein");
//   const darkMode = { color: "white" };
//   const light = { color: "black" };
//   const location = useLocation();

//   useEffect(() => {
//     const currentPath = location;
//     const newItem = currentPath.pathname?.split("/").pop() || "";
//     handlePage(newItem);
//   }, []);
//   const Num = (word:any) => {
//     handlePage(word);
//     setting({ display: "none" });
//   };
// // export const HomeIcon =styled(FaHome)<props>`
// //   color: ${(props) => (props.active ? "red" : props.mode ? "#fff" : "#000")};
// // `;
//   return (
//     <Headers style={props}>
//       <div style={{ display: "flex", flexDirection: "column" }}>
//         <div style={{ textAlign: "end", paddingRight: "5%", paddingTop: "3%" }}>
          // <CloseIcon
          //   as={FaTimes}
          //   onClick={() => setting({ display: "none" })}
          // />
//         </div>
//         <EntireSide>
//           <SidePanelOptionsContainer>
//             <Link to="/NxtWatch/Home">
//               <SidePanelOptions
//                 mode={mode}
//                 check={pagein === "Home"}
//                 onClick={() => Num("Home")}
//               >
                
//                 <FaHome  active={pagein === "Home"} mode={mode} style={color: ${(props) => (props.active ? "red" : props.mode ? "#fff" : "#000")};} />
//                 <SidePanelOptionsDivert mode={mode}>
//                   Home
//                 </SidePanelOptionsDivert>
//               </SidePanelOptions>
//             </Link>
//             <Link to="/NxtWatch/Trending">
//               <SidePanelOptions
//                 mode={mode}
//                 check={pagein === "Trending"}
//                 onClick={() => Num("Trending")}
//               >
//                 <TrendingIcon
//                   as={FaFire}
//                   active={pagein === "Trending"}
//                   mode={mode}
//                 />
//                 <SidePanelOptionsDivert mode={mode}>
//                   Trending
//                 </SidePanelOptionsDivert>
//               </SidePanelOptions>
//             </Link>
//             <Link to="/NxtWatch/Gaming">
//               <SidePanelOptions
//                 mode={mode}
//                 check={pagein === "Gaming"}
//                 onClick={() => Num("Gaming")}
//               >
//                 <GamingIcon
//                   as={FaGamepad}
//                   active={pagein === "Gaming"}
//                   mode={mode}
//                 />
//                 <SidePanelOptionsDivert mode={mode}>
//                   Gaming
//                 </SidePanelOptionsDivert>
//               </SidePanelOptions>
//             </Link>
//             <Link to="/NxtWatch/Saved">
//               <SidePanelOptions
//                 mode={mode}
//                 check={pagein === "Saved"}
//                 onClick={() => Num("Saved")}
//               >
//                 <SavedIcon
//                   as={MdVideoLibrary}
//                   active={pagein === "Saved"}
//                   mode={mode}
//                 />
//                 <SidePanelOptionsDivert mode={mode}>
//                   Saved videos
//                 </SidePanelOptionsDivert>
//               </SidePanelOptions>
//             </Link>
//           </SidePanelOptionsContainer>
//           <SidePanelFooter>
//             <h2 style={mode ? darkMode : light}>CONTACT US</h2>
//             <IconsContainer>
//               <Icon
//                 src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
//                 alt="facebook logo"
//               />
//               <Icon
//                 src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
//                 alt="twitter logo"
//               />
//               <Icon
//                 src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
//                 alt="linked in logo"
//               />
//             </IconsContainer>
//             <Paragraph mode={mode}>
//               Enjoy! Now to see your channels and recommendations!
//             </Paragraph>
//           </SidePanelFooter>
//         </EntireSide>
//       </div>
//     </Headers>
//   );
// }

function SidePanel({Num}:{ Num: any }) {
  const { mode, handlePage } = useContext(ConfigurationContext);
  const darkMode = { color: "white" };
  const light = { color: "black" };
  const location = useLocation();
  const pagein = localStorage.getItem("pagein");

  useEffect(() => {
    const currentPath = location;
    const num = currentPath.pathname.split("/").pop();
    handlePage(num);
  }, []);

  return (
    <ContentWithPanel>
      <InnersidePanel>
        <SidePanelOptionsContainer>
          <Link to="/NxtWatch/Home">
            <SidePanelOptions
              mode={mode}
              check={pagein === "Home"}
              onClick={() => handlePage("Home")}
            >
              {/* <HomeIcon as={FaHome} active={pagein === "Home"} mode={mode} /> */}
              <FaHome
                  style={{ color: pagein === "Home" ? "red" : mode ? "#fff" : "#000" }}
                />
              <SidePanelOptionsDivert mode={mode}>Home</SidePanelOptionsDivert>
            </SidePanelOptions>
          </Link>
          <Link to="/NxtWatch/Trending">
            <SidePanelOptions
              mode={mode}
              check={pagein === "Trending"}
              onClick={() => handlePage("Trending")}
            >
              {/* <TrendingIcon
                as={FaFire}
                active={pagein === "Trending"}
                mode={mode}
              /> */}
              <FaFire
                  style={{ color: pagein === "Trending" ? "red" : mode ? "#fff" : "#000" }}
                />
              <SidePanelOptionsDivert mode={mode}>
                Trending
              </SidePanelOptionsDivert>
            </SidePanelOptions>
          </Link>
          <Link to="/NxtWatch/Gaming">
            <SidePanelOptions
              mode={mode}
              check={pagein === "Gaming"}
              onClick={() => handlePage("Gaming")}
            >
              {/* <GamingIcon
                as={FaGamepad}
                active={pagein === "Gaming"}
                mode={mode}
              /> */}
              <FaGamepad
                  style={{ color: pagein === "Gaming" ? "red" : mode ? "#fff" : "#000" }}
                />
              <SidePanelOptionsDivert mode={mode}>
                Gaming
              </SidePanelOptionsDivert>
            </SidePanelOptions>
          </Link>
          <Link to="/NxtWatch/Saved">
            <SidePanelOptions
              mode={mode}
              check={pagein === "Saved"}
              onClick={() => handlePage("Saved")}
            >
              {/* <SavedIcon
                as={MdVideoLibrary}
                active={pagein === "Saved"}
                mode={mode}
              /> */}
              <MdVideoLibrary
                  style={{ color: pagein === "Saved" ? "red" : mode ? "#fff" : "#000" }}
                />
              <SidePanelOptionsDivert mode={mode}>
                Saved videos
              </SidePanelOptionsDivert>
            </SidePanelOptions>
          </Link>
        </SidePanelOptionsContainer>
        <SidePanelFooter>
          <h2 style={mode ? darkMode : light}>CONTACT US</h2>
          <IconsContainer>
            <Icon
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
              alt="facebook logo"
            />
            <Icon
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
              alt="twitter logo"
            />
            <Icon
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
              alt="linked in logo"
            />
          </IconsContainer>
          <Paragraph mode={mode}>
            Enjoy! Now to see your channels and recommendations!
          </Paragraph>
        </SidePanelFooter>
      </InnersidePanel>
      {Num}
    </ContentWithPanel>
  );
}

export default SidePanel;
