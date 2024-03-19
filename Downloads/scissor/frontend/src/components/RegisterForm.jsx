import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import Button from "./elements/Button";
import { Link } from "react-router-dom";
import axios from "axios";

export const RegisterForm = () => {
    const [formData, setFormData] = useState({
        user_fname: "",
        user_lname: "",
        email: "",
        pwd: "",
        cpwd: ""
    });
    const [flashMessage, setFlashMessage] = useState(null);
    const [formSubmitted, setFormSubmitted] = useState(false);
    

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.pwd !== formData.cpwd) {
                throw new Error("Passwords must match!");
            }
    
            const response = await axios.post("https://sciss-y17c.onrender.com/register", formData, {
                headers: { "Content-Type": "application/json" }
            });
    
            console.log(response.data);
    
            setFlashMessage({
                type: "success",
                message: "Registration successful. Redirecting to Login.",
            });
    
            setFormSubmitted(true);
    
            setTimeout(() => {
                window.location.href = "/login"
            }, 2000);
    
        } catch (error) {
            console.error("Error:", error);
    
            let errorMessage;
            if (error.response) {
                console.log("Response Data:", error.response.data);
                errorMessage = error.response.data.detail || error.response.data.message;
            } else {
                console.error("Request Error:", error.request);
                errorMessage = "No response received from the server. Please try again later.";
            }
    
            setFlashMessage({ type: "error", message: errorMessage });
        }
    };

    return (
        <Box>
            <section className="bg-blueGray-50 py-8">
                <Box className="container mx-auto">
                    <Box className="max-w-[525px] bg-white mx-auto text-center rounded-lg overflow-hidden py-8 px-10 sm:px-12 md:px-24">
                        <Typography variant="h3" className="text-pry mb-8">Register</Typography>
                        <form onSubmit={handleSubmit}>
                            {formSubmitted && (
                                <div className={`bg-${flashMessage?.type === "success" ? "green-500" : "red-500"} text-white py-3 px-4 rounded-md mb-3`}>
                                    {flashMessage?.message}
                                </div>
                            )}
                            <Box className="mb-3">
                                <input
                                    type="text"
                                    name="user_fname"
                                    placeholder="First Name"
                                    className="w-full
                                    rounded-md
                                    border
                                    border-[#E9EDF4]
                                    py-3
                                    px-5
                                    bg-[#FCFDFE]
                                    text-black
                                    placeholder-[#ACB6BE]
                                    outline-none
                                    focus-visible:shadow-none
                                    focus:border-pry"
                                    value={formData.user_fname}
                                    onChange={handleChange}
                                />
                            </Box>
                            <Box className="mb-3">
                                <input
                                    type="text"
                                    name="user_lname"
                                    placeholder="Last Name"
                                    className="w-full
                                    rounded-md
                                    border
                                    border-[#E9EDF4]
                                    py-3
                                    px-5
                                    bg-[#FCFDFE]
                                    text-black
                                    placeholder-[#ACB6BE]
                                    outline-none
                                    focus-visible:shadow-none
                                    focus:border-pry"
                                    value={formData.user_lname}
                                    onChange={handleChange}
                                />
                            </Box>
                            <Box className="mb-3">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    className="w-full
                                    rounded-md
                                    border
                                    border-[#E9EDF4]
                                    py-3
                                    px-5
                                    bg-[#FCFDFE]
                                    text-black
                                    placeholder-[#ACB6BE]
                                    outline-none
                                    focus-visible:shadow-none
                                    focus:border-pry"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </Box>
                            <Box className="mb-3">
                                <input
                                    type="password"
                                    name="pwd"
                                    placeholder="Password"
                                    className="w-full
                                    rounded-md
                                    border
                                    border-[#E9EDF4]
                                    py-3
                                    px-5
                                    bg-[#FCFDFE]
                                    text-black
                                    placeholder-[#ACB6BE]
                                    outline-none
                                    focus-visible:shadow-none
                                    focus:border-pry"
                                    value={formData.pwd}
                                    onChange={handleChange}
                                />
                            </Box>
                            <Box className="mb-3">
                                <input
                                    type="password"
                                    name="cpwd"
                                    placeholder="Confirm Password"
                                    className="w-full
                                    rounded-md
                                    border
                                    border-[#E9EDF4]
                                    py-3
                                    px-5
                                    bg-[#FCFDFE]
                                    text-black
                                    placeholder-[#ACB6BE]
                                    outline-none
                                    focus-visible:shadow-none
                                    focus:border-pry"
                                    value={formData.cpwd}
                                    onChange={handleChange}
                                />
                            </Box>
                            <Box className="mb-8">
                                <Button className="px-12">Register</Button>
                            </Box>
                        </form>
                        <p className="text-base text-gray-600">
                            Already registered?{" "}
                            <Link to="/login" className="text-wine hover:underline">Login</Link>
                        </p>   
                    </Box>
                </Box>
            </section>
        </Box>
    );
};
