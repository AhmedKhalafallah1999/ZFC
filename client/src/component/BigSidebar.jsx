import NavLinks from "./NavLinks";
import Logo from "./Logo";
import Wrapper from "../assets/wrappers/BigSidebar";
import { useDashboardContext } from "../pages/DashboardLayout";
const BigSidebar = () => {
  const { showToggleSideBar } = useDashboardContext();
  return (
    <Wrapper>
      <div
        className={
          showToggleSideBar
            ? "sidebar-container hideSideBar"
            : "sidebar-container"
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks isBigSideBar />
        </div>
      </div>
    </Wrapper>
  );
};
export default BigSidebar;
