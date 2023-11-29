import React, { useState, useEffect } from "react";
import classes from "./PalindromeChecker.module.css";
import BasicModal from "./WordHistory";

function Palindromechecker() {
  const [palindromWord, setPalindromeWord] = useState("");
  const [isPalindrome, setIsPalindrome] = useState(false);
  const [error, setError] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const openModalHandler = function () {
    setOpenModal(true);
  };

  const closeModalHandler = function () {
    setOpenModal(false);
  };

  const [wordHistory, setWordHistory] = useState(() => {
    const savedWords = localStorage.getItem("wordHistory");
    if (savedWords) {
      return JSON.parse(savedWords);
    } else {
      return [];
    }
  });
  useEffect(() => {
    localStorage.setItem("wordHistory", JSON.stringify(wordHistory));
  }, [wordHistory]);
  const wordHandler = (e) => {
    setPalindromeWord(e.target.value);
    setError(false);
  };
  const resetWord = function () {
    setPalindromeWord("");
    setIsClicked(false);
  };

  const wordsubmitHandler = function (e) {
    e.preventDefault();
    if (palindromWord.trim() === "") {
      setError(true);
      setIsClicked(false);
      return;
    }
    setIsClicked(true);
    setError(false);
    console.log(palindromWord);
    const trimmedCorrectedWord = palindromWord
      .replace(/[^0-9a-z]/gi, "")
      .toLowerCase();
    const reverseredWord = trimmedCorrectedWord.split("").reverse().join("");
    console.log("trimmedcorrectedword:", trimmedCorrectedWord);
    console.log("reverseword", reverseredWord);
    if (reverseredWord === trimmedCorrectedWord) {
      setIsPalindrome(true);
    } else {
      setIsPalindrome(false);
    }
    setWordHistory((prev) => [
      ...prev,
      {
        word: trimmedCorrectedWord,
        testPalindrome: trimmedCorrectedWord === reverseredWord ? true : false,
      },
    ]);
    // resetWord();
    console.log(error);
  };

  const wordHistorySubmitHandler = function () {
    console.log(wordHistory);
    setOpenModal(true);
  };

  return (
    <div className={classes["palindrome-container"]}>
      <h1>PalinDrome Checker Application</h1>
      <center className={classes["palindrome-wrapper"]}>
        <form onSubmit={wordsubmitHandler}>
          <input
            type="text"
            name="word"
            id="word"
            onChange={wordHandler}
            value={palindromWord}
          />
          <button type="submit" className={classes["button-33"]}>
            Check
          </button>
        </form>

        <div className={classes["palindrome-text-test"]}>
          {isClicked && isPalindrome && (
            <p className={classes["palindrome-text-correct"]}>
              Yes! It's a palindrome
            </p>
          )}
          {isClicked && !isPalindrome && (
            <p className={classes["palindrome-text-wrong"]}>
              No! it's not a palindrome
            </p>
          )}
        </div>
        <div className={classes["button-wrapper"]}>
          <button className={classes["button-83"]} onClick={resetWord}>
            Clear
          </button>
          <button
            className={classes["button-91"]}
            onClick={wordHistorySubmitHandler}
          >
            Word History
          </button>
        </div>
      </center>

      <BasicModal
        openmodal={openModal}
        onclosemodal={closeModalHandler}
        onopenModal={openModalHandler}
        wordhistory={wordHistory}
      />
    </div>
  );
}

export default Palindromechecker;
