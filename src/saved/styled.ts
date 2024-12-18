import styled from "styled-components";
interface Props{
  darkMode:boolean;
  
}
const VideoContainer = styled.div<Props>`
display: flex;
flex-direction: column;
gap: 24px;
width: 94%;
padding: 32.5px;
background-color: ${(props) => (props.darkMode ? "rgb(0,0,0)" : "#fff")};
    @media (max-width:770px) {
        width: auto;
        padding: 40px;
    }
       

} 
`;

const NoSavedContainer = styled.div<Props>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 91vh;
  width: 82%;
  background-color: ${(props) => (props.darkMode ? "#000" : "#fff")};
`;

const NoSavedImage = styled.img`
  width: 40%;
  margin: 20px;
`;

const BGContainer2 = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
  @media (max-width: 770px) {
    flex-direction: column;
  }
`;

const VideoPhoto = styled.img`
  width: 35%;
  min-height: 20vh;
  @media (max-width: 770px) {
    width: 100%;
  }
`;

const NoVideosText = styled.h2<Props>`
  color: ${(props) => (props.darkMode ? "#fff" : "#000")};
`;

const NoVideosSubText = styled.p<Props>`
  color: ${(props) => (props.darkMode ? "#ccc" : "#333")};
`;

export {
  VideoContainer,
  NoSavedContainer,
  NoSavedImage,
  BGContainer2,
  VideoPhoto,
  NoVideosText,
  NoVideosSubText,
};
