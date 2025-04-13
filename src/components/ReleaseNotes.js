import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, Button, Typography } from "@mui/material";

const ReleaseNotes = () => {
  const [isOpen, setIsOpen] = useState(false);

  const releaseNotes = `
    Ver 1.1
    - ランダムな質問に質問を追加できる機能を追加
    - 右上にリリースノートを表示
    - UIをMaterial UIで改善
    
    Ver 1.2
    - AIにスピーチテーマを決めてもらうフロントエンド側だけ準備

    Ver 1.3
    - 現在の質問の一覧を「i」マークから確認できるようにした

    Ver 1.4
    - AIにジャンルを送ると自動でスピーチテーマを提案する機能を追加

    Ver 1.5
    - AIに決めさせるテーマは雑談ぽいものにするようにプロンプトを修正

  `;

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setIsOpen(true)}
        sx={{ position: "fixed", top: 16, right: 16 }}
      >
        Release Notes
      </Button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle>リリースノート</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
            {releaseNotes}
          </Typography>
          <Button
            onClick={() => setIsOpen(false)}
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            閉じる
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ReleaseNotes;
