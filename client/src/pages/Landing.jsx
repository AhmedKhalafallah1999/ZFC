import main from "../assets/images/main-alt.jpg";
// import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Link } from "react-router-dom";
import { Logo } from "../component/index";
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Zamalek <span>Fans</span> Community
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
            tenetur enim veritatis, nisi ratione culpa incidunt architecto
            voluptatem aliquid tempora, beatae labore animi sunt non voluptate
            sapiente fugit quo molestias.
          </p>
          <Link to={"/register"} className="btn register-link">
            Register
          </Link>
          <Link to={"/login"} className="btn">
            Login / Demo user
          </Link>
        </div>
        <img src={main} alt="zamalek" className="img main-img" />
      </div>
    </Wrapper>
  );
};
export default Landing;
