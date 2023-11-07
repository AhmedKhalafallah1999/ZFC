import { PostsContainer, SearchContainer } from "../component/index";
const allFans = () => {
  return (
    <>
      <SearchContainer />
      <PostsContainer allFansPost={true} fromWhen={true} />
    </>
  );
};
export default allFans;
