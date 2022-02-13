import { useEffect, useState } from "react";
import GameBlock from "../sprint-game-block/sprint-game-block";
import SprintrGreetingBlock from "../sprint-greeting-block/sprint-greeting-block";
import CongratulationBlock from "../sprint-congratulation/sprint-congratulation-block";
import "./sprint-main-block.css";
import { IWordInArray, IRandomWordInGame } from "../../../interface/interface";
import {
  makeTreeRandomPage,
  shuffle,
  randomNum,
} from "../sprint-methods/sprint-methods";

const MainBlock: React.FC = () => {
  let [wordCount, setCount] = useState<number>(0);
  let [pageState, setPage] = useState<string>("greeting");

  const [allWords, setAllWords] = useState<Array<Array<IWordInArray>>>([]);
  const [wordsInGame, setwordsInGame] = useState<Array<IWordInArray>>([]);
  const [randomWordsInGame, setRandomWordsInGame] = useState<
    Array<IRandomWordInGame>
  >([]);
  const [word, setWord] = useState<IWordInArray>();
  const [answersArray, setAnswersArray] = useState<Array<IRandomWordInGame>>(
    []
  );

  const makeRandomAnswerArray = (word: IWordInArray): IRandomWordInGame => {
    let newRandomQuastion: IRandomWordInGame;
    const VALUE = randomNum(9);

    if (VALUE < 5) {
      const AUDIO = word.audio;
      const ENGLISH_WORD = word.word.toUpperCase();
      const RUSSIAN_WORD = word.wordTranslate.toUpperCase();
      const REAL_TRANSLATE =  word.wordTranslate.toUpperCase()
      const TRANSCRIPTION = word.transcription.toUpperCase();
     
      const TYPE_OF_ANSWER = true;

      newRandomQuastion = {
        ...{},
        AUDIO,
        ENGLISH_WORD,
        RUSSIAN_WORD,
        TRANSCRIPTION,
        REAL_TRANSLATE,
        TYPE_OF_ANSWER,
      };

      return newRandomQuastion;
    } else {
      const WRONG_NUM = randomNum(59);
      if (
        wordsInGame[WRONG_NUM].wordTranslate !==
        (word as IWordInArray).wordTranslate
      ) {
        const AUDIO = word.audio;
        const ENGLISH_WORD = word.word.toUpperCase();
        const RUSSIAN_WORD = wordsInGame[WRONG_NUM].wordTranslate.toUpperCase();
        const REAL_TRANSLATE =  word.wordTranslate.toUpperCase();
        const TRANSCRIPTION = word.transcription.toUpperCase();
        const TYPE_OF_ANSWER = false;

        newRandomQuastion = {
          ...{},
          AUDIO,
          ENGLISH_WORD,
          RUSSIAN_WORD,
          REAL_TRANSLATE,
          TRANSCRIPTION,
          TYPE_OF_ANSWER,
        };

        return newRandomQuastion;
      } else {
        makeRandomAnswerArray(word);
      }
    }
    const AUDIO = word.audio;
    const ENGLISH_WORD = word.word.toUpperCase();
    const RUSSIAN_WORD = word.wordTranslate.toUpperCase();
    const REAL_TRANSLATE =  word.wordTranslate.toUpperCase();
    const TRANSCRIPTION = word.transcription.toUpperCase();
    const TYPE_OF_ANSWER = true;

    newRandomQuastion = {
      ...{},
      AUDIO,
      ENGLISH_WORD,
      RUSSIAN_WORD,
      REAL_TRANSLATE,
      TRANSCRIPTION,
      TYPE_OF_ANSWER,
    };

    return newRandomQuastion;
  };

  const makeRandomQuastions = (wordsInGame: Array<IWordInArray>) => {
    const RANDOM_QUASTIONS = wordsInGame.map((el) => {
      return makeRandomAnswerArray(el);
    });

    setRandomWordsInGame(RANDOM_QUASTIONS);
  };

  useEffect(() => {
    if (wordsInGame.length > 0) {
      makeRandomQuastions(wordsInGame);
    }
  }, [wordsInGame]);

  const changeAllWord = (arr: Array<Array<IWordInArray>>) => {
    const NEW_ARR = arr.slice();
    setAllWords(NEW_ARR);
  };

  const changeWord = () => {
    const newWord: IWordInArray = wordsInGame[wordCount + 1];
    setWord(newWord);
  };

  const changeAnswersArray = (arr: any) => {
    const NEW_ARR = arr.slice();
    setAnswersArray(NEW_ARR);
  };

  const changePageState = (name: string) => {
    setPage(name);
  };

  const changeWordCount = () => {
    setCount((wordCount += 1));
  };


  const setFirstWord = (arr: Array<IWordInArray>) => {
    const newWord: IWordInArray = arr[0];
    setWord(newWord);
  };

  const makeRandomWordsForWork = (
    AllwordsInGame: Array<Array<IWordInArray>>
  ) => {
    const WORDS = AllwordsInGame;
    const RANDOM_PAGES_NUMS: number[] = makeTreeRandomPage();
    const RESULT_WORDS: IWordInArray[][] = [];

    RANDOM_PAGES_NUMS.forEach((el) => RESULT_WORDS.push(WORDS[el]));

    const RANDOM_WORDS_FOR_WORK = shuffle(RESULT_WORDS.flat());

    setwordsInGame(RANDOM_WORDS_FOR_WORK);

    return RANDOM_WORDS_FOR_WORK;
  };

  if (pageState === "game") {
    return (
      <main className='main-sprint-block'>
        <div className='sprint-container container'>
          <GameBlock
            word={word as IWordInArray}
            randomWordsInGame={randomWordsInGame}
            changeWordCount={changeWordCount}
            changePageState={changePageState}
            changeAnswersArray={changeAnswersArray}
            changeWord={changeWord}
          />
        </div>
      </main>
    );
  } else if (pageState === "congratulation") {
    return (
      <main className='main-sprint-block'>
        <div className='sprint-container container'>
          <CongratulationBlock
            answersArray={answersArray}
            makeRandomWordsForWork={makeRandomWordsForWork}
            allWords={allWords}
            changePageState={changePageState}
            changeAnswersArray={changeAnswersArray}
          />
        </div>
      </main>
    );
  }
  return (
    <main className='main-sprint-block'>
      <div className='sprint-container container'>
        <SprintrGreetingBlock
          changePageState={changePageState}
          setFirstWord={setFirstWord}
          makeRandomWordsForWork={makeRandomWordsForWork}
          changeAllWord={changeAllWord}
        />
      </div>
    </main>
  );
};

export default MainBlock;
