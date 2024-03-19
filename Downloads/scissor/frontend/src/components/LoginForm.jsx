import React, { useState, useContext } from "react";
import { UserContext } from "../UserContext";
import { Box, Typography } from "@mui/material";
import Button from "./elements/Button";
import { Link } from "react-router-dom"
import axios from "axios";




export const LoginForm = () => {
      const { handleLogin, flashMessage } = useContext(UserContext);
         const [formData, setFormData] = useState({
            email: "",
            pwd: "",
         });
         const [formSubmitted, setFormSubmitted] = useState(false);

         const handleChange = (e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
         };

         const handleSubmit = async (e) => {
            e.preventDefault();
            setFormSubmitted(true); 
            handleLogin(formData.email, formData.pwd)
         };

         console.log("flashMessage:", flashMessage); 
      return(
         <Box>
            <section className="">
               <Box className="container mt-10">
                  <Box className="flex flex-wrap -mx-4">
                     <Box className="w-full px-4">
                        <Box className="max-w-[525px] bg-faded mx-auto text-center rounded-lg relative overflow-hidden
                           py-8
                           px-10
                           sm:px-12
                           md:px-[60px]
                           "
                           >
                           <Box className="mb-5 md:mb-8 text-center">
                              <Typography variant="h3" className="text-pry">Login</Typography>
                           </Box>
                           <form onSubmit={handleSubmit}>
                              {formSubmitted && (
                                 <div className={`bg-${flashMessage?.type === "success" ? "green-500" : "red-500"} text-white py-3 px-4 rounded-md mb-3`}>
                                       {flashMessage?.message}
                                 </div>
                              )}
                              <Box className="mb-3">
                                 <input
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    className="
                                    w-full
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
                                    focus:border-pry
                                    "
                                    value={formData.email}
                                    onChange={handleChange}
                                 />
                              </Box>
                              <Box className="mb-3">
                                 <input
                                    name="pwd"
                                    type="password"
                                    placeholder="Password"
                                    className="
                                    w-full
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
                                    focus:border-prry
                                    "
                                    value={formData.pwd}
                                    onChange={handleChange}
                                 />
                              </Box>
                              <Box className="mb-5">
                                 <Button className="px-12">Login</Button>
                              </Box>
                           </form>
                           
                        <p className="text-base text-[#adadad]">
                           Not registered yet? {" "}
                           <Link
                              to="/register"
                              className="text-wine hover:underline"
                              >
                                 Register
                           </Link>
                        </p>   
                        </Box>
                     </Box>
                  </Box>
               </Box>
            </section>
         </Box>
      )
}