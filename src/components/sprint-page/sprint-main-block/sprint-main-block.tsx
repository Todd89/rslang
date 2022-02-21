import { useEffect, useState } from "react";
import GameBlock from "../sprint-game-block/sprint-game-block";
import SprintrGreetingBlock from "../sprint-greeting-block/sprint-greeting-block";
import CongratulationBlock from "../sprint-congratulation/sprint-congratulation-block";
import "./sprint-main-block.css";

import {
  IWordInArray,
  IRandomWordInGame,
  IUserWord,
  LocationState,
  IUserData,
  TextbookState,
} from "../../../interface/interface";
import {
  makeFourRandomPage,
  shuffle,
  makeRandomAnswerArray,
} from "../sprint-methods/sprint-methods";
import { useLocation } from "react-router";
import httpClient from "../../../services/http-client";
import { useSelector } from "react-redux";
import { getUserAuthData } from "../../../store/data/selectors";

const MainBlock: React.FC = () => {
  let [pageState, setPage] = useState<string>("greeting");

  const [loadingUserWords, setLoadingUserWords] = useState<IUserWord[]>([]);
  const [allWords, setAllWords] = useState<Array<Array<IWordInArray>>>([]);
  const [wordsInGame, setwordsInGame] = useState<Array<IWordInArray>>([]);
  const [randomWordsInGame, setRandomWordsInGame] = useState<
    Array<IRandomWordInGame>
  >([]);
  const [word, setWord] = useState<IWordInArray>();
  const [answersArray, setAnswersArray] = useState<Array<IRandomWordInGame>>(
    []
  );
  const [state, setState] = useState<TextbookState | undefined>();

  const location = useLocation<LocationState>();
  const SourceState = location.state as any;

  useEffect(() => {
    changeState(SourceState);
  }, [location]);

  let newUser: IUserData;
  const USER_DATA = useSelector(getUserAuthData);
  if (USER_DATA) {
    newUser = {
      userId: USER_DATA.userId,
      token: USER_DATA.token,
    };
  }
  console.log(wordsInGame)
  const changeLoadingUserWords = (arr: IUserWord[]) => {
    setLoadingUserWords(arr);
  };

  const changeState = (state: TextbookState | undefined) => {
    setState(state);
  };

  const makeRandomQuastions = (gameWords: Array<IWordInArray>) => {
    const RANDOM_QUASTIONS = gameWords.map((el) => {
      return makeRandomAnswerArray(el, gameWords, state);
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

  const changeAnswersArray = (arr: Array<IRandomWordInGame>) => {
    const NEW_ARR = arr.slice();
    setAnswersArray(NEW_ARR);
  };

  const changePageState = (name: string) => {
    setPage(name);
  };

  const setFirstWord = (arr: Array<IWordInArray>) => {
    const newWord: IWordInArray = arr[0];
    setWord(newWord);
  };

  const makeRandomWordsForWork = (
    AllwordsInGame: Array<Array<IWordInArray>>
  ) => {
    const WORDS = AllwordsInGame;
    const RANDOM_PAGES_NUMS: number[] = makeFourRandomPage();
    const RESULT_WORDS: IWordInArray[][] = [];

    RANDOM_PAGES_NUMS.forEach((el) => RESULT_WORDS.push(WORDS[el]));

    const RANDOM_WORDS_FOR_WORK = shuffle(RESULT_WORDS.flat());

    setwordsInGame(RANDOM_WORDS_FOR_WORK);

    return RANDOM_WORDS_FOR_WORK;
  };

  const getWordsForWorkFromTextBook = async (
    page: number,
    group: number,
    user: IUserData | undefined
  ) => {
    const PROMIS_ARR = [];
    let RESULT: Array<Array<IWordInArray>> = [];
    let userWords: IUserWord[] = [];
    if (user) {
      userWords = await httpClient.getAllUserWords(user as IUserData);
    }
    console.log(userWords, "userWords");
    if(group < 6) {
      for (let i = page - 1; i >= 0; i--) {
        const WORDS_CHUNK = httpClient.getChunkOfWords(
          i.toString(),
          group.toString()
        );
        let newArr = shuffle(await WORDS_CHUNK);
        
        if (userWords.length) {
          newArr = newArr.filter((elem) => {
            let word = userWords.find(
              (el) => el.wordId === elem.id && el.optional.learned
            );
  
            if (!word) {
              return elem;
            }
          });
        }
  
        PROMIS_ARR.push(newArr);
      }
    } else if (group === 6) {
      const DIFFICULT_WORDS_OBJECT = await httpClient.getDifficultWords(user as IUserData);
      const DIFFICULT_WORDS = DIFFICULT_WORDS_OBJECT[0]["paginatedResults"]
      let newArr = shuffle(await DIFFICULT_WORDS);
      PROMIS_ARR.push(newArr);
    }
  
    await Promise.all(PROMIS_ARR).then((values) => {
      RESULT = values;
    });

    setwordsInGame(RESULT.flat());
    return RESULT;
  };

  const changeWordsInGame = (arr: any) => {
    setwordsInGame(arr);
  };

  if (pageState === "game") {
    return (
      <main className="main-sprint-block">
        <div className="sprint-container container">
          <GameBlock
            word={word as IWordInArray}
            randomWordsInGame={randomWordsInGame}
            changePageState={changePageState}
            changeAnswersArray={changeAnswersArray}
            loadingUserWords={loadingUserWords}
            changeLoadingUserWords={changeLoadingUserWords}
            changeState={changeState}
            state={state}
          />
        </div>
      </main>
    );
  } else if (pageState === "congratulation") {
    return (
      <main className="main-sprint-block">
        <div className="sprint-container container">
          <CongratulationBlock
            answersArray={answersArray}
            makeRandomWordsForWork={makeRandomWordsForWork}
            allWords={allWords}
            changePageState={changePageState}
            changeAnswersArray={changeAnswersArray}
            getWordsForWorkFromTextBook={getWordsForWorkFromTextBook}
            changeState={changeState}
          />
        </div>
      </main>
    );
  }
  return (
    <main className="main-sprint-block">
      <div className="sprint-container container">
        <SprintrGreetingBlock
          changePageState={changePageState}
          setFirstWord={setFirstWord}
          makeRandomWordsForWork={makeRandomWordsForWork}
          changeAllWord={changeAllWord}
          changeLoadingUserWords={changeLoadingUserWords}
          changeWordsInGame={changeWordsInGame}
          getWordsForWorkFromTextBook={getWordsForWorkFromTextBook}
          state={state}
        />
      </div>
    </main>
  );
};

export default MainBlock;
