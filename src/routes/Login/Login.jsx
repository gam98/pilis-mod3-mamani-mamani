import "./Login.css";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setCurrentUser } = useContext(UserContext);
  const [dataParsed, setDataParsed] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  let dataStored;
  let dataToStorage;

  useEffect(() => {
    dataStored = localStorage.getItem("data");

    if (dataStored) {
      setDataParsed(JSON.parse(dataStored));
    } else {
      dataToStorage = { user: {}, weathers: [] };
    }
  }, []);

  const onSubmit = (user) => {
    if (!dataParsed) {
      dataToStorage.user = {
        username: user.username,
        password: user.password,
      };

      localStorage.setItem("data", JSON.stringify(dataToStorage));
    } else {
      localStorage.setItem(
        "data",
        JSON.stringify({
          user: { username: user.username, password: user.password },
          weathers: dataParsed.weathers ? [...dataParsed.weathers] : [],
        })
      );
    }
    setCurrentUser(user);
    navigate("/");
  };

  const customSquare = (value) => {
    return { "--i": value };
  };

  return (
    <section className="sesion-container">
      <div className="box">
        <div className="square" style={customSquare(0)}></div>
        <div className="square" style={customSquare(1)}></div>
        <div className="square" style={customSquare(2)}></div>
        <div className="square" style={customSquare(3)}></div>
        <div className="square" style={customSquare(4)}></div>

        <div className="container glassmorphism">
          <div className="form">
            <h2>Login Form</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input__box">
                <input
                  type="text"
                  placeholder="Username"
                  {...register("username", {
                    required: "Must enter a username",
                  })}
                />
                <p className="error-msg">{errors.username?.message}</p>
              </div>
              <div className="input__box">
                <input
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "Must enter a password",
                  })}
                />
                <p className="error-msg">{errors.password?.message}</p>
              </div>
              <div className="input__box">
                <input type="submit" value="Submit" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Login };
