import styled from "styled-components";
interface StyledProps {
  mode?: boolean; // Specify the type of `mode`
  active?: boolean;
}
const TotalVideo = styled.div<StyledProps>`
  margin: 0 auto;
  width: 100%;
  height: 91vh;
  background-color: ${({ mode }) => (mode ? "#000" : "#fff")};

  @media (max-width: 770px) {
    width: 92%;
  }
`;

const VideoPlayer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const VideoIframe = styled.iframe`
  width: 68vw;
  height: 48vh;

  @media (max-width: 770px) {
    width: 100%;
    height: 24%;
  }
`;

const VideoInfo = styled.div`
  width: 80%;
`;

const VideoTitle = styled.h2``;

const Media = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgb(204, 204, 204);
`;

const ViewCount = styled.div`
  display: flex;
  gap: 20px;
`;

const Liked = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const Interaction = styled.div<StyledProps>`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ active }) => (active ? "blue" : "gray")};
  cursor: pointer;
`;

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Image = styled.img`
  width: 5%;
`;

const ProfileDescription = styled.div``;

const DarkParagraph = styled.p`
  font-weight: 600;
  font-size: 15px;
  color: rgb(71, 85, 105);
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: 20vh auto;
`;

export {
  TotalVideo,
  VideoPlayer,
  VideoIframe,
  VideoInfo,
  VideoTitle,
  Media,
  ViewCount,
  Liked,
  Interaction,
  ProfileWrapper,
  Image,
  ProfileDescription,
  DarkParagraph,
  LoaderContainer,
};
