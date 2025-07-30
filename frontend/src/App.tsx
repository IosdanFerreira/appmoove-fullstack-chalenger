// src/App.jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AppLayout } from "./components/layouts/app-layout";
import { CreateUserPage } from "./pages/register-user/register-user.page";
import Home from "./pages/home/Home";
import UserDetailsPage from "./pages/user-details/UserDetails";
import { WeatherPage } from "./pages/weather/weather-page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/users/new" element={<CreateUserPage />} />
          <Route path="/users/:id" element={<UserDetailsPage />} />
          <Route path="/weather" element={<WeatherPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
