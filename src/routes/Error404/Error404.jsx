import "./Error404.css";
import sun from "./../../assets/sun.svg";
import cloud from "./../../assets/cloud.svg";
const Error404 = () => {
  return (
    <section className="error404">
      <h2 className="error-title">404</h2>
      <div className="error-card">
        <img src={cloud} alt="cloud" className="cloud-img" />
        <div className="sun">
          <img src={sun} alt="sun" className="sun-img" />
        </div>
        <div class="rain">
          <span class="drop"></span>
          <span class="drop"></span>
          <span class="drop"></span>
          <span class="drop"></span>
          <span class="drop"></span>
          <span class="drop"></span>
          <span class="drop"></span>
          <span class="drop"></span>
          <span class="drop"></span>
          <span class="drop"></span>
        </div>
      </div>
      <p class="text primary">Look like you're lost</p>
      <p class="text secondary">the page you are looking for not avaible!</p>
      <button class="btn-go-to-home">Go to home</button>
    </section>
  );
};

export { Error404 };
