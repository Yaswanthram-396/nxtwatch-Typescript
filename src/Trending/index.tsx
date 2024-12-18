import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { FaFire } from "react-icons/fa";
import { ThreeDots } from "react-loader-spinner";
import ConfigurationContext from "../context";
import {
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
} from "./styled";
import { InterfaceItem } from "../Gaming";
const Trending = () => {
  const [allData, setData] = useState([]);
  const [loading, setloading] = useState(false);
  const { mode } = useContext(ConfigurationContext);
  console.log(mode);
  const fetchData = async () => {
    const cookieToken = Cookies.get("jwt_token");
    setloading(true);

    try {
      const response = await fetch("https://apis.ccbp.in/videos/trending", {
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
      // console.error("Error fetching data:", error.message);
      setloading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <TrendingVideosContainer>
      <TrendingHeader
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
          <FaFire
            style={{ color: "red", fontSize: " 40px" }}
            title="Trending Icon"
          />
        </IconContainer>
        <TrendingTitle
          style={!mode ? { color: "#000" } : { color: "#fff" }}
          theme={mode}
        >
          Trending
        </TrendingTitle>
      </TrendingHeader>
      {!loading ? (
        allData.length > 0 && (
          <VideoDetails style={mode ? { backgroundColor: "rgb(0,0,0)" } : {}}>
            {allData.map((item:InterfaceItem) => (
              <Link key={item.id} to={`/video/${item.id}`}>
                <VideoItemContainer>
                  <VideoThumbnail src={item.thumbnail_url} alt="thumbnail" />
                  <VideoInfo>
                    <VideoTitleText
                      style={!mode ? { color: "#000" } : { color: "#fff" }}
                      theme={mode}
                    >
                      {item.title}
                    </VideoTitleText>
                    <Para mode={mode}>{item.channel.name}</Para>
                    <VideoMetaData>
                      <VideoMetaItem>{`${item.view_count} Views`}</VideoMetaItem>
                      <VideoMetaItem>{item.published_at}</VideoMetaItem>
                    </VideoMetaData>
                  </VideoInfo>
                </VideoItemContainer>
              </Link>
            ))}
          </VideoDetails>
        )
      ) : (
        <LoaderContainer>
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
    </TrendingVideosContainer>
  );
};

export default Trending;
