import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Form, Link, redirect } from "react-router-dom";
import { Logo, FormRow } from "../component";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console
  try {
    await customFetch.post("/auth/login", data);
    toast.success("Login success...");
    return redirect("/dashboard");
  } catch (error) {
    return toast.error(error?.response?.data?.msg);
  }
};
const Login = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>
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
        <button className="btn btn-block">submit</button>
        <button className="btn btn-block">Explore The Community</button>
        <p>
          A new visitor?
          <Link to={"/register"} className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Login;
