import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/Index/Index";
import Login from "./pages/(auth)/Login/Login";
import Register from "./pages/(auth)/Register/Register";


const  App= () => {
    return ( 
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Index/>}/>
                <Route path="/login"  element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
            </Routes>
        </BrowserRouter>
     );
}
 
export default App;