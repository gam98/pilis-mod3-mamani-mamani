import "./Error404.css";
import sun from "./../../assets/sun.svg";
import cloud from "./../../assets/cloud.svg";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <section className="error404">
      <div className="error-container glassmorphism">
        <h2 className="error-title">404</h2>
        <div className="error-card">
          <img src={cloud} alt="cloud" className="cloud-img" />
          <div className="sun">
            <img src={sun} alt="sun" className="sun-img" />
          </div>
          <div className="rain">
            <span className="drop"></span>
            <span className="drop"></span>
            <span className="drop"></span>
            <span className="drop"></span>
            <span className="drop"></span>
            <span className="drop"></span>
            <span className="drop"></span>
            <span className="drop"></span>
            <span className="drop"></span>
            <span className="drop"></span>
          </div>
        </div>
        <p className="text primary">Look like you're lost</p>
        <p className="text secondary">
          the page you are looking for not avaible!
        </p>
        <Link className="btn-go-to-home" to="/">
          Go to home
        </Link>
      </div>
    </section>
  );
};

export { Error404 };
