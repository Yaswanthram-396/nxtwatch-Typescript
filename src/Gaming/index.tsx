import React, { useContext, useEffect, useState } from "react";
import { FaGamepad } from "react-icons/fa";
import { ThreeDots } from "react-loader-spinner";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import ConfigurationContext from "../context";

import {
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
} from "./styled";
import {
  IconContainer,
  TrendingHeader,
  TrendingTitle,
} from "../Trending/styled";
export interface InterfaceItem {
  id: string;
  thumbnail_url: string;
  title: string;
  view_count: string;
  published_at: string;
  channel: {
    name: string;
    profile_image_url: string;
  };
}
export default function Gaming() {
  const [allData, setData] = useState([]);
  const [loading, setloading] = useState(false);
  const { mode } = useContext(ConfigurationContext);
  const[error, setError] = useState(false)
  

  const fetchData = async () => {
    const cookieToken = Cookies.get("jwt_token");
    setloading(true);

    try {
      const response = await fetch("https://apis.ccbp.in/videos/gaming", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${cookieToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setData(data.videos);
      setloading(false);
    } catch (error) {
      setError(true)
      // console.error("Error fetching data:", error.message);
      setloading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <TrendingVideos>
      {/* <TendingIcon darkMode={mode}>
        <IconBack darkMode={mode}>
          <FaGamepad title="Trending Icon" />
        </IconBack>
        <TextTrend darkMode={mode}>Gaming</TextTrend>
      </TendingIcon> */}
      <TrendingHeader
      data-testid="Gaming-mode"
        style={
          mode
            ? { backgroundColor: "rgb(24,24,24)" }
            : { backgroundColor: "rgb(241,241,241)" }
        }
      >
        <IconContainer
          style={
            !mode ? { backgroundColor: "#e0e9f0" } : { backgroundColor: "#000" }
          }
        >
          <FaGamepad
            style={{ color: "red", fontSize: " 40px" }}
            title="Trending Icon"
          />
        </IconContainer>
        <TrendingTitle
          style={!mode ? { color: "#000" } : { color: "#fff" }}
          theme={mode}
        >
          Gaming
        </TrendingTitle>
      </TrendingHeader>

      {!loading ? (
        error ? (
          <p className="error">Something went wrong. Please try again!</p>
        ) : 
        allData.length > 0 && (
          <GamingVideo darkMode={mode} data-testid="gaming-videos">
            {allData.map((item: InterfaceItem) => (
              <LinkStyled to={`/video/${item.id}`} as={Link} key={item.id}>
                <BGContainerGaming>
                  <GameVideoPhoto
                    src={item.thumbnail_url}
                    alt="thumbnail_url"
                  />
                  <Outer>
                    <Inner>
                      <Heading darkMode={mode}>{item.title}</Heading>
                      <ParagraphInThumb darkMode={mode}>
                        <p>{`${item.view_count} Watching Worldwide`}</p>
                      </ParagraphInThumb>
                    </Inner>
                  </Outer>
                </BGContainerGaming>
              </LinkStyled>
            ))}
          </GamingVideo>
        )
      ) : (
        <LoaderContainer data-testid="loader">
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="blue"
            ariaLabel="three-dots-loading"
            visible={true}
          />
        </LoaderContainer>
      )}
    </TrendingVideos>
  );
}
