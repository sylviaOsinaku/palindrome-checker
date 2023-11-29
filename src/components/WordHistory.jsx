import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import classes from "./PalindromeChecker.module.css";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({
  openmodal,
  onclosemodal,
  onopenmodal,
  wordhistory,
}) {
  return (
    <div>
      <Modal
        open={openmodal}
        onClose={onclosemodal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={classes["word-contianer"]}>
            <h2>Word History</h2>
            <div className={classes["word-wrapper"]}>
              {wordhistory &&
                wordhistory.map((history, index) => (
                  <div key={index}>
                    <p>{history.word}</p>
                    <p
                      className={
                        classes[history.testPalindrome ? "correct" : "wrong"]
                      }
                    >
                      {history.testPalindrome ? "Palindrome" : "Not Palindrome"}
                    </p>
                  </div>
                ))}
              {!wordhistory && <p>No word checked yet</p>}
            </div>
          </div>
          <center>
            <button
              onClick={onclosemodal}
              style={{ marginTop: "1.5em" }}
              className={classes["button-91"]}
            >
              Close Modal
            </button>
          </center>
        </Box>
      </Modal>
    </div>
  );
}
