import { FormRow } from "../component";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";
import { PostsContainer, SearchContainer } from "../component/index";
import customFetch from "../utils/customFetch";
import { useDashboardContext } from "./DashboardLayout";
let name, bio;
export const action = async ({ request }) => {
  const formData = await request.formData();
  let post = Object.fromEntries(formData);
  post.name = name;
  post.bio = bio;
  console.log(post);

  try {
    await customFetch.post("/posts/add-post", post);
    toast.success("Post added");
    return null;
  } catch (error) {
    return toast.error(error?.response?.data?.msg);
  }
};

const AddPost = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const { userDemo } = useDashboardContext();
  name = userDemo.name;
  bio = userDemo.bio;
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">add Post</h4>
        <div className="form-center">
          <FormRow
            type="text"
            labelText="Your thought"
            name="post"
            placeholder="write your post here,"
            className="space"
          />

          <button
            type="submit"
            className="btn btn-block form-btn "
            disabled={isSubmitting}
          >
            {isSubmitting ? "Share is waiting..." : "Share"}
          </button>
        </div>
      </Form>
      <SearchContainer />
      <PostsContainer />
    </Wrapper>
  );
};

export default AddPost;
