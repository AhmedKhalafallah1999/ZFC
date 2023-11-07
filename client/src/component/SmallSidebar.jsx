import { FaTimes } from "react-icons/fa";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import Wrapper from "../assets/wrappers/SmallSidebar";
import { useDashboardContext } from "../pages/DashboardLayout";
const SmallSidebar = () => {
  const { showToggleSideBar, toggleSideBar } = useDashboardContext();
  return (
    <Wrapper>
      <div
        className={
          showToggleSideBar
            ? "sidebar-container show-sidebar"
            : "sidebar-container"
        }
      >
        <div className="content">
          <button type="button" className="close-btn" onClick={toggleSideBar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};
export default SmallSidebar;
