import { FormRow, Logo } from "../component";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Link, Form, redirect, useNavigation } from "react-router-dom";
import customFetch from "../utils/customFetch.js";
import { toast } from "react-toastify";
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  try {
    await customFetch.post("/auth/register", data);
    toast.success("Account created successfully...");
    return redirect("/login");
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.msg);
    return error;
  }
};
const Register = () => {
  const navigate = useNavigation();
  const isSubmitting = navigate.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow
          name="name"
          defaultValue="Big"
          id="name"
          type="text"
          labelText="First Name"
        />
        <FormRow
          name="lastName"
          defaultValue="Fan"
          id="name"
          type="text"
          labelText="Last Name"
        />
        <FormRow
          name="email"
          defaultValue="fan@zamalek.com"
          id="email"
          type="email"
          labelText="Email"
        />
        <FormRow
          name="password"
          defaultValue="secret123"
          id="password"
          type="password"
          labelText="Password"
        />
        <FormRow
          name="location"
          defaultValue="Cairo"
          id="city"
          type="text"
          labelText="City"
        />
        <FormRow
          name="bio"
          defaultValue="I'm a fan of the white"
          id="bio"
          type="text"
          labelText="Bio"
        />

        <button className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? "submitting..." : "submit"}
        </button>
        <p>
          Already a member?
          <Link to={"/login"} className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Register;
