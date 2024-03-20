import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../UserContext";
import { Box, Card, Typography, Grid, Container } from "@mui/material";
import Icon from '@mdi/react';
import { mdiTrayArrowDown } from '@mdi/js';
import Button from "./elements/Button";
import { Link } from "react-router-dom";
import axios from "axios";


export const GetQr = () => {
    const { user, flashMessage } = useContext(UserContext);
    const [qr, setQr] = useState({ imageUrl: "" });
    const [loading, setLoading] = useState(false);
    const [shortUrl, setShortUrl] = useState("");
    const [error, setError] = useState(null);
 

    useEffect(() => {
        if (!user) {
            window.location.href="/login";
        }
    }, [user]);

    const handleQr = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`https://https://scissor-326r.onrender.com/get-qr/${shortUrl}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                responseType: 'arraybuffer',
            });

            const originalUrl = response.headers['original-url'];
    
            if (response.status === 200) {
                console.log("Success");
                const blob = new Blob([response.data], { type: 'image/png' });
                const imageUrl = URL.createObjectURL(blob);
                setQr({ imageUrl: imageUrl, originalUrl: originalUrl });
                setError(null);
            } else if (response.status === 404) {
                setQr({});
                console.log("Link not found. Please shorten your link first."); 
                setError(`Error: "Link not found. Please shorten your link first.`);
            } else {
                console.error("Error:", response);
                setQr({});
                setError(`Error: ${response.statusText}`);
            }
        } catch (error) {
            console.error("Error fetching QR Code:", error);
            setQr({});
            setError(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };
    
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = qr.imageUrl;
        link.download = 'qr_code.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        await handleQr();
    };


    return (
        <Box className="general mt-10 shadow-2xl mx-auto">
        <Box maxWidth="xl" 
            sx={{ display:"flex", alignItems:"center", justifyContent:"center" }} 
            className="text-white mb-14 mt-1 main_container">
           <Grid maxWidth="md">
           <Box className="container mt-8 mx-auto md:px-6 mt-14">
            <Container maxWidth="md" className="text-white">
                {error && (
                    <div className="text-center">
                    <Typography variant="body1" className="text-goldie mx-auto" sx={{ mt: 2 }}>
                        {error}
                    </Typography>
                    </div>
                )}

                <Box maxWidth="xl" className="mx-auto mt-[-2%] mb-6 w-full">
                    <Grid maxWidth="xl">
                        <Grid>
                            <Typography variant="h3" className="text-center">Check QR Code for Shortened Link</Typography>
                            <Typography
                                variant="h6"
                                sx={{ fontSize: "16px", fontWeight: "light", margin: "auto" }}
                                paragraph
                                gutterBottom
                                className="w-full text-center pb-2 inner-text"
                            >
                                Enter the your Scissor shortened link to fetch the QR code assigned to it.
                                <span><Typography variant="h6" sx={{ fontWeight:"light", fontSize:"16px"}} className="text-pee inner-text-sm">Example: rb.gy/pjzjsl</Typography></span>
                            </Typography>
                        </Grid>
                        <Grid maxWidth="xl" className="mx-auto w-full">
                            <Card className="shadow appearance-none mt-2" sx={{ backgroundColor: "transparent" }}>
                                <form className="my-4 w-full" onSubmit={handleFormSubmit}>
                                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <Box className="flex items-center gap-2 mx-auto">
                                            <input
                                                className="fields shadow appearance-none border rounded py-2 px-14 mx-auto text-black leading-tight focus:outline-none focus:shadow-outline"
                                                type="text"
                                                id="phone"
                                                required
                                                value={shortUrl}
                                                onChange={(e) => setShortUrl(e.target.value)}
                                                placeholder="Enter Your Scissor Link Here"
                                            />
                                                <Button
                                                    className="mt-[1px] font-light py-2 px-3 rounded"
                                                    type="submit"
                                                    disabled={loading}>
                                                    {loading ? "Hang on..." : "Get QR Code"}  
                                                </Button>
                                        </Box>
                                    </Box>
                                </form>
                                {qr.imageUrl && (
                                <Grid>
                                    <Box maxWidth="sm" className="border border-1 border-transparent bg-transparent w-full">
                                        <div className="ml-14 mb-2">
                                            <Card 
                                            className="shadow appearance-none"
                                            sx={{ backgroundColor: "transparent"}}>
                                                <img
                                                    src={qr.imageUrl}
                                                    alt="QR Code Preview"
                                                    width={200}
                                                    height={200}
                                                    className="h-100 w-100 object-contain mx-auto"
                                                />
                                            </Card>
                                            <Box className="text-center">
                                                <Button variant="contained"
                                                    onClick = {handleDownload}
                                                    className="font-light py-2 px-4 rounded inline btnUp">
                                                        <span> 
                                                            <Icon path={mdiTrayArrowDown} size={1} 
                                                                className="icons inline" /></span>
                                                                    &nbsp;Download
                                                </Button>
                                            </Box>
                                        </div>
                                    </Box>
                                </Grid>
                                )}
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
        </Grid>
        </Box>
             <Box maxWidth="xl">
                <Link to="/">
                    <Typography 
                    variant="h6" 
                    sx={{ color: "#FAF2A1", fontWeight: "light", fontSize: "14px", textAlign: "center" }}
                    className="another-link"
                    >
                        Shorten Another Link
                    </Typography>
                </Link>
            </Box> 
    </Box>
    );
};
