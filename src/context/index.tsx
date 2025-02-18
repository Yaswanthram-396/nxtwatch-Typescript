// import React from "react";

// const ConfigurationContext = React.createContext({
//   savedList: [],
//   mode: false,
//   pagein: "Home",
//   handleSavedList: (allData: {}) => {},
//   handleMode: () => {},
//   handlePage: (newItem: string | undefined) => {},
// });
// export default ConfigurationContext;
import React from "react";
interface Channel {
  profile_image_url: string;
  name: string;
  subscriber_count: string;
}

export interface VideoType {
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

// interface Channel {
//   profile_image_url: string;
//   name: string;
//   subscriber_count: string;
// }


// export interface AllData {
//   id: string;
//   title: string;
//   video_url: string;
//   view_count: string;
//   published_at: string;
//   description: string;
//   channel?: Channel;
// }
// type Channel = {
//   profile_image_url: string;
//   name: string;
//   subscriber_count: string;
// };



export interface ConfigurationContextType {
  savedList: VideoType[] ; 
  mode: boolean;
  pagein: string;
  handleSavedList: (allData: VideoType[] ) => void; 
  handleMode: () => void; 
  handlePage: (newItem: string | undefined) => void;
}


const ConfigurationContext = React.createContext<ConfigurationContextType>({
  savedList: [],
  mode: false,
  pagein: "Home", 
  handleSavedList: () => {}, 
  handleMode: () => {}, 
  handlePage: () => {}, 
});

export default ConfigurationContext;
