import { useEffect, useState } from "react";
import GameBlock from "../sprint-game-block/sprint-game-block";
import SprintrGreetingBlock from "../sprint-greeting-block/sprint-greeting-block";
import CongratulationBlock from "../sprint-congratulation/sprint-congratulation-block";
import "./sprint-main-block.css";
import { IWordInArray, IRandomWordInGame, IUserWord, LocationState, IUserData } from "../../../interface/interface";
import {
  makeTreeRandomPage,
  shuffle,
  makeRandomAnswerArray
} from "../sprint-methods/sprint-methods";
import { useLocation } from "react-router";
import httpClient from "../../../services/http-client";
import { useSelector } from "react-redux";
import { getUserAuthData } from '../../../store/data/selectors'

const MainBlock: React.FC = () => {
  let [pageState, setPage] = useState<string>("greeting");

  const [loadingUserWords, setLoadingUserWords] = useState<IUserWord[]>([])
  const [allWords, setAllWords] = useState<Array<Array<IWordInArray>>>([]);
  const [wordsInGame, setwordsInGame] = useState<Array<IWordInArray>>([]);
  const [randomWordsInGame, setRandomWordsInGame] = useState<
    Array<IRandomWordInGame>
  >([]);
  const [word, setWord] = useState<IWordInArray>();
  const [answersArray, setAnswersArray] = useState<Array<IRandomWordInGame>>(
    []
  );
  const [fromTextBook, setFromTextBook] = useState(false)
 
  let newUser:IUserData
  const USER_DATA = useSelector(getUserAuthData);
  if (USER_DATA) {
    newUser = {
      userId: USER_DATA.userId,
      token: USER_DATA.token,
    };
  }

    const changeLoadingUserWords = (arr:IUserWord[]) => {
    setLoadingUserWords(arr)
  }

  // const getWordsFromGroupFromTextBook = async (page:number, group: number) => {
  //   const PROMIS_ARR = [];
  //   let RESULT: Array<Array<IWordInArray>> = [];
  //   for (let i = page; i >= 0; i--) {
  //     const WORDS_CHUNK = httpClient.getChunkOfWords(i.toString(), group.toString());
  //     PROMIS_ARR.push(WORDS_CHUNK);
  //   }
  //   await Promise.all(PROMIS_ARR).then((values) => {
  //     RESULT = values;
  //   });
  
  //   return RESULT;
  // };

  // const makeAnwersArrayFromTextBook = async (page:number, group: number) => {
  //   const WORDS =  await getWordsFromGroupFromTextBook(page, group);
  //   const FLAT_WORDS_FOR_WORK = WORDS.flat();
  //   setwordsInGame(FLAT_WORDS_FOR_WORK);
  //   setFirstWord(FLAT_WORDS_FOR_WORK);
  // } 



  // const makeUserWords = async () => {
  //   if (newUser) {
  //     const LOADING_WORDS = await httpClient.getAllUserWords(newUser);
  //     changeLoadingUserWords(LOADING_WORDS);
  //   }
  // }

  // const location = useLocation<LocationState>();

  
 
  // useEffect (() => {
  //   if (location.state) {
  //     const locationState = location.state as any;
  //     const {group, page} = locationState;
  //     console.log("group", group);
  //     console.log("page", page);
  //     makeUserWords();
  //     makeAnwersArrayFromTextBook(page, group);
  //     console.log(wordsInGame)
  //     setFromTextBook(true)
  //     // setPage("game")
  //   }
  // },[])

  const {state = {}} = useLocation<LocationState>();

  useEffect(()=>{

    console.log(state)
  },[state])

  // if (state) {
  //     const locationState = state as any;
  //     const {group, page} = locationState;
  //     console.log("group", group);
  //     console.log("page", page);
  //     makeUserWords();
  //     makeAnwersArrayFromTextBook(page, group);
  //     console.log(wordsInGame)
  //     setFromTextBook(true)
  //     // setPage("game")
  //   }
 
  

  const makeRandomQuastions = (gameWords: Array<IWordInArray>) => {
    const RANDOM_QUASTIONS = gameWords.map((el) => {
      return makeRandomAnswerArray(el, gameWords);
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

  const changeAnswersArray = (arr:Array<IRandomWordInGame>) => {
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
    const RANDOM_PAGES_NUMS: number[] = makeTreeRandomPage();
    const RESULT_WORDS: IWordInArray[][] = [];

    RANDOM_PAGES_NUMS.forEach((el) => RESULT_WORDS.push(WORDS[el]));

    const RANDOM_WORDS_FOR_WORK = shuffle(RESULT_WORDS.flat());

    setwordsInGame(RANDOM_WORDS_FOR_WORK);

    return RANDOM_WORDS_FOR_WORK;
  };


  if (pageState === "game" || fromTextBook) {
    return (
      <main className='main-sprint-block'>
        <div className='sprint-container container'>
          <GameBlock
            word={word as IWordInArray}
            randomWordsInGame={randomWordsInGame}
            changePageState={changePageState}
            changeAnswersArray={changeAnswersArray}
            loadingUserWords={loadingUserWords}
            changeLoadingUserWords={changeLoadingUserWords}
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
          changeLoadingUserWords={changeLoadingUserWords}
        />
      </div>
    </main>
  );
};

export default MainBlock;
