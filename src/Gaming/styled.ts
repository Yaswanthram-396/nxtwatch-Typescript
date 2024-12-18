import styled from "styled-components";

interface Props{
  theme?:boolean;
  darkMode?:boolean;
  mode?:boolean
}
const TrendingVideos = styled.div`
  margin: 0;
  padding: 0;
  width: 82%;

    height: 91vh;
    overflow: scroll;
  scrollbar-width: none;

    @media (max-width: 770px) {
  width: 100%; 
    }
}
`;

const GamingVideo = styled.div<Props>`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: ${(props) => (props.darkMode ? "rgb(0,0,0)" : "#FAF9F7")};
  padding: 20px;
`;

const LinkStyled = styled.div`
  width: 26%;
  padding: 20px;
  text-decoration: none;

  @media (min-width: 441px) and (max-width: 770px) {
    width: 41%;
  }

  @media (max-width: 440px) {
    width: 90%;
  }
`;

const BGContainerGaming = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: transparent;
  margin-bottom: 10px;
  text-decoration: none;
  transition: 0.3s ease-out;
`;

const GameVideoPhoto = styled.img`
  width: 100%;
  height: 100%;
`;

const Outer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Inner = styled.div`
  p {
    font-size: 16px;
  }
`;

const Heading = styled.h1<Props>`
  color: ${(props) => (props.darkMode ? "#fff" : "#000")};
`;

const ParagraphInThumb = styled.div<Props>`
  p {
    font-size: 14px;
    color: ${(props) => (props.mode ? "#ccc" : "#333")};
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
export {
  TrendingVideos,
  GamingVideo,
  LinkStyled,
  BGContainerGaming,
  GameVideoPhoto,
  Outer,
  Inner,
  Heading,
  ParagraphInThumb,
  LoaderContainer,
};
