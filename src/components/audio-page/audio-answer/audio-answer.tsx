import React from "react";
import ReactDOM from "react-dom";
import "./audio-answer.css";

import { IWord } from "../../../interface/interface-audio";

interface Iprops {
  questionWord: IWord;
  word: IWord;
  onClick: (answer: IWord, correctAnswer: IWord) => void;
}

export function AudioAnswer(props: Iprops) {
  //console.log("AudioAnswer");
  const { word, questionWord, onClick } = props;
  return (
    <button
      className="btn"
      key={word.id}
      onClick={() => onClick(word, questionWord)}
    >
      {word.wordTranslate}
    </button>
  );
}
