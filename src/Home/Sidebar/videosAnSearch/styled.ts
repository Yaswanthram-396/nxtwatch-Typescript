import styled from "styled-components";
interface Props {
  mode?: boolean;
}
const EntireVideos = styled.div`
  padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 24px;
}
`;

const Form = styled.form`
  display: flex;
  width: 45%;
  border: 1px solid rgb(214, 215, 211);
  border-radius: 4px;

  @media (max-width: 770px) {
    width: 95%;
  }
`;

const Search = styled.input<Props>`
  width: 87%;
  padding: 10px;
  border: none;
  border-right: 1px solid rgb(214, 215, 211);
  background-color: transparent;
  font-weight: 500;
  color: ${(props) => (props.mode ? "rgb(255,255,255)" : "rgb(0,0,0)")};

  outline: none;
`;

const SubmitDiv = styled.div`
  margin: auto;
  font-size: 14px;
  color: rgb(185, 186, 184);
`;

const SubmitButton = styled.button`
  background-color: #fff;
  border: 0px;
  font-size: 14px;
  color: rgb(185, 186, 184);
`;

const LoaderContainer = styled.div`
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50vh;
`;

const Videos = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 20px;

  @media (max-width: 770px) {
    grid-template-columns: auto;
  }

  @media (min-width: 771px) and (max-width: 1000px) {
    grid-template-columns: auto auto;
  }
`;

const BGContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 360px;
  background-color: transparent;
  margin-bottom: 10px;
  text-decoration: none;
  transition: 0.3s ease-out;
`;

const ThumbnailUrl = styled.img`
  width: 100%;
  min-height: 200px;
  cursor: pointer;
`;

const Outer = styled.div`
  display: flex;
  align-items: flex-start;
  padding-top: 10px;
  text-decoration: none;

  @media (max-width: 770px) {
    padding: 20px;
  }
`;

const Profile = styled.img`
  width: 12%;
  margin-top: 18px;
`;

const Inner = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  padding: 3px 10px 10px 17px;
`;

const Heading = styled.h1`
  font-size: 18px;
  font-weight: 600;
  color: rgb(120, 124, 120);
  margin-bottom: 10px;
  cursor: pointer;
`;

const ParagraphInThumb = styled.p`
  color: #b6c2ca;
  margin-bottom: 10px;
  font-size: 15px;
  font-weight: 700;
`;

const Count = styled.div<Props>`
  display: flex;
  justify-content: flex-start;
  gap: 4%;
  p {
    font-size: 14px;
    color: ${(props) => (props.mode ? "#ccc" : "#333")};
  }
`;

const RetryButton = styled.button`
  background-color: transparent;
  border: 1px solid rgb(214, 215, 211);
  font-size: 14px;
  color: rgb(185, 186, 184);
  padding: 5px 10px;
  cursor: pointer;
`;

const VideosNotFound = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 50vh;
  justify-content: center;
  align-items: center;
`;

const NotFoundImage = styled.img`
  width: 40%;
  margin: 20px;
`;

const Retry = styled.button`
  background-color: transparent;
  border: 1px solid rgb(214, 215, 211);
  font-size: 14px;
  color: rgb(185, 186, 184);
  padding: 5px 10px;
  cursor: pointer;
`;

export {
  EntireVideos,
  Form,
  Search,
  SubmitDiv,
  SubmitButton,
  LoaderContainer,
  Videos,
  BGContainer,
  ThumbnailUrl,
  Outer,
  Profile,
  Inner,
  Heading,
  ParagraphInThumb,
  Count,
  RetryButton,
  VideosNotFound,
  NotFoundImage,
  Retry,
};
