import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../UserContext";
import { Box, Typography } from "@mui/material";
import Button from "./elements/Button";
import axios from "axios";
import { Link } from "react-router-dom";

export const Account = () => {
    const { user } = useContext(UserContext);
    const [linkHistory, setLinkHistory] = useState([]);

    useEffect(() => {
        if (!user) {
            window.location.href="/login";;
        }
        
        const fetchLinkHistory = async () => {
            try {
                const response = await axios.get(`https://https://scissor-326r.onrender.com/link-history/${user.user_id}`);
                setLinkHistory(response.data);
            } catch (error) {
                console.error("Error fetching link history:", error);
            }
        };

        fetchLinkHistory();
    }, [user]);

    return (
        <Box>
            {user && (
                <>
                    <Typography variant="h5" className="mt-5 pl-10">Hello {user.user_fname},</Typography>
                        <section className="py-1 bg-blueGray-50">
                            <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
                                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                                        <div className="flex flex-wrap items-center">
                                            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                                <h3 className="font-semibold text-pry">Link History</h3>
                                            </div>
                                            <div className="relative w-full px-4 max-w-full flex-grow flex-1 mt-[-4%] text-right">
                                                <Link to="/"><Button type="button">Shorten URL</Button></Link>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="block w-full overflow-x-auto">
                                        <table className="items-center bg-transparent w-full border-collapse text-black">
                                            <thead>
                                                <tr>
                                                    <th className="px-6 text-wine bg-blueGray-50 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                        Original URL
                                                    </th>
                                                    <th className="px-6 text-wine bg-blueGray-50 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                        Shortened URL
                                                    </th>
                                                    <th className="px-6 text-wine bg-blueGray-50 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                        Visit Count
                                                    </th>
                                                    <th className="px-6 text-wine bg-blueGray-50 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                        Times visited
                                                    </th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {linkHistory.map((link, index) => (
                                                    <tr key={index}>
                                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                                            {link.original_url}
                                                        </td>
                                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                            <Link to={`https://https://scissor-326r.onrender.com/${link.shortened_url}`} target="_blank">
                                                            {link.shortened_url}
                                                            </Link>
                                                        </td>
                                                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                            {link.visit_count}
                                                        </td>
                                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                            {link.times_visited.map((time, index) => (
                                                                <ul>
                                                                    <li key={index}>{time}</li>
                                                                </ul>
                                                            ))}
                                                        </td>

                                                    </tr>
                                                ))}
                                            </tbody>

                                        </table>
                                    </div>
                                </div>
                            </div>
                        </section>
                </>
            )}
        </Box>
    );
};
