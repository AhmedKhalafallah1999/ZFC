import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Form, redirect } from "react-router-dom";
import { Logo, FormRow } from "../component";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const response = await customFetch.post("/auth/resetpassword", data);
    if (response.data.success) {
      emailjs
        .sendForm(
          "service_khalafestien_Por",
          "template_9f0slka",
          data,
          "BGrNSLCJUor1YkkSR"
        )
        .then(
          (result) => {
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          }
        );
      return toast.success(
        "an Email send to your emaill, with an authorized link, to enter a new password..."
      );
    }
    return redirect("/reset");
  } catch (error) {
    console.log(error);
    return toast.error(error?.response?.data?.msg);
  }
};
const ResetPassword = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Enter your email</h4>
        <FormRow name="email" id="email" type="email" labelText="Email" />
        <button type="submit" className="btn btn-block">
          Reset
        </button>
      </Form>
    </Wrapper>
  );
};
export default ResetPassword;
