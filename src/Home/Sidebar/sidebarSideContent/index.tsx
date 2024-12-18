import React from "react";
import { FaTimes } from "react-icons/fa";
import GetApiRes from "../videosAnSearch";
import ConfigurationContext from "../../../context";
import {
  SidebarSideContent,
  SideContentBanner,
  InnerContainer,
  AdContent,
  AdBtn,
  CloseIcon,
  LogoNavbar,
} from "./styled";

interface VideosInHomeState {
  banner: boolean;
}

class VideosInHome extends React.Component<{}, VideosInHomeState> {
  static contextType = ConfigurationContext;
  context!: React.ContextType<typeof ConfigurationContext>; 
  constructor(props: {}) {
    super(props);
    this.state = { banner: true };
  }

  darkMode = {
    backgroundColor: "white",
  };

  light = {
    backgroundColor: "black",
  };

  handleCloseBanner = () => {
    const { banner } = this.state;
    this.setState({ banner: !banner });
  };

  render() {
    const { banner } = this.state;
    const { mode } = this.context; 
    return (
      <SidebarSideContent mode={mode}>
        <SideContentBanner banner={banner}>
          <InnerContainer>
            <AdContent>
              <LogoNavbar
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                alt="logo"
              />
              <p style={{ color: "#000" }}>
                Buy Nxt Watch Premium prepaid plans with UPI
              </p>
              <AdBtn>GET IT NOW</AdBtn>
            </AdContent>
            <CloseIcon as={FaTimes} onClick={this.handleCloseBanner} />
          </InnerContainer>
        </SideContentBanner>
        <GetApiRes />
      </SidebarSideContent>
    );
  }
}

export default VideosInHome;
