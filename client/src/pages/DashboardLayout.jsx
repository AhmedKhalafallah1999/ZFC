import { Outlet, redirect, useLoaderData } from "react-router-dom";
import { BigSidebar, Navbar, SmallSidebar } from "../component/index";
import Wrapper from "../assets/wrappers/Dashboard";
import { useContext, createContext, useState } from "react";
import customFetch from "../utils/customFetch";
const DashoardContext = createContext();
export const loader = async () => {
  try {
    const currentUser = await customFetch.get("/users/current-user");
    const posts = await customFetch.get("/posts/get-all-posts");
    const postsWithCurrentUser = {
      posts: posts.data.userPosts,
      userDemo: currentUser.data,
    };
    return postsWithCurrentUser;
  } catch (error) {
    return redirect("/");
  }
};

const DashboardLayout = () => {
  const [showToggleSideBar, setToggleSideBar] = useState(false);
  const toggleSideBar = () => {
    setToggleSideBar(!showToggleSideBar);
    console.log(showToggleSideBar);
  };
  const { posts, userDemo } = useLoaderData();
  return (
    <DashoardContext.Provider
      value={{ userDemo, toggleSideBar, showToggleSideBar, posts }}
    >
      <Wrapper>
        <main className="dashboard">
          <BigSidebar />
          <SmallSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashoardContext.Provider>
  );
};
export const useDashboardContext = () => useContext(DashoardContext);
export default DashboardLayout;
