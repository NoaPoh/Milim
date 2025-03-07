import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
// import Login from "./pages/Login";
// import Categories from "./pages/Categories";
import Camera from "./pages/Camera";
// import Game from "./pages/Game";
// import Profile from "./pages/Profile";
// import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 text-gray-900">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                {/*<Route path="/login" element={<Login />} />*/}
                {/*<Route path="/categories" element={<Categories />} />*/}
                <Route path="/camera" element={<Camera />} />
                {/*<Route path="/game" element={<Game />} />*/}
                {/*<Route path="/profile" element={<Profile />} />*/}
                {/*<Route path="*" element={<NotFound />} />*/}
            </Routes>
        </div>
    );
};

export default App;