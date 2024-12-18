import styled from "styled-components";
interface Props{
  theme?:boolean;
  mode?:boolean;
}
const TrendingVideosContainer = styled.div`
  width: 82%;
  height: 92vh;
  overflow-y: scroll;
  scrollbar-width: none;
  @media (max-width: 770px) {
    width: 100vw;
  }
`;

const TrendingHeader = styled.div`
  width: 94%;
  height: 100px;
  background-color: rgb(241, 241, 241);
  display: flex;
  padding: 20px 20px 20px 45px;
  align-items: center;
  @media (max-width: 770px) {
    width: auto;
  }
`;

const IconContainer = styled.div`
  padding: 30px;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-right: 30px;
  background-color: ${(prop) =>
    prop.theme ? "rgb(15,15,15)" : "rgb(224, 233, 240)"};

  @media (max-width: 770px) {
    padding: 15px;
    width: 50px;
    height: 50px;
    margin-right: 15px;
  }
`;

const TrendingTitle = styled.h1<Props>`
  font-size: 40px;
  font-family: 700;
  color: ${({ theme }) => (theme ? "#fff" : "#000")};

  @media (max-width: 770px) {
    font-size: 25px;
  }
`;

const VideoItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
  @media (max-width: 770px) {
    flex-direction: column;
  }
`;

const VideoThumbnail = styled.img`
  width: 35%;
  min-height: 32vh;
  @media (max-width: 770px) {
    width: 100%;
  }
`;

const VideoDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 94%;
  height: 91vh;
  padding: 32.5px;
  @media (max-width: 770px) {
    width: auto;
    padding: 40px;
  }
`;

const VideoInfo = styled.div`
  text-decoration: none;
`;

const VideoTitleText = styled.h1<Props>`
  font-size: 24px;
  color: ${(prop) => (prop.theme ? "#fff" : "#000")};

  @media (max-width: 770px) {
    font-size: 18px;
  }
`;

const VideoMetaData = styled.div`
  display: flex;
  gap: 10px;
`;

const VideoMetaItem = styled.p`
  color: rgb(148, 163, 184);
  font-weight: 600;
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
const Para = styled.p<Props>`
  color: ${(props) => (props.mode ? "#fff" : "#000")};
  font-weight: 600;
`;

export {
  TrendingVideosContainer,
  TrendingHeader,
  IconContainer,
  TrendingTitle,
  VideoItemContainer,
  VideoThumbnail,
  VideoDetails,
  VideoInfo,
  VideoTitleText,
  VideoMetaData,
  VideoMetaItem,
  LoaderContainer,
  Para,
};
