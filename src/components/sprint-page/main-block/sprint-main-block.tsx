import { SetStateAction, useEffect, useState } from "react";
import GameBlock from "../sprint-game-block/sprint-game-block";
import SprintrGreetingBlock from "../sprint-greeting-block/sprint-greeting-block";
import CongratulationBlock from "../sprint-congratulation/sprint-congratulation-block";
import "./sprint-main-block.css";
import { IWordInArray, IWordInAnswerArray  } from '../../../interface/interface';
import {  makeTreeRandomPage, shuffle,  } from '../sprint-methods/sprint-methods'


const MainBlock: React.FC = () => {
  let [pageState, setPage] = useState<string>('greeting');
  const [words, setWords] = useState<Array<Array<IWordInArray>> | Array<IWordInArray>>([]);
  const [wordsInGame, setwordsInGame] = useState<Array<IWordInArray>>([]);
  const [word, setWord] = useState<IWordInArray>();
  const [answersArray, setAnswersArray] =useState<Array<IWordInAnswerArray>>([]);
  let [wordCount, setCount] = useState<number>(0);

  console.log(answersArray, 'main');

   useEffect(() => {
     if(words?.length > 0) {
      const newWord: IWordInArray = wordsInGame[wordCount];
      setWord(newWord)
     }
   }, [wordCount])


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
          <GameBlock word={word as IWordInArray} changeWordCount={changeWordCount} wordsInGame={wordsInGame} changePageState={changePageState} changeAnswersArray={changeAnswersArray}/>
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
          <SprintrGreetingBlock changePageState={changePageState} changeWords={changeWords} setFirstWord={setFirstWord} makeRandomWordsForWork={makeRandomWordsForWork}/>
        </div>
      </main>
    );
 
};

export default MainBlock;
