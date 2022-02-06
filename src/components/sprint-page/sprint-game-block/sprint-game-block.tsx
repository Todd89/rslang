import { useEffect, useState } from 'react';
import httpClient from '../../../services/http-client';
import { getWordsFromGroup, randomNum, makeTreeRandomPage, shuffle, makeWordsForWork } from '../sprint-methods/sprint-methods'
import './sprint-game-block.css';
import { IWordInArray, IWordsOfArrays } from '../../../interface/interface'

const GameBlock: React.FC<IWordsOfArrays & any> = ({words, changeWordsCount}) => {


  
  const WORDS_FOR_WORK = makeWordsForWork(words);

  console.log(WORDS_FOR_WORK);

  return (
      <div>
        <div className='girl-image'>
            <img
              src='/assets/images/png/sprint_girl.png' alt="девочка"
            />
        </div>  
        <div className='game-sprint-block'>
          <div className='game-sprint-block__top-lights'></div>
          <div className='game-sprint-block__quastion'></div>
          <div className='game-sprint-block__buttons-block'>
            <button className='game-sprint-block__button game-sprint-block__button_wrong'
            onClick={() => changeWordsCount()}
            >Неверно</button>
            <button className='game-sprint-block__button game-sprint-block__button_right'>Правильно</button>
          </div>
        </div>
      </div>
      )
    };

export default GameBlock;
