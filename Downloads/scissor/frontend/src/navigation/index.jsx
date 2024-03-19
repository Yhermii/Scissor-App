import React from "react";
import { UserProvider } from "../UserContext";
import { Routes, Route } from "react-router-dom";
import { Header } from "../components/Header";
import Register from "../pages/Register/index";
import Login from "../pages/Login/index";
import Statistics from "../pages/Stats/index";
import Dashboard from "../pages/Dashboard/index";
import GetQrCode from "../pages/GetQrCode/index";
import GetURL from "../pages/GetURL/index";
import Shortner from "../pages/Shortner/index";



export const Navigation = () => {
    return (
        <UserProvider>
            <Header />
                <Routes>
                    <Route path="/" element={<Shortner />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/stats" element={<Statistics />} />
                    <Route path="/get-qr-code" element={<GetQrCode />} />
                    <Route path="/get-original-url" element={<GetURL />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/login" element={<Login />}  />
                </Routes>
        </UserProvider>
    );
};
