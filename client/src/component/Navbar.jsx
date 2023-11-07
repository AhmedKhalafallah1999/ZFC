import { FaAlignLeft } from "react-icons/fa";
import Wrapper from "../assets/wrappers/Navbar";
import LogoutContainer from "./LogoutContainer";
import Logo from "./Logo";
import { useDashboardContext } from "../pages/DashboardLayout";
const Navbar = () => {
  const { toggleSideBar } = useDashboardContext();
  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggleSideBar}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h4 className="logo-text">dashboard</h4>
        </div>
        <div className="btn-container">
          {/* <ThemeToggle/> */}
          <LogoutContainer />
        </div>
      </div>
    </Wrapper>
  );
};
export default Navbar;
