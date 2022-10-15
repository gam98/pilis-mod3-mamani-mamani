import { Route, Routes } from "react-router-dom";
import { Home } from "./routes/Home/Home";
import { Login } from "./routes/Login/Login";
import { Navigation } from "./routes/Navigation/Navigation";
import { WeatherCardCreation } from "./routes/WeatherCard/WeatherCardCreation";
import { WeatherCardDisplay } from "./routes/WeatherCard/WeatherCardDisplay";
import { Error404 } from "./routes/Error404/Error404";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="weather-card/create" element={<WeatherCardCreation />} />
          <Route path="weather-card/:id" element={<WeatherCardDisplay />} />
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
