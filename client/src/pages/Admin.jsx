import { FaGrinHearts } from "react-icons/fa";
import {MdPostAdd } from "react-icons/md";

import { useLoaderData, redirect } from "react-router-dom";
import StatItem from "../component/StatItem";
import customFetch from "../utils/customFetch";
import Wrapper from "../assets/wrappers/StatsContainer";
import { toast } from "react-toastify";
export const loader = async () => {
  try {
    const { data } = await customFetch.get("/users/admin/application-stats");
    return data;
  } catch (error) {
    toast.error("You are not authorized to view this page");
    return redirect("/dashboard");
  }
};

const Admin = () => {
  const { users, posts } = useLoaderData();

  return (
    <Wrapper>
      <StatItem
        title="current fans"
        count={users}
        color="#e9b949"
        bcg="#fcefc7"
        icon={<FaGrinHearts />}
      />
      <StatItem
        title="total posts"
        count={posts}
        color="#647acb"
        bcg="#e0e8f9"
        icon={<MdPostAdd />}
      />
    </Wrapper>
  );
};
export default Admin;
