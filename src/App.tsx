import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/(auth)/Login/Login";
import Register from "./pages/(auth)/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Notfound from "./pages/Notfound/Notfound";
import Configs from "./pages/Configs/Configs";
import Profile from "./pages/Profile/Profile";
import Admin from "./pages/Admin/Admin";
import Password from "./pages/Password/Password";
import History from "./pages/History/History";
import People from "./pages/People/People";
import Person from "./pages/Person/Person";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/configs" element={<Configs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/history" element={<History />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/people" element={<People />} />
        <Route path="/person/:id" element={<Person />} />
        <Route path="/password" element={<Password />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
