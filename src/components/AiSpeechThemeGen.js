import React, { useState } from "react";
import { TextField, Button, Typography, Box, Alert } from "@mui/material";
import axios from "axios";

//自分のサーバ経由でOpenAI呼び出し
const API_URL = "xxx";

const AiSpeechThemeGen = () => {
    const [genre, setGenre] = useState("");
    const [theme, setTheme] = useState("");
    const [message, setMessage] = useState("");

    const handleGenerateTheme = async () => {
        if (genre.length > 10) {
            setMessage("ジャンルは10文字以内で入力してください。");
            return;
        }

        if (!genre.trim()) {
            setMessage("ジャンルを入力してください。");
            return;
        }

        try {
            const response = await axios.post(API_URL, { genre });
            setTheme(response.data.theme);
            setMessage("");
        } catch (error) {
            setMessage("テーマの取得に失敗しました。");
        }
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="left" p={3}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }} gutterBottom>
                スピーチテーマの生成
            </Typography>
            <TextField
                label="ジャンルを入力（10文字以内）"
                variant="outlined"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                fullWidth
                sx={{ mb: 2, maxWidth: 400 }}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleGenerateTheme}
                disabled={genre.length === 0 }
            >
                AIにスピーチテーマを決めてもらう
            </Button>
            {message && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {message}
                </Alert>
            )}
            {theme && (
                <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
                    {theme}
                </Typography>
            )}
        </Box>
    );
};

export default AiSpeechThemeGen;
