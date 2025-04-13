import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import axios from "axios";

const API_URL = "https://kokitechblog.com/api/topics"; // FastAPIのURL

const RandomCombination = () => {

    const [pair, setPair] = useState({ word1: "", word2: "" });

    useEffect(() => {
        fetchRandomPair();
    }, []);

    const fetchRandomPair = async () => {
        try {
            const response = await axios.get(`${API_URL}/random-pair`);
            setPair(response.data);
        } catch (error) {
            console.error("Error fetching word pair:", error);
        }
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="left" p={3}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }} gutterBottom>
                ランダムな単語の組み合わせ
            </Typography>
            <Typography variant="h6">{pair.word1} × {pair.word2}</Typography>
            <Button variant="outlined" onClick={fetchRandomPair}>別の組み合わせを取得</Button>
        </Box>
    )
}

export default RandomCombination;