import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Camera from "./pages/Camera";

const App = () => {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-[#FBF3DF] text-gray-900">
            {location.pathname !== "/register" && location.pathname !== "/login" && <Navbar/>}
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/camera" element={<Camera/>}/>
            </Routes>
        </div>
    );
};

export default App;