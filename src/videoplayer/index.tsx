import React, { useEffect, useState, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { FaThumbsUp, FaThumbsDown, FaBookmark } from "react-icons/fa";
import ConfigurationContext from "../context";
import { ThreeDots } from "react-loader-spinner";
import {
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
} from "./styled";

// Define types for video details
type Channel = {
  profile_image_url: string;
  name: string;
  subscriber_count: string;
};

type VideoDetails = {
  id: string;
  title: string;
  video_url: string;
  view_count: string;
  published_at: string;
  description: string;
  channel?: Channel;
};

// Define context type


export default function VideoPlayerComponent() {
  const [isSaved, setIsSaved] = useState(false);
  const [disliked, setDislike] = useState(false);
  const [disLikeList, setDisLikeList] = useState<VideoDetails[]>(() => {
    const savedItems = localStorage.getItem("dislikeList");
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [liked, setLiked] = useState(false);
  const [likeList, setLikeList] = useState<VideoDetails[]>(() => {
    const savedItems = localStorage.getItem("likeList");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  const { handleSavedList, mode } = useContext(ConfigurationContext) ;
  const { id } = useParams<{ id: string }>();
  const [allData, setData] = useState< any>(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const onClickHandleSavedList = () => {
    if (allData) {
      handleSavedList(allData);
      const savedListString = localStorage.getItem("savedList");
      const savedList: VideoDetails[] = savedListString ? JSON.parse(savedListString) : [];
      const isAlreadySaved = savedList.some((item) => item.id === id);
      setIsSaved(isAlreadySaved);
    }
  };

  const onClickHandleDislikeList = () => {
    if (allData) {
      const isAlreadyDisliked = disLikeList.some((item) => item.id === id);

      if (isAlreadyDisliked) {
        const updatedDislikeList = disLikeList.filter((item) => item.id !== id);
        setDisLikeList(updatedDislikeList);
        localStorage.setItem("dislikeList", JSON.stringify(updatedDislikeList));
        setDislike(false);
      } else {
        const updatedDislikeList = [...disLikeList, allData];
        setDisLikeList(updatedDislikeList);
        localStorage.setItem("dislikeList", JSON.stringify(updatedDislikeList));
        setDislike(true);

        const updatedLikeList = likeList.filter((item) => item.id !== id);
        setLikeList(updatedLikeList);
        localStorage.setItem("likeList", JSON.stringify(updatedLikeList));
        setLiked(false);
      }
    }
  };

  const onClickHandleLikeList = () => {
    if (allData) {
      const isAlreadyLiked = likeList.some((item) => item.id === id);

      if (isAlreadyLiked) {
        const updatedLikeList = likeList.filter((item) => item.id !== id);
        setLikeList(updatedLikeList);
        localStorage.setItem("likeList", JSON.stringify(updatedLikeList));
        setLiked(false);
      } else {
        const updatedLikeList = [...likeList, allData];
        setLikeList(updatedLikeList);
        localStorage.setItem("likeList", JSON.stringify(updatedLikeList));
        setLiked(true);

        const updatedDislikeList = disLikeList.filter((item) => item.id !== id);
        setDisLikeList(updatedDislikeList);
        localStorage.setItem("dislikeList", JSON.stringify(updatedDislikeList));
        setDislike(false);
      }
    }
  };

  const fetchData = async () => {
    const cookieToken = Cookies.get("jwt_token");
    setLoading(true);

    try {
      const response = await fetch(`https://apis.ccbp.in/videos/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${cookieToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setData(data.video_details);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", (error as Error).message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem("savedList") || "[]") as VideoDetails[];
    const disList = JSON.parse(localStorage.getItem("dislikeList") || "[]") as VideoDetails[];
    const likeList = JSON.parse(localStorage.getItem("likeList") || "[]") as VideoDetails[];

    setIsSaved(savedList.some((item) => item.id === id));
    setDislike(disList.some((item) => item.id === id));
    setLiked(likeList.some((item) => item.id === id));
  }, [location, id]);

  const videoUrl = allData?.video_url;
  const videoId = videoUrl ? videoUrl.split("=")[1] : null;

  return (
    <>
      {!loading ? (
        <TotalVideo mode={mode}>
          <VideoPlayer>
            <VideoIframe
              src={videoId ? `https://www.youtube.com/embed/${videoId}` : ""}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <VideoInfo>
              <VideoTitle>{allData?.title}</VideoTitle>
              <Media>
                <ViewCount>
                  <p>{`${allData?.view_count} views`}</p>
                  <p>{allData?.published_at}</p>
                </ViewCount>
                <Liked>
                  <Interaction onClick={onClickHandleLikeList} active={liked}>
                    <FaThumbsUp /> Like
                  </Interaction>
                  <Interaction onClick={onClickHandleDislikeList} active={disliked}>
                    <FaThumbsDown /> Dislike
                  </Interaction>
                  <Interaction onClick={onClickHandleSavedList} active={isSaved}>
                    <FaBookmark /> {isSaved ? "Saved" : "Save"}
                  </Interaction>
                </Liked>
              </Media>

              {allData?.channel && (
                <ProfileWrapper>
                  <Image src={allData.channel.profile_image_url} alt="profile_image_url" />
                  <ProfileDescription>
                    <h3>{allData.channel.name}</h3>
                    <DarkParagraph>{allData.description}</DarkParagraph>
                    <p>{`${allData.channel.subscriber_count} Subscribers`}</p>
                  </ProfileDescription>
                </ProfileWrapper>
              )}
            </VideoInfo>
          </VideoPlayer>
        </TotalVideo>
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
    </>
  );
}
