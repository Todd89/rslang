import { useEffect, useState } from "react";
import GameBlock from "../sprint-game-block/sprint-game-block";
import SprintrGreetingBlock from "../sprint-greeting-block/sprint-greeting-block";
import CongratulationBlock from "../sprint-congratulation/sprint-congratulation-block";
import "./sprint-main-block.css";
import { IWordInArray, IWordInAnswerArray, IRandomWordInGame  } from '../../../interface/interface';
import {  makeTreeRandomPage, shuffle, randomNum  } from '../sprint-methods/sprint-methods'


const MainBlock: React.FC = () => {
  let [wordCount, setCount] = useState<number>(0);
  let [pageState, setPage] = useState<string>('greeting');
  const [words, setWords] = useState<Array<Array<IWordInArray>> | Array<IWordInArray>>([]);
  const [wordsInGame, setwordsInGame] = useState<Array<IWordInArray>>([]);
  const [randomWordsInGame, setRandomWordsInGame] = useState<Array<IRandomWordInGame>>([]);
  const [word, setWord] = useState<IWordInArray>();
  const [answersArray, setAnswersArray] = useState<Array<IRandomWordInGame>>([]);
 

  const makeRandomAnswerArray = (word:IWordInArray):IRandomWordInGame => {
    let  newRandomQuastion: IRandomWordInGame
    const VALUE = randomNum(9);
   
    if (VALUE < 5) {

      const ENGLISH_WORD = word.word.toUpperCase();
      const RUSSIAN_WORD = word.wordTranslate.toUpperCase();
      const TRANSCRIPTION = word.transcription.toUpperCase();
      const TYPE_OF_ANSWER = true;

      newRandomQuastion = {...{}, ENGLISH_WORD, RUSSIAN_WORD, TRANSCRIPTION, TYPE_OF_ANSWER}
       
      return newRandomQuastion;
    } else {
      const WRONG_NUM = randomNum(59);
      if (wordsInGame[WRONG_NUM].wordTranslate !== (word as IWordInArray).wordTranslate) {
        const ENGLISH_WORD = word.word.toUpperCase();
        const RUSSIAN_WORD = wordsInGame[WRONG_NUM].wordTranslate.toUpperCase();
        const TRANSCRIPTION = word.transcription.toUpperCase();
        const TYPE_OF_ANSWER = false;
  
        newRandomQuastion = {...{}, ENGLISH_WORD, RUSSIAN_WORD, TRANSCRIPTION, TYPE_OF_ANSWER}
         
        return newRandomQuastion;
      } else {
        makeRandomAnswerArray (word)
      }
    }
    const ENGLISH_WORD = word.word.toUpperCase();
    const RUSSIAN_WORD = word.wordTranslate.toUpperCase();
    const TRANSCRIPTION = word.transcription.toUpperCase();
    const TYPE_OF_ANSWER = true;

    newRandomQuastion = {...{}, ENGLISH_WORD, RUSSIAN_WORD, TRANSCRIPTION, TYPE_OF_ANSWER}

    return newRandomQuastion
  };


  const makeRandomQuastions = (wordsInGame:Array<IWordInArray>) => {
    console.log(wordsInGame)
    const RANDOM_QUASTIONS = wordsInGame.map((el) => { 
      return makeRandomAnswerArray(el)
    })

    setRandomWordsInGame(RANDOM_QUASTIONS);
  }

  useEffect(() => {
    if(wordsInGame.length > 0) {
      makeRandomQuastions(wordsInGame)
    }
  }, [wordsInGame])


  const changeWord = () => {
      const newWord: IWordInArray = wordsInGame[wordCount+1];
      setWord(newWord)
  }

  const changeAnswersArray = (arr:any) => {
    const NEW_ARR = arr.slice()
    setAnswersArray(NEW_ARR)
  }

  const changePageState = (name:string) => {
    setPage(name);
  };

  const changeWordCount = ()=> {
    setCount(wordCount+=1);
  };

  const changeWords = (arr:Array<IWordInArray> | undefined) => {
    const NEW_ARR: Array<IWordInArray>= []
    arr?.forEach((el) => NEW_ARR.push(el));

    setWords(NEW_ARR);

  };

  const setFirstWord = (arr:Array<IWordInArray>) => {
    const newWord: IWordInArray = arr[0];
    setWord(newWord);
  }

  const makeRandomWordsForWork = (wordsInGame:Array<IWordInArray>) => {
    const WORDS = wordsInGame; 
    const RANDOM_PAGES_NUMS: number[] = makeTreeRandomPage();
    const RESULT_WORDS: IWordInArray[] = [];

    RANDOM_PAGES_NUMS.forEach((el) => RESULT_WORDS.push(WORDS[el]))
  
    const RANDOM_WORDS_FOR_WORK = shuffle(RESULT_WORDS.flat());

    setwordsInGame(RANDOM_WORDS_FOR_WORK)

    return RANDOM_WORDS_FOR_WORK
  }
  
  if (pageState === 'game') {
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
  } else if (pageState === 'congratulation') {
    return (
      <main className=''>
        <div className=''>
          <CongratulationBlock answersArray={answersArray}/>
        </div>
      </main>
    );
  }
    return (
      <main className='main-sprint-block'>
        <div className='sprint-container container'>
          <SprintrGreetingBlock changePageState={changePageState} changeWords={changeWords} setFirstWord={setFirstWord} makeRandomWordsForWork={makeRandomWordsForWork}  makeRandomQuastions={makeRandomQuastions}/>
        </div>
      </main>
    );
 
};

export default MainBlock;
