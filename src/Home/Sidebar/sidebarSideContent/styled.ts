import styled from "styled-components";

interface Props {
  mode?: any;
  banner?: boolean;
}
export const SidebarSideContent = styled.div<Props>`
  width: 100%;
  height: 91vh;
  overflow-y: scroll;
  scrollbar-width: none;
  background-color: ${(props) => (props.mode ? "black" : "white")};
`;

export const SideContentBanner = styled.div<Props>`
  display: ${(props) => (props.banner ? "block" : "none")};
`;

export const InnerContainer = styled.div`
  background-image: url(https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png);
  width: 100%;
  height: 260px;
  background-size: cover;
  display: flex;
  /* -webkit-box-pack: justify; */
  justify-content: space-between;
  background-position-x: center;
  background-position-y: center;
  /* padding: 30px; */
  width: 100%;
`;

export const AdContent = styled.div`
  padding-left: 30px;
  width: 30%;
  padding: 30px;
  padding-top: 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
`;

export const LogoNavbar = styled.img`
  width: 100px;
  height: auto;
`;

export const AdBtn = styled.button`
  padding: 10px;
  border: 1px solid black;
  background-color: transparent;
  border-radius: 3px;
  align-self: flex-start;
  cursor: pointer;
`;

export const CloseIcon = styled.div`
  color: #000;

  padding: 10px;
  cursor: pointer;
`;
