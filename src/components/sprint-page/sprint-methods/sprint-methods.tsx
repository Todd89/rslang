import httpClient from "../../../services/http-client";
import { SprintNums } from "../../../const/const";
import {
  IWordInArray,
  IRandomWordInGame,
  IUserWord,
  IUserData,
  IStatistic,
  ILongTerm,
} from "../../../interface/interface";


const getWordsFromGroup = async (group: string) => {
  const PROMIS_ARR = [];
  let RESULT: Array<Array<IWordInArray>> = [];
  for (let i = 0; i < SprintNums.PAGE_COUNT; i++) {
    const WORDS_CHUNK = httpClient.getChunkOfWords(i.toString(), group);
    PROMIS_ARR.push(WORDS_CHUNK);
  }
  await Promise.all(PROMIS_ARR).then((values) => {
    RESULT = values;
  });

  return RESULT;
};

function randomNum(max: number) {
  const RANDOM_NUM = Math.floor(Math.random() * max);
  return RANDOM_NUM;
}

function shuffle(array: Array<IWordInArray>) {
  let currentIndex = array.length;
  let temporaryValue;
  while (0 !== currentIndex) {
    const RANDOM_NUM = randomNum(currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[RANDOM_NUM];
    array[RANDOM_NUM] = temporaryValue;
  }

  return array;
}

const makeFourRandomPage = () => {
  const RANDOM_PAGES_NUMS: number[] = [];
  while (RANDOM_PAGES_NUMS.length < 4) {
    const RANDOM_PAGE = randomNum(30);
    if (RANDOM_PAGES_NUMS.indexOf(RANDOM_PAGE) === -1) {
      RANDOM_PAGES_NUMS.push(RANDOM_PAGE);
    }
  }
  return RANDOM_PAGES_NUMS;
};

export const changeScoreX = (
  rightAnswerCount: number,
  setScoreX: (num: number) => void
) => {
  let NUM = rightAnswerCount;
  let result

  if(NUM >= 4 && NUM <= 7) {
    result = 20;
  } 
  if(NUM >= 8 && NUM < 11) {
    result = 30;
  } 
  if(NUM >= 11) {
    result = 40;
  } 
  if (NUM <= 3 ) {
    result = 10;
  }

  setScoreX(result as number);
};

const createNewUserWord = (
  { PAGE, GROUP }: IRandomWordInGame,
  success: boolean
): IUserWord => {
  const newWord: IUserWord = {
    difficulty: "false",
    optional: {
      learned: false,
      group: GROUP,
      page: PAGE,
      successCounter: 0,
      failCounter: 0,
      new: true,
    },
  };

  if (success) {
    newWord.optional.successCounter++;
  }

  return newWord;
};

const makeAnswersArray = (
  rightAnswer: boolean,
  playerAnswer: boolean,
  randomWordsInGame: IRandomWordInGame[],
  answers: IRandomWordInGame[],
  changeRightAnswerCount:(type:boolean) => void,
  setAnswers: (arr: IRandomWordInGame[]) => void,
  makeBestSeries: () => void,
  nullBestSeries: () => void,
  AUDIO_RIGHT: HTMLAudioElement,
  AUDIO_WRONG: HTMLAudioElement,
  count: number
) => {
  if (rightAnswer === playerAnswer) {
    changeRightAnswerCount(true);
    makeBestSeries()
    const ANSWER_STATE = { TYPE_OF_ANSWER: true };
    const ANWSER_WORD = { ...randomWordsInGame[count], ...ANSWER_STATE };
    const NEW_ARR = answers.slice();
    NEW_ARR.push(ANWSER_WORD);
    setAnswers(NEW_ARR);
    AUDIO_RIGHT.play();
  } else {
    changeRightAnswerCount(false);
    nullBestSeries();
    const ANSWER_STATE = { TYPE_OF_ANSWER: false };
    const ANWSER_WORD = { ...randomWordsInGame[count], ...ANSWER_STATE };
    const NEW_ARR = answers.slice();
    NEW_ARR.push(ANWSER_WORD);
    setAnswers(NEW_ARR);
    AUDIO_WRONG.play();
  }
};


const addViewToBonus = (rightAnswerCount: number) => {
  const EL = document.getElementById("level-up") as HTMLElement;
  const SCORE_X = document.getElementById("score-x") as HTMLElement
  const EL_FIRST = EL.firstElementChild;
  const EL_SECOND = EL.firstElementChild?.nextElementSibling;
  const EL_THIRD = EL.firstElementChild?.nextElementSibling?.nextElementSibling;
  const EL_ARR = [EL_FIRST, EL_SECOND, EL_THIRD];
  const NUM = rightAnswerCount;
  
  if(NUM === 1 || NUM === 5 || NUM === 9) {
    EL_FIRST?.classList.add("view");
  } 
  if(NUM === 2 || NUM === 6 || NUM === 10) {
    EL_SECOND?.classList.add("view");
  } 
  if(NUM === 3 || NUM === 7 || NUM >= 11) {
    EL_THIRD?.classList.add("view");
  } 
  if (NUM === 0 || NUM === 4 || NUM === 8) {
    EL_ARR.forEach((el) => el?.classList.remove("view"));
    
  }
  if (NUM === 4 || NUM === 8 || NUM === 11) {
    SCORE_X.classList.add("animation-score");
  } else {
    SCORE_X.classList.remove("animation-score");
  }
};

const makeWord = (
  state: boolean,
  word: IWordInArray,
  russianVariant: string
) => {
  let newRandomQuastion: IRandomWordInGame;

  const ID = word.id;
  const AUDIO = word.audio;
  const PAGE = word.page;
  const GROUP = word.group;
  const ENGLISH_WORD = word.word.toUpperCase();
  const RUSSIAN_WORD = russianVariant.toUpperCase();
  const REAL_TRANSLATE = word.wordTranslate.toUpperCase();
  const TRANSCRIPTION = word.transcription.toUpperCase();

  const TYPE_OF_ANSWER = state;

  newRandomQuastion = {
    ...{},
    ID,
    AUDIO,
    ENGLISH_WORD,
    RUSSIAN_WORD,
    TRANSCRIPTION,
    REAL_TRANSLATE,
    TYPE_OF_ANSWER,
    PAGE,
    GROUP,
  };

  return newRandomQuastion;
};

const makeRandomAnswerArray = (
  word: IWordInArray,
  wordsInGame: Array<IWordInArray>,
  state:any
): IRandomWordInGame => {
  let maxWord = 59;
  if(state) {
    maxWord = wordsInGame.length;
  }
  const VALUE = randomNum(9);

  if (VALUE < 5) {
    return makeWord(true, word, word.wordTranslate);
  } else {
    const WRONG_NUM = randomNum(maxWord);
    if (
      wordsInGame[WRONG_NUM].wordTranslate !==
      (word as IWordInArray).wordTranslate
    ) {
      return makeWord(false, word, wordsInGame[WRONG_NUM].wordTranslate);
    } else {
      makeRandomAnswerArray(word, wordsInGame, state);
    }
  }
  return makeWord(true, word, word.wordTranslate);
};

const chooseMaxSuccess = (difficulty: string) => {
  if (difficulty === "false") return 3;
  return 5;
};

const updateWord = (
  word: IUserWord,
  success: boolean,
  learnWordsInGame: number,
  setlearnWordsInGame: React.Dispatch<React.SetStateAction<number>>
) => {
  const MAX_NUM = chooseMaxSuccess(word.difficulty);
  delete word.id;
  delete word.wordId;
  if (success && !word.optional.learned) {
    word.optional.successCounter += 1;
    if (word.optional.successCounter === MAX_NUM) {
      word.optional.learned = true;
      word.optional.successCounter = 0;
      setlearnWordsInGame(learnWordsInGame + 1);
    }
  } else if (!success) {
    word.optional.learned = false;
    word.optional.successCounter = 0;
  }
  console.log(word, "word")
  return word;
};

const workWithUserWord = async (
  type:boolean,
  user: IUserData,
  loadingUserWords: IUserWord[],
  randomWordsInGame: IRandomWordInGame[],
  count: number,
  changeLoadingUserWords: (arr: IUserWord[]) => void,
  learnWordsInGame: number,
  newWordsInGame: number,
  setNewWordsInGame: React.Dispatch<React.SetStateAction<number>>,
  setlearnWordsInGame: React.Dispatch<React.SetStateAction<number>>,
) => {
  const FIND = loadingUserWords.find(
    (el: IUserWord) => el.wordId === randomWordsInGame[count].ID
  );

  const SUCCESS = randomWordsInGame[count].TYPE_OF_ANSWER === type;

  if (!FIND) {
    const NEW_WORD = createNewUserWord(
      { ...randomWordsInGame[count] },
      SUCCESS
    );
    setNewWordsInGame(newWordsInGame + 1);
    loadingUserWords.push(NEW_WORD);
    changeLoadingUserWords(loadingUserWords);

    await httpClient.createUserWord(
      user as IUserData,
      NEW_WORD,
      randomWordsInGame[count].ID
    );
  } else {
    const WORD = await httpClient.getUserWord(
      user as IUserData,
      randomWordsInGame[count].ID
    );

    const UPDATE_WORD = updateWord (
      WORD,
      SUCCESS,
      learnWordsInGame,
      setlearnWordsInGame
    );
    await httpClient.updateUserWord(
      user as IUserData,
      UPDATE_WORD,
      randomWordsInGame[count].ID
    );
  }
};

const newStatistic = async (
  statistic: IStatistic,
  user: IUserData,
  learnWordsInGame: number,
  newWordsInGame: number,
  bestSeries: number,
  answers:IRandomWordInGame[]
) => {
  let newWords = 0;
  let best = 0;
  let newStat:ILongTerm;
  let successCounter = 0;
  let failCounter = 0;
  let dataArr = statistic.optional.longTerm.stat;
  let lastItem = statistic.optional.longTerm.stat.length - 1;
  let successAnswers = answers.filter((el) => el.TYPE_OF_ANSWER === true);
  let successCounterInGame = successAnswers.length;
  let failCounterInGame = answers.length - successAnswers.length;


  if (statistic.optional.sprint.successCounter > 0) {
    successCounter = statistic.optional.sprint.successCounter;
  }
  if (statistic.optional.sprint.failCounter > 0) {
    failCounter = statistic.optional.sprint.failCounter;
  }

  if (statistic.optional.sprint.newWords > 0) {
    newWords = statistic.optional.sprint.newWords;
  }

  if (bestSeries > statistic.optional.sprint.bestSeries) {
    best = bestSeries
  } else {
    best = statistic.optional.sprint.bestSeries
  }
  
  if (statistic.optional.longTerm.stat[lastItem].data !== new Date().toLocaleDateString()) {
        newStat = {
          data: new Date ().toLocaleDateString(),
          newWordsInData: newWordsInGame,
          newLearnedInData: learnWordsInGame,
      }
      dataArr.push(newStat)
  } else {
     dataArr[lastItem].newLearnedInData = statistic.learnedWords + learnWordsInGame;
     dataArr[lastItem].newWordsInData = newWords + newWordsInGame;
  }

  const NEW_STATISTIC: IStatistic = {
    learnedWords: statistic.learnedWords + learnWordsInGame,
    optional: {
      sprint:{ 
        date: new Date().toLocaleDateString(),
        bestSeries: best,
        successCounter: successCounter + successCounterInGame,
        failCounter: failCounter + failCounterInGame,
        newWords: newWords + newWordsInGame,
      },
      audio:statistic.optional.audio,
      longTerm:{
        stat: dataArr,
       }
    },
  };
  console.log(NEW_STATISTIC);
  await httpClient.putUserStatistic(user as IUserData, NEW_STATISTIC);
};

export {
  getWordsFromGroup,
  randomNum,
  makeFourRandomPage,
  shuffle,
  createNewUserWord,
  makeAnswersArray,
  addViewToBonus,
  makeWord,
  makeRandomAnswerArray,
  workWithUserWord,
  newStatistic
};
