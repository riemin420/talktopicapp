import React, { useState, useEffect } from "react";
import { TextField, Modal, Button, Typography, Box, Alert, IconButton, List, ListItem } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import axios from "axios";

const API_URL = "https://kokitechblog.com/api/topics";

const RandomQuestion = () => {
  const [question, setQuestion] = useState("");
  const [message, setMessage] = useState("");
  const [topic, setTopic] = useState("");
  const [open, setOpen] = useState(false);
  const [questionsList, setQuestionsList] = useState([]);

  useEffect(() => {
    fetchRandomTopic(); // コンポーネントがマウントされた時にランダムな質問を取得
    fetchQuestionList();
  }, []);

  // 質問を追加する処理
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) {
      setMessage("質問を入力してください。");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/add_question`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
        mode: "cors",
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("質問が追加されました。");
        setQuestion(""); // 質問をリセット
      } else {
        setMessage(data.detail || "予期しないエラーが発生しました。");
      }
    } catch (error) {
      setMessage("通信エラーが発生しました。");
      console.error("通信エラー:", error);
    }
  };

  // ランダムな質問を取得する処理
  const fetchRandomTopic = async () => {
    try {
      const response = await axios.get(`${API_URL}/random-question`);
      setTopic(response.data.topic);
    } catch (error) {
      console.error("Error fetching topic:", error);
      setMessage("質問の取得に失敗しました。");
    }
  };

  //現在の質問の一覧を取得する処理
  const fetchQuestionList = async () => {
    try {
      const response = await axios.get(`${API_URL}/all-questions`);
      setQuestionsList(response.data.questions);
    } catch (error) {
      console.log("Erorr fetching questionslist:", error);
    }
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="left" p={3}>
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}gutterBottom>
        ランダムな質問
        <IconButton onClick={() => {fetchQuestionList(); setOpen(true); }}>
          <InfoIcon />
        </IconButton>
      </Typography>

      {/* モーダル */}
      <Modal open={open} onClose={ () => setOpen(false)}>
        <Box sx={{ p: 3, bgcolor: "white", maxWidth: 400, mx: "auto", mt: 10 }}>
          <Typography variant="h6">質問一覧</Typography>
          <List>
            {questionsList.map((q, index) => (
            <ListItem key={index}>{q}</ListItem>
            ))}
          </List>
        </Box>
      </Modal>

      <Typography variant="h6">{topic}</Typography>
      <Button variant="outlined" onClick={fetchRandomTopic}>
        別の質問を取得
      </Button>
      <Typography variant="h5" gutterBottom sx={{ mt: 3, fontWeight: 'bold' }}>
        質問を追加
      </Typography>
      <TextField
        label="質問を入力"
        variant="outlined"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        fullWidth
        sx={{ mb: 2, maxWidth: 400 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={!question.trim()} // 入力がない場合はボタンを無効にする
      >
        送信
      </Button>
      {message && <Alert severity="info" sx={{ mt: 2 }}>{message}</Alert>}
    </Box>
  );
};

export default RandomQuestion;
