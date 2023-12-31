import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Login,
  Register,
  Landing,
  HomeLayout,
  DashboardLayout,
  EditPost,
  Stats,
  Profile,
  Adimn,
  AllFans,
  AddPost,
  Error,
  ResetPassword,
  EnterNewPassword,
} from "./pages/index";
import { action as actionRegister } from "./pages/Register";
import { action as actionLogin } from "./pages/Login";
import { loader as LoaderCurrentUser } from "./pages/DashboardLayout";
import { action as ActionAddPost } from "./pages/AddPost";
import { loader as LoaderEditPost } from "./pages/EditPost";
import { action as ActionUpdatePost } from "./pages/EditPost";
import { action as ActionDeletePost } from "./pages/DeletePost";
import { loader as LoaderAppStats } from "./pages/Admin";
import { action as ActionProfile } from "./pages/Profile";
import { action as ActionResetPassword } from "./pages/ResetPassword";
import { action as ActionEnterNewPassword } from "./pages/EnterNewPassword";
import "./App.css";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "/register",
        element: <Register />,
        action: actionRegister,
      },
      {
        path: "/login",
        element: <Login />,
        action: actionLogin,
      },
      {
        path: "/reset",
        element: <ResetPassword />,
        action: ActionResetPassword,
      },
      {
        path: "/reset/:token",
        element: <EnterNewPassword />,
        action: ActionEnterNewPassword,
      },
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        loader: LoaderCurrentUser,

        children: [
          {
            index: true,
            element: <AddPost />,
            action: ActionAddPost,
          },
          {
            path: "admin",
            element: <Adimn />,
            loader: LoaderAppStats,
          },
          {
            path: "profile",
            element: <Profile />,
            action: ActionProfile,
          },
          {
            path: "delete-post/:id",
            action: ActionDeletePost,
          },
          {
            path: "edit-post/:id",
            element: <EditPost />,
            loader: LoaderEditPost,
            action: ActionUpdatePost,
          },

          {
            path: "stats",
            element: <Stats />,
          },

          {
            path: "all-fans",
            element: <AllFans />,
          },
        ],
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router}></RouterProvider>;
}
export default App;
