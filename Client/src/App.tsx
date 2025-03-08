import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Camera from "./pages/Camera";
import Login from "./pages/Login/Login";

const App = () => {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-[#FBF3DF] text-gray-900">
            {location.pathname !== "/register" && location.pathname !== "/login" && <Navbar/>}
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/camera" element={<Camera/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </div>
    );
};

export default App;