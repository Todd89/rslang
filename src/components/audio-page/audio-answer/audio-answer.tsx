import "./audio-answer.css";

import { IWordAudio } from "../../../interface/interface-audio";

interface Iprops {
  questionWord: IWordAudio;
  word: IWordAudio;
  id: string;
  onClick: (answer: IWordAudio, correctAnswer: IWordAudio) => void;
}

export function AudioAnswer(props: Iprops) {
  const { word, questionWord, id, onClick } = props;
  return (
    <button
      className="btn"
      id={`id-${id}`}
      key={word.id}
      onClick={() => onClick(word, questionWord)}
    >
      {word.wordTranslate}
    </button>
  );
}
