import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Form, Link, redirect, useNavigate } from "react-router-dom";
import { Logo, FormRow } from "../component";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/auth/login", data);
    toast.success("Login success...");

    return redirect("/dashboard");
  } catch (error) {
    console.log(error);
    return toast.error(error?.response?.data?.msg);
  }
};
const Login = () => {
  const navigate = useNavigate();
  const logInUserDemo = async () => {
    const testUser = {
      email: "test@test.com",
      password: "secret123",
    };
    try {
      await customFetch.post("/auth/login", testUser);
      toast.success("take a test drive");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.msg);
    }
  };

  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>
        <FormRow name="email" id="email" type="email" labelText="Email" />
        <FormRow
          name="password"
          id="password"
          type="password"
          labelText="Password"
        />
        <p>
          {" "}
          <Link to={"/reset"} className="member-btn centered">
            Forget your password
          </Link>
        </p>
        <button type="submit" className="btn btn-block">
          submit
        </button>
        <button type="button" className="btn btn-block" onClick={logInUserDemo}>
          Explore The Community
        </button>
        <p>
          A new visitor?
          <Link to={"/register"} className="member-btn">
            Register
          </Link>
        </p>
        <p></p>
      </Form>
    </Wrapper>
  );
};
export default Login;
