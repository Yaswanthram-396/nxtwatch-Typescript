// import React from "react";
// import { ThreeDots } from "react-loader-spinner";
// import Cookies from "js-cookie";
// import { FaSearch } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import ConfigurationContext from "../../../context";
// import {
//   EntireVideos,
//   Form,
//   Search,
//   SubmitDiv,
//   SubmitButton,
//   LoaderContainer,
//   Videos,
//   BGContainer,
//   ThumbnailUrl,
//   Outer,
//   Profile,
//   Inner,
//   Heading,
//   ParagraphInThumb,
//   Count,
//   RetryButton,
//   VideosNotFound,
//   NotFoundImage,
//   Retry,
// } from "./styled";
// class GetApiRes extends React.Component {
//   static contextType = ConfigurationContext;
//   constructor(props: any) {
//     super(props);

//     this.state = {
//       searchInput: "",
//       DataApi: { videos: [] },
//       loading: true,
//     };
//   }

//   componentDidMount = async () => {
//     await this.fetchData();
//   };

//   fetchData = async () => {
//     const cookieToken = Cookies.get("jwt_token");
//     const { searchInput } = this.state;

//     this.setState({ loading: true });

//     try {
//       const response = await fetch(
//         `https://apis.ccbp.in/videos/all?search=${searchInput}`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${cookieToken}`,
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to fetch data");
//       }

//       const data = await response.json();
//       this.setState({ DataApi: data, loading: false });
//     } catch (error) {
//       console.error("Error fetching data:", error.message);
//       this.setState({ loading: false });
//     }
//   };

//   handleSearchInput = (e) => {
//     this.setState({ searchInput: e.target.value });
//   };

//   handleSubmit = (e) => {
//     e.preventDefault();
//     this.fetchData();
//   };

//   render() {
//     const { searchInput, DataApi, loading } = this.state;
//     const videosArray = DataApi.videos;

//     return (
//       <>
//         <EntireVideos>
//           <Form onSubmit={this.handleSubmit}>
//             <Search
//               type="text"
//               mode={this.context.mode}
//               onChange={this.handleSearchInput}
//               value={searchInput}
//               placeholder="Search"
//             />
//             <SubmitDiv type="submit" onClick={this.handleSubmit}>
//               <FaSearch />
//             </SubmitDiv>
//           </Form>
//           {console.log(this.context.mode)}
//           {loading ? (
//             <LoaderContainer data-testid="loader">
//               <ThreeDots
//                 height="80"
//                 width="80"
//                 radius="9"
//                 color="blue"
//                 ariaLabel="three-dots-loading"
//                 visible={true}
//               />
//             </LoaderContainer>
//           ) : videosArray.length > 0 ? (
//             <Videos>
//               {videosArray.map((item) => (
//                 <Link key={item.id} to={`/video/${item.id}`}>
//                   <BGContainer>
//                     <ThumbnailUrl
//                       src={item.thumbnail_url}
//                       alt="thumbnail_url"
//                     />
//                     <Outer>
//                       <Profile
//                         src={item.channel.profile_image_url}
//                         alt="profile_image_url"
//                       />
//                       <Inner>
//                         <Heading>{item.title}</Heading>
//                         <ParagraphInThumb>{item.channel.name}</ParagraphInThumb>
//                         <Count>
//                           <ParagraphInThumb>{`${item.view_count} Views`}</ParagraphInThumb>
//                           <ParagraphInThumb>
//                             {item.published_at}
//                           </ParagraphInThumb>
//                         </Count>
//                       </Inner>
//                     </Outer>
//                   </BGContainer>
//                 </Link>
//               ))}
//             </Videos>
//           ) : (
//             <VideosNotFound>
//               <NotFoundImage
//                 src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
//                 alt="Not Found"
//               />
//               <h3>No Search results found</h3>
//               <Heading>Try different keywords or remove search.</Heading>
//               <RetryButton onClick={this.handleSubmit}>Retry</RetryButton>
//             </VideosNotFound>
//           )}
//         </EntireVideos>
//       </>
//     );
//   }
// }

// export default GetApiRes;


import React, { ChangeEvent, FormEvent } from "react";
import { ThreeDots } from "react-loader-spinner";
import Cookies from "js-cookie";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import ConfigurationContext, { ConfigurationContextType } from "../../../context";
import {
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
} from "./styled";

// Define the types for the API response
interface Video {
  id: string;
  title: string;
  thumbnail_url: string;
  channel: {
    name: string;
    profile_image_url: string;
  };
  view_count: number;
  published_at: string;
}

interface DataApi {
  videos: Video[];
}

// Define the component state types
interface GetApiResState {
  searchInput: string;
  DataApi: DataApi;
  loading: boolean;
}

class GetApiRes extends React.Component<{}, GetApiResState> {
  static contextType = ConfigurationContext;
  context!: ConfigurationContextType; // Type the context value

  constructor(props: {}) {
    super(props);
    this.state = {
      searchInput: "",
      DataApi: { videos: [] },
      loading: true,
    };
  }

  componentDidMount = async () => {
    await this.fetchData();
  };

  // Fetch data from the API
  fetchData = async () => {
    const cookieToken = Cookies.get("jwt_token");
    const { searchInput } = this.state;

    this.setState({ loading: true });

    try {
      const response = await fetch(
        `https://apis.ccbp.in/videos/all?search=${searchInput}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${cookieToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      this.setState({ DataApi: data, loading: false });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      this.setState({ loading: false });
    }
  };

  // Handle the search input change
  handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchInput: e.target.value });
  };

  // Handle the form submit
  handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    this.fetchData();
  };

  render() {
    const { searchInput, DataApi, loading } = this.state;
    const videosArray = DataApi.videos;

    return (
      <>
        <EntireVideos data-testid="api-response">
          <Form onSubmit={this.handleSubmit}>
            <Search
              type="text"
              mode={this.context.mode}
              onChange={this.handleSearchInput}
              value={searchInput}
              placeholder="Search"
            />
            <SubmitDiv  onClick={this.handleSubmit} 
              data-testid="search-videos"
              >
              <FaSearch data-testid="search-icon"/>
            </SubmitDiv>
          </Form>

          {loading ? (
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
          ) : videosArray.length > 0 ? (
            <Videos>
              {videosArray.map((item) => (
                <Link key={item.id} to={`/video/${item.id}`}>
                  <BGContainer>
                    <ThumbnailUrl
                      src={item.thumbnail_url}
                      alt="thumbnail_url"
                    />
                    <Outer>
                      <Profile
                        src={item.channel.profile_image_url}
                        alt="profile_image_url"
                      />
                      <Inner>
                        <Heading>{item.title}</Heading>
                        <ParagraphInThumb>{item.channel.name}</ParagraphInThumb>
                        <Count>
                          <ParagraphInThumb>{`${item.view_count} Views`}</ParagraphInThumb>
                          <ParagraphInThumb>
                            {item.published_at}
                          </ParagraphInThumb>
                        </Count>
                      </Inner>
                    </Outer>
                  </BGContainer>
                </Link>
              ))}
            </Videos>
          ) : (
            <VideosNotFound>
              <NotFoundImage
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
                alt="Not Found"
              />
              <h3>No Search results found</h3>
              <Heading>Try different keywords or remove search.</Heading>
              <RetryButton onClick={this.handleSubmit}>Retry</RetryButton>
            </VideosNotFound>
          )}
        </EntireVideos>
      </>
    );
  }
}

export default GetApiRes;
