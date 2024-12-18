import { FaFire, FaGamepad, FaHome } from "react-icons/fa";
import styled from "styled-components";
import { IconType } from 'react-icons';
import { MdVideoLibrary } from "react-icons/md";
interface props{
  check?: boolean;
  mode?: boolean;
  active?: boolean;
}

const SidePanelOptions = styled.div<props>`
  display: flex;
  align-items: center;
  gap: 8%;
  padding-left: 28px;
  background-color: ${(props) =>
    props.check ? (props.mode ? "rgb(56, 56, 56)" : "#e2e8f0") : "null"};
`;
const SidePanelOptionsSvg = styled.svg`
  font-size: 20px;
`;

const InnersidePanel = styled.div`
  width: 18%;
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 89vh;

  @media (max-width: 770px) {
    display: none;
    width: 100%;
    height: 100%;
  }
`;
export const Headers = styled.div`
  width: 100%;
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  @media (min-width: 771px) {
    display: none !important;
  }
`;
const HoverOnOptions = styled.div`
  background-color: rgb(226, 232, 240);
`;

const SidePanelLink = styled.a`
  font-weight: 700;
  text-decoration: none;
  font-size: 15px;
  display: flex;
  align-items: center;
  width: 100%;
  color: black;
  margin-left: 8px;
  padding: 13px;
`;

const Contact = styled.div`
  font-family: Roboto;
  font-size: 15px;
  margin: 10px 0;
  color: black;
`;

const ContentWithPanel = styled.div`
  display: flex;
`;

const SidePanelFooter = styled.div`
  padding: 28px;
  padding-right: 10px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const IconsContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Icon = styled.img`
  width: 30px;
`;

const Body = styled.body`
  margin: 0;
`;

const Clicked = styled.div`
  background-color: rgb(56, 56, 56);
`;

const LightClick = styled.div`
  background-color: #e2e8f0;
`;

const IconStyle = styled.div`
  color: red;
`;

const WhiteIcon = styled.div`
  color: #fff;
`;

const DarkIcon = styled.div`
  color: #000;
`;

const Retry = styled.button`
  padding: 13px 26px;
  color: white;
  font-size: 20px;
  cursor: pointer;
  margin-top: 20px;
  background-color: rgb(79, 70, 229);
  border: 0;
  border-radius: 5px;
`;

const EntireSide = styled.div`
  display: flex;
  margin: auto;
  flex-direction: column;
  justify-content: space-between;
  width: 82%;
  height: 88%;
`;

const SidePanelOptionsContainer = styled.div`
  @media (max-width: 770px) {
    width: 100%;
  }
`;
export const SidePanelOptionsDivert = styled.h4<props>`
  color: ${(props) => (props.mode ? "#fff" : "#000")};
`;
export const CloseIcon = styled.div`
  cursor: pointer;
`;

interface IconProps {
  active?: boolean;
  mode?: boolean | string;
}

// Generic styled component with icon support
export const createStyledIcon = <T extends IconType>(Icon: T) => styled(Icon)<IconProps>`
  color: ${({ active, mode }) => {
    if (active) return "red";
    if (mode === 'dark' || mode === true) return "#fff";
    return "#000";
  }};
  cursor: pointer;
`;

// Update your existing styled components
export const HomeIcon = createStyledIcon(FaHome);
export const TrendingIcon = createStyledIcon(FaFire);
export const GamingIcon = createStyledIcon(FaGamepad);
export const SavedIcon = createStyledIcon(MdVideoLibrary);

// For Panel component
export interface PanelProps {
  props: React.CSSProperties & { display: string };
  setting: React.Dispatch<React.SetStateAction<React.CSSProperties & { display: string }>>;
}

// export const Panel: React.FC<PanelProps> = ({ props, setting }) => {
  // Your existing Panel component implementation
// };
export const Paragraph = styled.p<props>`
  color: ${(props) => (props.mode ? "#fff" : "#000")};
`;

export {
  SidePanelOptions,
  SidePanelOptionsSvg,
  InnersidePanel,
  HoverOnOptions,
  SidePanelLink,
  Contact,
  ContentWithPanel,
  SidePanelFooter,
  IconsContainer,
  Icon,
  Body,
  Clicked,
  LightClick,
  IconStyle,
  WhiteIcon,
  DarkIcon,
  Retry,
  EntireSide,
  SidePanelOptionsContainer,
};
