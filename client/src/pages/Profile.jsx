import { FormRow } from "../component";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useNavigation, Form } from "react-router-dom";
import { useDashboardContext } from "./DashboardLayout";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
export const action = async ({ request }) => {
  const formData = await request.formData();
  const file = formData.get("avatar");
  console.log(file);
  if (file && file.size > 500000) {
    toast.error("sorry, Image size too large");
    return null;
  }
  try {
    await customFetch.patch("/users/update-user", formData);
    toast.success("Profile updated successfully");
    return null;
  } catch (error) {
    console.log(error);
    return toast.error(error?.response?.data?.msg);
  }
};
const Profile = () => {
  const navigate = useNavigation();
  const isSubmitting = navigate.state === "submitting";
  const { userDemo } = useDashboardContext();
  // console.log(userDemo);
  const { email, bio, name, lastName, location } = userDemo;
  return (
    <Wrapper>
      <Form method="post" className="form" encType="multipart/form-data">
        <h4 className="form-title">profile</h4>
        <div className="form-center">
          <div className="form-row">
            <label htmlFor="image" className="form-label">
              Select an image file (max 0.5 MB):
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              className="form-input"
              accept="image/*"
            />
          </div>
          <FormRow
            type="text"
            name="name"
            labelText="First Name"
            defaultValue={name}
          ></FormRow>
          <FormRow
            type="text"
            name="lastName"
            labelText="Last Name"
            defaultValue={lastName}
          ></FormRow>
          <FormRow
            type="email"
            name="email"
            labelText="Email"
            defaultValue={email}
          ></FormRow>
          <FormRow
            type="text"
            name="location"
            labelText="Location"
            defaultValue={location}
          ></FormRow>
          <FormRow
            type="text"
            name="bio"
            labelText="Bio"
            defaultValue={bio}
          ></FormRow>
          <button
            className="btn btn-block form-btn"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "submitting..." : "save changes"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};
export default Profile;
