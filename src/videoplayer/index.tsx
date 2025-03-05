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



export default function VideoPlayerComponent() {
  const [isSaved, setIsSaved] = useState(false);
  const [disliked, setDislike] = useState(false);
  const [error, setError] = useState(false);  
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
    if (!allData) return;

    setDisLikeList(prevList => {
      const isAlreadyDisliked = prevList.some(item => item.id === allData.id);
      
      if (isAlreadyDisliked) {
        const newList = prevList.filter(item => item.id !== allData.id);
        localStorage.setItem("dislikeList", JSON.stringify(newList));
        setDislike(false);
        return newList;
      } else {
        setLikeList(prevLikeList => {
          const newLikeList = prevLikeList.filter(item => item.id !== allData.id);
          localStorage.setItem("likeList", JSON.stringify(newLikeList));
          return newLikeList;
        });
        setLiked(false);
        
        const newList = [...prevList, allData];
        localStorage.setItem("dislikeList", JSON.stringify(newList));
        setDislike(true);
        return newList;
      }
    });
  };

  const onClickHandleLikeList = () => {
    if (!allData) return;

    setLikeList(prevList => {
      const isAlreadyLiked = prevList.some(item => item.id === allData.id);
      
      if (isAlreadyLiked) {
        const newList = prevList.filter(item => item.id !== allData.id);
        localStorage.setItem("likeList", JSON.stringify(newList));
        setLiked(false);
        return newList;
      } else {
        setDisLikeList(prevDislikeList => {
          const newDislikeList = prevDislikeList.filter(item => item.id !== allData.id);
          localStorage.setItem("dislikeList", JSON.stringify(newDislikeList));
          return newDislikeList;
        });
        setDislike(false);
        
        const newList = [...prevList, allData];
        localStorage.setItem("likeList", JSON.stringify(newList));
        setLiked(true);
        return newList;
      }
    });
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
      setError(true)
      setLoading(false);
    }
  };


  const videoUrl = allData?.video_url;
  const videoId = videoUrl ? videoUrl.split("=")[1] : null;

  return (
    <>
      {!loading ? (
        error?<p>Video not avilable</p>:
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
                  <Interaction onClick={onClickHandleLikeList} data-testid="like" active={liked}>
                    <FaThumbsUp /> Like
                  </Interaction>
                  <Interaction onClick={onClickHandleDislikeList} data-testid="dislike" active={disliked}>
                    <FaThumbsDown /> Dislike
                  </Interaction>
                  <Interaction data-testid="saved-element" onClick={onClickHandleSavedList} active={isSaved}>
                    <FaBookmark /> {isSaved ? "Saved" : "Save"}
                  </Interaction>
                </Liked>
              </Media>

              {allData?.channel && (
                <ProfileWrapper>
                  <Image   data-testid="channel-profile-image" src={allData.channel.profile_image_url} alt="profile_image_url" />
                  <ProfileDescription>
                    <h3 data-testid="channel-name">{allData.channel.name}</h3>
                    <DarkParagraph data-testid="video-description">{allData.description}</DarkParagraph>
                    <p  data-testid="view-count">{`${allData.channel.subscriber_count} Subscribers`}</p>
                  </ProfileDescription>
                </ProfileWrapper>
              )}
            </VideoInfo>
          </VideoPlayer>
        </TotalVideo>
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
    </>
  );
}
