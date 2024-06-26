import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../UserContext";
import { Card, Grid, Box, Typography } from "@mui/material";
import Icon from "@mdi/react";
import { mdiTrayArrowDown } from "@mdi/js";
import { Link } from "react-router-dom";
import Button from "./elements/Button";
import axios from "axios";


export const Shorten = () => {
    const { user, flashMessage, handleLogin } = useContext(UserContext);
    const [url, setUrl] = useState("");
    const [shortenedUrl, setShortenedUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [qrCodeImage, setQrCodeImage] = useState({ imageUrl: "" });
    const [error, setError] = useState(null);
    

    useEffect(() => {
        if (!user) {
            window.location.href="/login";
        }
    }, [user]);

    const handleShorten = async () => {
        try {
            setLoading(true);

            const response = await axios.post(
                "https://https://scissor-326r.onrender.com/shorten-url",
                {
                    original_url: url,
                    user_id: user.user_id
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const responseData = response.data;

            if (response.status === 200) {
                console.log("Success:", responseData);
                setShortenedUrl(responseData.shortened_url);
                setQrCodeImage({ 
                    imageUrl: `data:image/png;base64,${responseData.qr_code_image}`,
                    originalUrl: responseData.original_url
                });
                setError(null);
            } else {
                console.error("Error:", response);
                setShortenedUrl("");
                setQrCodeImage({ imageUrl: "", originalUrl: "" });
                setError(`Error: ${responseData.message}`);
            }
        } catch (error) {
            console.error("Error shortening URL:", error);
            setShortenedUrl("");
            setQrCodeImage({ imageUrl: "", originalUrl: "" });
            setError(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };
    
    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = qrCodeImage.imageUrl;
        link.download = "qr_code.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log("Original URL:", url);
        handleShorten();
    };

    return (
        <>
            <Box className="general mt-10 shadow-2xl mx-auto">
                <Box maxWidth="xl" className="mx-auto mt-5 w-full">
                    <Grid maxWidth="xl">
                        <Grid>
                            <Typography variant="h3" className="text-center">Shorten URL</Typography>
                            <Typography
                                variant="h6"
                                sx={{ fontSize: "16px", fontWeight: "light", margin: "auto" }}
                                paragraph
                                className="w-full text-center pb-2 inner-text-sm"
                            >
                                Enter your long URL here to create a short link and generate QR code.
                                <span>
                                    <Typography variant="h6" sx={{ fontWeight: "light", fontSize: "16px" }} className="text-pee inner-textsm">
                                        Example: https://www.google.com
                                    </Typography>
                                </span>
                            </Typography>
                        </Grid>
                        <Grid maxWidth="xl" className="mx-auto w-full">
                            <Card className="shadow appearance-none mt-2" sx={{ backgroundColor: "transparent" }}>
                                <form className="my-4 w-full" onSubmit={handleFormSubmit}>
                                    {flashMessage && (
                                        <div className={`bg-${flashMessage?.type === "success" ? "bg-green-500" : "bg-red-500"} text-white py-3 px-4 rounded-md mb-3`}>
                                            {flashMessage?.message}
                                        </div>
                                    )}
                                    <Box sx={{ display: "flex", justifyContent: "start", alignItems: "center" }}>
                                        <Box className="flex items-center gap-2 mx-auto">
                                            <input
                                                className="fields shadow appearance-none border rounded py-2 px-14 mx-auto text-black leading-tight focus:outline-none focus:shadow-outline"
                                                type="text"
                                                name="url"
                                                required
                                                value={url}
                                                onChange={(e) => setUrl(e.target.value)}
                                                placeholder="Paste Your Link Here"
                                            />
                                            <Box className="flex justify-center">
                                                <Button
                                                    className="mt-[-1%] font-light py-2 px-3 rounded"
                                                    onClick={handleShorten}
                                                    disabled={loading}
                                                >
                                                    {loading ? "Hang on..." : "Shorten Link"}
                                                </Button>
                                            </Box>
                                        </Box>
                                    </Box>
                                </form>
                                {shortenedUrl && qrCodeImage.imageUrl && (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            margin: "auto",
                                            flexWrap: "wrap"
                                        }}
                                    >
                                        <Typography
                                            variant="h5"
                                            sx={{ fontWeight: 'bold' }}
                                            paragraph
                                            className="text-[#FAF2A1] pl-14 ml-10 pb-2 inline"
                                        >
                                            Shortened URL: &emsp;
                                            <span>
                                                <Link to={`https://https://scissor-326r.onrender.com/${shortenedUrl}`} target="_blank">
                                                    <Typography variant="h6" sx={{ fontWeight: 'light', color: "#ffffff" }} paragraph className="inline text-white"> 
                                                        {shortenedUrl} 
                                                    </Typography>
                                                </Link>
                                            </span><br /> <br />                                             
                                        </Typography>
                                        <div className="mx-auto mb-2">
                                            <Card 
                                                className="shadow appearance-none"
                                                sx={{ backgroundColor: "transparent"}}>
                                                <img
                                                    src={qrCodeImage.imageUrl}
                                                    alt="QR Code"
                                                    width={200}
                                                    height={200}
                                                    className="h-100 w-100 object-contain"
                                                />
                                            </Card>
                                            <Box className="text-center">
                                                <Button variant="contained"
                                                    onClick={handleDownload}
                                                    className="font-light py-2 px-4 rounded inline btnUp">
                                                    <span> 
                                                        <Icon path={mdiTrayArrowDown} size={1} 
                                                            className="icons inline" /></span>
                                                    &nbsp;Download
                                                </Button>
                                            </Box>
                                        </div>
                                    </Box>
                                )}
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    );
};
