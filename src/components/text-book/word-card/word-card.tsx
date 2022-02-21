import { Url } from "../../../const/const";
import { WordCardComponent } from "../../../interface/interface";
import { changeDifficulty, changeLearned, createUserDifficultWord, createUserLearnedWord } from "../../../utils/user-word";
import { useSelector } from "react-redux";
import { getUserAuthData, getAuthorizeStatus } from "../../../store/data/selectors";
import { useState } from "react";
import WordContent from "./word-content/word-content";

const WordCard:React.FC<WordCardComponent> = ({
  id,
  word,
  image,
  textExample,
  textExampleTranslate,
  textMeaning,
  textMeaningTranslate,
  transcription,
  wordTranslate,
  difficulty, 
  learned,
  hasUserWord,
  audio,
  audioExample,
  audioMeaning,
  isPlayAudio,
  playAudioHandler 
}) => {
  const userAuthData = useSelector(getUserAuthData);
  const isAuthorize = useSelector(getAuthorizeStatus);
  const [isDifficulty, setIsDifficulty] = useState<boolean>(difficulty);
  const [isLearned, setIsLearned] = useState<boolean>(learned);
  const [hasWord, setHasWord] = useState<boolean>(hasUserWord);

  return (
    <article className="word-card">

      <div className="word-card__image-wrapper">
        <img 
            src={`${Url.DOMEN}/${image}`} 
            alt={word}
            width="390"
            height="260"
        />
      </div>
      
      <WordContent
        word={word}
        transcription={transcription}
        wordTranslate={wordTranslate}
        textExample={textExample}
        textExampleTranslate={textExampleTranslate}
        textMeaning={textMeaning}
        textMeaningTranslate={textMeaningTranslate}
        audio={audio}
        audioExample={audioExample}
        audioMeaning={audioMeaning}
        isPlayAudio={isPlayAudio}
        playAudioHandler={playAudioHandler}
      />

      {
        isAuthorize && 
        <div className="word-card__auth-buttons">

          <button
              onClick={() => {
                if (userAuthData && userAuthData.userId && userAuthData.token) {
                  const { userId, token } = userAuthData;
                  if (hasWord) {
                    changeDifficulty(id, { userId, token }, !isDifficulty);
                    setIsDifficulty((prev) => !prev);
                  } else {
                    createUserDifficultWord(id, { userId, token }, !isDifficulty);
                    setHasWord(true);
                    setIsDifficulty((prev) => !prev);
                  }
                }
              }} 
              className={
                isDifficulty 
                  ? "word-card__complex-btn word-card__complex-btn--checked" 
                  : "word-card__complex-btn"
              }
          >
            <svg className="word-card__complex-icon" width="11" height="24">
              <use xlinkHref="#flash-icon"></use>
            </svg>
            <span>Cложное</span> 
          </button>
  
          <button 
              onClick={() => {
                if (userAuthData && userAuthData.userId && userAuthData.token) {
                  const { userId, token } = userAuthData;
                  if (hasWord) {
                    changeLearned(id, { userId, token }, !isLearned);
                    setIsLearned((prev) => !prev);
                  } else {
                    createUserLearnedWord(id, { userId, token }, !isDifficulty);
                    setHasWord(true);
                    setIsLearned((prev) => !prev);
                  }
                }
              }} 
              className={
                isLearned 
                  ? "word-card__check-btn word-card__check-btn--checked" 
                  : "word-card__check-btn"
              }
          >
            <svg className="word-card__check-icon" width="22" height="16">
              <use xlinkHref="#check-icon"></use>
            </svg>
            <span>Изученное</span> 
          </button>
        </div>
      }
      
    </article>
  );
}

export default WordCard;