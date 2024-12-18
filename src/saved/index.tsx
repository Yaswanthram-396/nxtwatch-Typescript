import React, { useContext, useEffect } from "react";
import { MdVideoLibrary } from "react-icons/md";
import { Link } from "react-router-dom";
import {
  TrendingVideos,
  Outer,
  Inner,
  Heading,
  ParagraphInThumb,
} from "../Gaming/styled";
import {
  IconContainer,
  TrendingHeader,
  TrendingTitle,
} from "../Trending/styled";
import {
  VideoContainer,
  NoSavedContainer,
  NoSavedImage,
  BGContainer2,
  VideoPhoto,
  NoVideosText,
  NoVideosSubText,
} from "./styled";
import { Count } from "../Home/Sidebar/videosAnSearch/styled";
import ConfigurationContext from "../context";
// import { InterfaceItem } from "../Gaming";
import { VideoType } from "../context";
export default function Saved() {
  const { savedList, mode } = useContext(ConfigurationContext);

  useEffect(() => {
    console.log(savedList);
  }, [savedList]);

  return (
    <>
      {savedList.length > 0 ? (
        <>
          <TrendingVideos>
            <TrendingHeader
              style={{
                backgroundColor: mode ? "rgb(24,24,24)" : "rgb(241,241,241)",
              }}
            >
              <IconContainer
                style={{
                  backgroundColor: mode ? "#000" : "#e0e9f0",
                }}
              >
                <MdVideoLibrary
                  style={{ color: "red", fontSize: " 40px" }}
                  title="Trending Icon"
                />
              </IconContainer>
              <TrendingTitle
                style={{ color: mode ? "#fff" : "#000" }}
                theme={mode}
              >
                Saved
              </TrendingTitle>
            </TrendingHeader>
            <VideoContainer darkMode={mode}>
              {savedList.map((item:VideoType) => (
                <Link to={`/video/${item.id}`} key={item.id}>
                  <BGContainer2>
                    <VideoPhoto src={item.thumbnail_url} alt="thumbnail_url" />
                    <Outer>
                      <Inner>
                        <Heading darkMode={mode}>{item.title}</Heading>
                        <ParagraphInThumb mode={mode}>
                          <p>{item.channel.name}</p>
                        </ParagraphInThumb>
                        <Count mode={mode}>
                          <p>{`${item.view_count} Views`}</p>
                          <p>{item.published_at}</p>
                        </Count>
                      </Inner>
                    </Outer>
                  </BGContainer2>
                </Link>
              ))}
            </VideoContainer>
          </TrendingVideos>
        </>
      ) : (
        <NoSavedContainer darkMode={mode}>
          <div style={{ margin: " auto", display: "contents", width: "48%" }}>
            <NoSavedImage
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
              alt="No saved videos"
            />
            <NoVideosText darkMode={mode}>No saved videos found</NoVideosText>
            <NoVideosSubText darkMode={mode}>
              You can save your videos while watching them.
            </NoVideosSubText>
          </div>
        </NoSavedContainer>
      )}
    </>
  );
}
