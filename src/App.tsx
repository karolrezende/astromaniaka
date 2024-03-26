import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/(auth)/Login/Login";
import Register from "./pages/(auth)/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Notfound from "./pages/Notfound/Notfound";


const  App= () => {
    return ( 
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/login"  element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="*" element={<Notfound/>}/>
            </Routes>
        </BrowserRouter>
     );
}
 
export default App;