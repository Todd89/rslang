import "./sprint-greeting-block.css";
import { IGreetingBlockProps, IUserData, LocationState, IWordInArray } from "../../../interface/interface";
import { BUTTONS_NUMS, SPRINT_RULE, SprintColors } from "../../../const/const";
import { getWordsFromGroup, shuffle } from "../sprint-methods/sprint-methods";
import httpClient from "../../../services/http-client";
import { useSelector } from "react-redux";
import { getUserAuthData } from "../../../store/data/selectors";
import { useLocation } from "react-router";
import { useState, useEffect } from "react";

const SprintrGreetingBlock: React.FC<IGreetingBlockProps> = ({
  changePageState,
  setFirstWord,
  makeRandomWordsForWork,
  changeAllWord,
  changeLoadingUserWords,
  changeWordsInGame
}) => {

  const location = useLocation<LocationState>();

  const getWordsForWorkFromTextBook = async (page:number, group: number) => {
    const PROMIS_ARR = [];
    let RESULT: Array<Array<IWordInArray>> = [];
    for (let i = page; i > 0; i--) {
      const WORDS_CHUNK = httpClient.getChunkOfWords(i.toString(), group.toString());
      PROMIS_ARR.push(shuffle(await WORDS_CHUNK));
    }
    await Promise.all(PROMIS_ARR).then((values) => {
      RESULT = values;
    });
    changeWordsInGame(RESULT.flat())
    return RESULT;
  };


  useEffect(()=>{
    const makeGame = async () => {
      if (location.state) {
        const locationState = location.state as any;
        const { group, page} = locationState;
        console.log("group", group);
        console.log("page", page);
        const WORDS = await getWordsForWorkFromTextBook(page, group);
        console.log(WORDS)
        if (newUser) {
          const LOADING_WORDS = await httpClient.getAllUserWords(newUser);
  
          changeLoadingUserWords(LOADING_WORDS);
        }
  
        changeAllWord(WORDS);

        // changeWordsInGame(WORDS.flat())
        setFirstWord(WORDS.flat());
        changePageState("game");
      }
    }
    makeGame()
  },[location])

 

  let newUser:IUserData
  const USER_DATA = useSelector(getUserAuthData);
  if (USER_DATA) {
    newUser = {
      userId: USER_DATA.userId,
      token: USER_DATA.token,
    };
  }
  

  const BUTTONS = BUTTONS_NUMS.map((item) => {
    const ID = item.toString();
    let color = "";
    switch (ID) {
      case "1":
        color = `${SprintColors.ONE}`;
        break;
      case "2":
        color = `${SprintColors.TWO}`;
        break;
      case "3":
        color = `${SprintColors.THREE}`;
        break;
      case "4":
        color = `${SprintColors.FOUR}`;
        break;
      case "5":
        color = `${SprintColors.FIVE}`;
        break;
      case "6":
        color = `${SprintColors.SIX}`;
        break;
      default:
        color = `${SprintColors.ONE}`;
        break;
    }

    return (
      <button
        key={ID}
        style={{ backgroundColor: color }}
        className='greeting-sprint-block__button'
        onClick={async () => {
          const WORDS = await getWordsFromGroup((Number(ID) - 1).toString());
          if (newUser) {
            const LOADING_WORDS = await httpClient.getAllUserWords(newUser);

            changeLoadingUserWords(LOADING_WORDS);
          }

          changeAllWord(WORDS);

          const WORDS_FOR_WORK = await makeRandomWordsForWork(WORDS);

          setFirstWord(WORDS_FOR_WORK);
          changePageState("game");
        }}
      >
        {ID}
      </button>
    );
  });

  return (
    <div className='greeting-sprint-block'>
      <div className='girl-image'>
        <img src='/assets/images/think_girl.png' alt='девочка' />
      </div>
      <div className='greeting-sprint-levelchange-block'>
        <div className='greeting-sprint-levelchange-block__rules'>
          <p className='greeting-sprint-levelchange-block__rules-text'>
            Правила игры
          </p>
          <p className='greeting-sprint-levelchange-block__rules-text'>
            {SPRINT_RULE}
          </p>
          <p className='greeting-sprint-levelchange-block__rules-text'>
            Выберите уровень сложности
          </p>
        </div>
        <div className='greeting-sprint-levelchange-block__levels'>
          <div className='greeting-sprint-levelchange-block__levels-buttons'>
            {BUTTONS}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SprintrGreetingBlock;
