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
            الزمالك أحد أكثر الأندية نجاح في تاريخ كرة القدم المصرية من حيث عدد
            البطولات المحلية، فقد فاز بأربعة عشر لقب دوري، وثمانية وعشرين لقب في
            كأس مصر وأربعة ألقاب من كأس السوبر وأربعة عشر لقب في دوري منطقة
            القاهرة واثنين في كأس السلطان حسين{" "}
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
