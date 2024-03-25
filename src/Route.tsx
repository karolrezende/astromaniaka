import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/(auth)/Login/Login";
import Register from "./pages/(auth)/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";


const  App= () => {
    return ( 
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/login"  element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
            </Routes>
        </BrowserRouter>
     );
}
 
export default App;