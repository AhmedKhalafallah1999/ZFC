import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Form, redirect } from "react-router-dom";
import { Logo, FormRow } from "../component";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post(`/auth/reset/${params.token}`, data);
    toast.success("Password changed successfully...");
    return redirect("/login");
  } catch (error) {
    console.log(error);
    return toast.error(error?.response?.data?.msg);
  }
};
const EnterNewPassword = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <FormRow
          name="password"
          id="password"
          type="password"
          labelText="Password"
        />
        <button type="hidden" name="token" value={""}></button>
        <button type="hidden" name="userId" value={""}></button>
        <button type="submit" className="btn btn-block">
          Update
        </button>
      </Form>
    </Wrapper>
  );
};
export default EnterNewPassword;
