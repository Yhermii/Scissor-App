import React, { useState, useContext } from "react";
import { Box, Card, Typography, Grid, Container } from "@mui/material";
import Button from "./elements/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";

export const Url = () => {
    const { user } = useContext(UserContext);
    const [url, setUrl] = useState({});
    const [loading, setLoading] = useState(false);
    const [shortUrl, setShortUrl] = useState("");
    const [error, setError] = useState(null);

    const handleUrl = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`https://https://scissor-326r.onrender.com/original-url/${shortUrl}`);
            const responseData = response.data;

            if (response.status === 200) {
                console.log("Success:", responseData);
                setUrl(responseData);
                setError(null);
            } else {
                console.error("Error:", responseData);
                setUrl({});
                setError(`Error: ${error.message}`);
            }
        } catch (error) {
            console.error("Error fetching initial URL:", error);
            setUrl({});
            setError(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        await handleUrl();
    };

    if (!user) {
        window.location.href="/login";
        return null;
    }

    return (
        <Box className="general mt-10 shadow-2xl mx-auto">
            <Box maxWidth="xl" sx={{ display:"flex", alignItems:"center", justifyContent:"center" }} className="text-white">
                <Grid maxWidth="md">
                    <Box className="main_container my-14 mx-auto md:px-6">
                        <Container maxWidth="md" className="mt-14 text-white">
                            {error && (
                                <div className="text-center">
                                    <Typography variant="body1" className="text-goldie mx-auto" sx={{ mt: 2 }}>
                                        {error}
                                    </Typography>
                                </div>
                            )}

                            <Box maxWidth="xl" className="mx-auto mt-[-4%] mb-6 w-full">
                                <Grid maxWidth="xl">
                                    <Grid>
                                        <Typography variant="h3" className="text-center">Check for the Original URL Shortened</Typography>
                                        <Typography
                                            variant="h6"
                                            sx={{ fontSize: "16px", fontWeight: "light", margin: "auto" }}
                                            paragraph
                                            className="w-full text-center pb-2"
                                        >
                                            Enter the your Scissor shortened link to fetch the initial url you shortened.
                                            <span><Typography variant="h6" sx={{ fontWeight:"light", fontSize:"16px"}} className="text-pee">Example: pjzjsl</Typography></span>
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
                                                            {loading ? "Hang on..." : "Get Initial URL"}  
                                                        </Button>
                                                    </Box>
                                                </Box>
                                            </form>
                                            {url.original_url && (
                                            <Grid>
                                                <Box maxWidth="xl" className="border border-1 border-transparent bg-transparent w-full">
                                                    <div className="ml-14 mb-2">
                                                        <Card sx={{ backgroundColor:"transparent" }}>
                                                            <Container maxWidth="md" className="mt-12">
                                                                <Typography
                                                                    variant="h5"
                                                                    sx={{ fontWeight: 'bold' }}
                                                                    className="w-full text-[#FAF2A1] text-center pb-2 inline"
                                                                >
                                                                    Original URL: &emsp;
                                                                    <span>
                                                                        <Typography variant="h6" sx={{ fontWeight: 'light'}} paragraph className="inline text-white"> 
                                                                            {url.original_url} 
                                                                        </Typography>
                                                                    </span><br /> <br />
                                                                </Typography>
                                                            </Container>
                                                        </Card>
                                                        
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
