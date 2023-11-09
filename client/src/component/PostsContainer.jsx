import Wrapper from "../assets/wrappers/PostsContainer";
import { useDashboardContext } from "../pages/DashboardLayout";
import Post from "./Post";
// import PageBtnContainer from "./PageBtnContainer";
const PostsContainer = ({ allFansPost = "userOnly", fromWhen = "" }) => {
  const { userDemo, posts } = useDashboardContext();
  // console.log(posts);
  if (posts.length === 0) {
    return (
      <Wrapper>
        <h2>No Posts to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {/* <h5>{jobCount} job{jobs.length > 1 && "s"} found</h5> */}
      <div className="posts">
        {posts.map((post) => {
          if (
            post.createdBy._id === userDemo._id &&
            allFansPost === "userOnly"
          ) {
            return (
              <Post
                key={post._id}
                {...post}
                fromWhen={fromWhen}
                forDisabled={userDemo._id}
              />
            );
          } else if (allFansPost === true) {
            return (
              <Post
                key={post._id}
                {...post}
                fromWhen={fromWhen}
                forDisabled={userDemo._id}
              />
            );
          }
        })}
      </div>
      {/* {numOfPages > 1 && <PageBtnContainer />} */}
    </Wrapper>
  );
};

export default PostsContainer;
