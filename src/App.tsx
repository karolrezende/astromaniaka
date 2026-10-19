import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard/Dashboard";
import Notfound from "./pages/Notfound/Notfound";
import Configs from "./pages/Configs/Configs";
import Profile from "./pages/Profile/Profile";
import Admin from "./pages/Admin/Admin";
import History from "./pages/History/History";
import People from "./pages/People/People";
import Person from "./pages/Person/Person";
import Astronomers from "./pages/Astronomers/Astronomers";
import DemoSwitcher from "./components/common/DemoSwitcher/DemoSwitcher";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* Demo: sem login, cadastro nem troca de senha */}
        <Route path="/login" element={<Navigate to="/" replace />} />
        <Route path="/register" element={<Navigate to="/" replace />} />
        <Route path="/configs" element={<Configs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/history" element={<History />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/people" element={<People />} />
        <Route path="/astronomers" element={<Astronomers />} />
        <Route path="/person/:id" element={<Person />} />
        <Route path="/password" element={<Navigate to="/configs" replace />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
      <DemoSwitcher />
    </BrowserRouter>
  );
};

export default App;
