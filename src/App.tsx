import { Routes, Route, useNavigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import Home from "../src/Home";
import VideosInHome from "./Home/Sidebar/sidebarSideContent";
import VideoPlayerComponent from "./videoplayer";
import Trending from "./Trending";
import Gaming from "./Gaming";
import { useState, useEffect } from "react";
// import ConfigurationContext from "./context";
import ConfigurationContext from "./context";

import Saved from "./saved";
import Cookies from "js-cookie";
// import { AppStyle } from "../styled/index";
import { AppStyle } from "./styled";

export default function App() {
  const navigate = useNavigate();
  const [savedList, setSavedList] = useState(() => {
    const savedItems = localStorage.getItem("savedList");
    try {
      return savedItems ? JSON.parse(savedItems) : [];
    } catch (e) {
      console.error("Error parsing savedList:", e);
      return [];
    }
  });
  useEffect(() => {
    const cookieToken = Cookies.get("jwt_token");

    if (!cookieToken) {
      navigate("/");
    }
  }, [navigate]);

  const [mode, SetMode] = useState(false);

  const [pagein, setPage] = useState("Home");

  const handleSavedList = (allData: any) => {
    console.log(savedList);
    const isAlreadySaved = savedList.some((item: { id: any; }) => item.id === allData.id);

    if (!isAlreadySaved) {
      const updatedList = [...savedList, allData];
      setSavedList(updatedList);
      localStorage.setItem("savedList", JSON.stringify(updatedList));
    } else {
      const updatedList = savedList.filter((item: { id: any; }) => item.id !== allData.id);
      setSavedList(updatedList);
      localStorage.setItem("savedList", JSON.stringify(updatedList));
      console.log("Item removed from the saved list.");
    }
  };

  const handleMode = () => {
    SetMode((prevMode) => {
      return !prevMode;
    });
  };
  const handlePage = (newItem: string | undefined) => {
    if (
      newItem !== "Home" &&
      newItem !== "Trending" &&
      newItem !== "Gaming" &&
      newItem !== "Saved"
    ) {
      return;
    }
    localStorage.setItem("pagein", newItem);
    setPage(newItem);
  };

  return (
    <ConfigurationContext.Provider
      value={{
        savedList,
        mode,
        pagein,
        handleSavedList,
        handleMode,
        handlePage,
      }}
    >
      <AppStyle mode={mode}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/NxtWatch/Home"
            element={<Home Num={<VideosInHome />} />}
          />
          <Route
            path="/video/:id"
            element={<Home Num={<VideoPlayerComponent />} />}
          />
          <Route
            path="/NxtWatch/Trending"
            element={<Home Num={<Trending />} />}
          />
          <Route path="/NxtWatch/Gaming" element={<Home Num={<Gaming />} />} />
          <Route path="/NxtWatch/Saved" element={<Home Num={<Saved />} />} />
        </Routes>
      </AppStyle>
    </ConfigurationContext.Provider>
  );
}
