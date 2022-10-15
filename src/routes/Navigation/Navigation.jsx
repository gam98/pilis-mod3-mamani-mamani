import "./Navigation.css";
import { Link, Outlet } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { FaPlus, FaRegStar, FaRegMoon, FaAlignJustify } from "react-icons/fa";
import { BiHome } from "react-icons/bi";
import { FaUserMinus, FaUserPlus } from "react-icons/fa";
import { UserContext } from "../../context/UserContext";
import logo from "./../../assets/logo.png";

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const [clicked, setClicked] = useState(false);
  let dataParsed;
  useEffect(() => {
    const dataStored = localStorage.getItem("data");

    if (dataStored) {
      dataParsed = JSON.parse(dataStored);
      setCurrentUser(dataParsed.user);
    }
  }, []);

  const handleSignOut = () => {
    setCurrentUser(null);
    if (dataParsed) {
      localStorage.setItem(
        "data",
        JSON.stringify({ user: {}, weathers: [dataParsed.weathers] })
      );
      return;
    }

    const dataStored = localStorage.getItem("data");
    dataParsed = JSON.parse(dataStored);

    localStorage.setItem(
      "data",
      JSON.stringify({ user: {}, weathers: dataParsed.weathers })
    );
  };

  const handleClick = () => {
    setClicked(!clicked);
  };

  window.addEventListener("resize", () => setClicked(false));
  window.addEventListener("scroll", () => setClicked(false));

  return (
    <>
      <header className="header heavy-glassmorphism">
        <div className="header-menu">
          <Link to="/">
            <img src={logo} alt="logo" className="logo" />
          </Link>
          <div className="header-btns">
            <button className="btn-icon">
              <FaRegMoon />
            </button>
            <button className="btn-icon" onClick={handleClick}>
              <FaAlignJustify />
            </button>
          </div>
        </div>

        <nav
          className={`${
            clicked
              ? "nav-menu heavy-glassmorphism-menu isActive"
              : "nav-menu heavy-glassmorphism-menu"
          }`}
        >
          <ul className="nav-items">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <BiHome />
                <span className="nav-link-text">Home</span>
              </Link>
            </li>

            {currentUser && (
              <li className="nav-item">
                <Link className="nav-link add-more" to="/weather-card/create">
                  <FaPlus />
                  <span className="nav-link-text">Create</span>
                </Link>
              </li>
            )}
            {currentUser && (
              <li className="nav-item">
                <Link className="nav-link">
                  <FaRegStar />
                  <span className="nav-link-text">Favorites</span>
                </Link>
              </li>
            )}

            <li className="nav-item">
              {currentUser ? (
                <Link className="nav-link" to="login" onClick={handleSignOut}>
                  <FaUserMinus />
                  <span className="nav-link-text">Logout</span>
                </Link>
              ) : (
                <Link className="nav-link" to="login">
                  <FaUserPlus />
                  <span className="nav-link-text">Login</span>
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
};

export { Navigation };
