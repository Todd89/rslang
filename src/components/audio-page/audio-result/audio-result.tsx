import React, { useState, useEffect } from "react";

import { IWord, IAudioResult } from "../../../interface/interface-audio";
import {
  AUDIO_PATH_DATA_AUDIO,
  AUDIO_PATH_UTILS_AUDIO,
} from "../../../const/const-audio";
import "./audio-result.css";

interface IProps {
  gameResult: Array<IAudioResult>;
}

export function Result(props: IProps) {
  const { gameResult } = props;
  //console.log(gameResult);

  const audio = new Audio();
  audio.volume = 0.2;

  function playAudio(word: IWord) {
    const path = `${AUDIO_PATH_DATA_AUDIO}${word.audio}`;

    audio.src = path;
    audio.load();
    audio.play();
  }

  function playAudioResult() {
    const path = `${AUDIO_PATH_UTILS_AUDIO}end.mp3`;

    audio.src = path;
    audio.load();
    audio.play();
  }

  useEffect(() => {
    playAudioResult();
  }, []);

  return (
    <div className="result__section">
      <ul className="result">
        {gameResult.map((item) => {
          const question = item.questionWord;
          return (
            <li key={Math.random()} className="result__line">
              <div
                className={
                  item.isAnswerCorrect
                    ? "result__icon icon-correct"
                    : "result__icon icon-incorrect"
                }
              ></div>
              <button
                className="btn-audio result__audio"
                onClick={() => playAudio(question)}
              ></button>
              <span className="result__word">{question.word}: </span>
              <span className="result__translation">
                {question.transcription}
              </span>{" "}
              -
              <span className="result__translation">
                {question.wordTranslate}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
