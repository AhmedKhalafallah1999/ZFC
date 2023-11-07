import { Form, redirect, useLoaderData } from "react-router-dom";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow } from "../component";
import { useNavigation } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/posts/get-post/${params.id}`);
    return data;
  } catch (error) {
    return error;
  }
};
export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.patch(`/posts/edit-post/${params.id}`, data);
    toast.success("Post Updated");
    return redirect("/dashboard");
  } catch (error) {
    return toast.error(error?.response?.data?.msg);
  }
};
const EditPost = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const { userPost } = useLoaderData();
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">add Post</h4>
        <div className="form-center">
          <FormRow
            type="text"
            labelText="Your thought"
            name="post"
            defaultValue={userPost.post}
            className="space"
          />

          <button
            type="submit"
            className="btn btn-block form-btn "
            disabled={isSubmitting}
          >
            {isSubmitting ? "Editing..." : "Edit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditPost;
