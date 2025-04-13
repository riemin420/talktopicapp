import React from "react";
import { Container, Typography, Paper, Divider } from "@mui/material";
import RandomQuestion from "./components/RandomQuestion";
import RandomCombination from "./components/RandomCombination";
import AiSpeechThemeGen from "./components/AiSpeechThemeGen";
import ReleaseNotes from "./components/ReleaseNotes";

const App = () => {

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p:3, mt:5, textAlign:"left"}}>
        <Typography variant="h4" gutterBottom>
          3分間スピーチの話題提供アプリ
        </Typography>
      <RandomQuestion />
      <Divider />
      <RandomCombination />
      <Divider />
      <AiSpeechThemeGen />
      </Paper>
      <ReleaseNotes />
    </Container>
  );
};

export default App;
