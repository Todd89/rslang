import { useState } from "react";
import GameBlock from "../sprint-game-block/sprint-game-block";
import SprintrGreetingBlock from "../sprint-greeting-block/sprint-greeting-block";
import "./sprint-main-block.css";
import { IWordInArray } from '../../../interface/interface';
import { getWordsFromGroup, randomNum, makeTreeRandomPage, shuffle, makeWordsForWork } from '../sprint-methods/sprint-methods'

const MainBlock: React.FC = () => {
  const [pageState, setPage] = useState<boolean>(false);
  const [words, setWords] = useState<Array<Array<IWordInArray>>>([]);
  let [wordCount, setCount] = useState<number>(0);
  console.log(wordCount)
  const changePageState = () => {
    setPage(true);
  };

  const changeWordsCount = () => {
    setCount(wordCount++);
  };

  const changeWords = (arr:Array<IWordInArray>) => {
    const NEW_ARR = words;
    NEW_ARR.push(arr)
    setWords(NEW_ARR);
  };

  if (pageState) {
    return (
      <main className='main-sprint-block'>
        <div className='sprint-container container'>
          <GameBlock words={words} changeWrdCount={changeWordsCount}/>
        </div>
      </main>
    );
  }

  
  return (
    <main className='main-sprint-block'>
      <div className='sprint-container container'>
        <SprintrGreetingBlock changePageState={changePageState} changeWords={changeWords}/>
      </div>
    </main>
  );
};

export default MainBlock;
