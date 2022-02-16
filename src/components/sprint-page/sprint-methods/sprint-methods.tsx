import httpClient from "../../../services/http-client";
import { SprintNums } from "../../../const/const";
import {
  IWordInArray,
  IRandomWordInGame,
  IUserWord,
  IUserData,
  IStatistic,
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

const makeTreeRandomPage = () => {
  const RANDOM_PAGES_NUMS: number[] = [];
  while (RANDOM_PAGES_NUMS.length < 3) {
    const RANDOM_PAGE = randomNum(30);
    if (RANDOM_PAGES_NUMS.indexOf(RANDOM_PAGE) === -1) {
      RANDOM_PAGES_NUMS.push(RANDOM_PAGE);
    }
  }
  return RANDOM_PAGES_NUMS;
};

export const changeScoreX = (
  answers: IRandomWordInGame[],
  setScoreX: (num: number) => void
) => {
  let result = 1;
  const LAST_WORD = answers.length - 1;
  if (
    answers[LAST_WORD]?.TYPE_OF_ANSWER &&
    answers[LAST_WORD - 1]?.TYPE_OF_ANSWER &&
    answers[LAST_WORD - 2]?.TYPE_OF_ANSWER
  ) {
    result = SprintNums.MULTIPLIER_TWO;
  } else if (
    answers[LAST_WORD]?.TYPE_OF_ANSWER &&
    answers[LAST_WORD - 1]?.TYPE_OF_ANSWER
  ) {
    result = SprintNums.MULTIPLIER_DOTE_FIVE;
  } else if (answers[LAST_WORD]?.TYPE_OF_ANSWER) {
    result = SprintNums.MULTIPLIER_DOTE_TWENTYFIVE;
  }

  setScoreX(result);
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
  setAnswers: (arr: IRandomWordInGame[]) => void,
  AUDIO_RIGHT: HTMLAudioElement,
  AUDIO_WRONG: HTMLAudioElement,
  count: number
) => {
  if (rightAnswer === playerAnswer) {
    const ANSWER_STATE = { TYPE_OF_ANSWER: true };
    const ANWSER_WORD = { ...randomWordsInGame[count], ...ANSWER_STATE };
    const NEW_ARR = answers.slice();
    NEW_ARR.push(ANWSER_WORD);
    setAnswers(NEW_ARR);
    AUDIO_RIGHT.play();
  } else {
    const ANSWER_STATE = { TYPE_OF_ANSWER: false };
    const ANWSER_WORD = { ...randomWordsInGame[count], ...ANSWER_STATE };
    const NEW_ARR = answers.slice();
    NEW_ARR.push(ANWSER_WORD);
    setAnswers(NEW_ARR);
    AUDIO_WRONG.play();
  }
};

const addViewToBonus = (scoreX: number) => {
  const EL = document.getElementById("level-up") as HTMLElement;
  const EL_FIRST = EL.firstElementChild;
  const EL_SECOND = EL.firstElementChild?.nextElementSibling;
  const EL_THIRD = EL.firstElementChild?.nextElementSibling?.nextElementSibling;
  const EL_ARR = [EL_FIRST, EL_SECOND, EL_THIRD];

  switch (scoreX) {
    case SprintNums.MULTIPLIER_DOTE_TWENTYFIVE:
      EL_FIRST?.classList.add("view");
      break;
    case SprintNums.MULTIPLIER_DOTE_FIVE:
      EL_SECOND?.classList.add("view");
      break;
    case SprintNums.MULTIPLIER_TWO:
      EL_THIRD?.classList.add("view");
      break;
    default:
      EL_ARR.forEach((el) => el?.classList.remove("view"));
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
  wordsInGame: Array<IWordInArray>
): IRandomWordInGame => {
  const VALUE = randomNum(9);

  if (VALUE < 5) {
    return makeWord(true, word, word.wordTranslate);
  } else {
    const WRONG_NUM = randomNum(59);
    if (
      wordsInGame[WRONG_NUM].wordTranslate !==
      (word as IWordInArray).wordTranslate
    ) {
      return makeWord(false, word, wordsInGame[WRONG_NUM].wordTranslate);
    } else {
      makeRandomAnswerArray(word, wordsInGame);
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
      setlearnWordsInGame(learnWordsInGame + 1);
    }
  } else {
    word.optional.learned = false;
    word.optional.successCounter = 0;
  }

  return word;
};

const workWithUserWord = async (
  user: IUserData,
  loadingUserWords: IUserWord[],
  randomWordsInGame: IRandomWordInGame[],
  count: number,
  changeLoadingUserWords: (arr: IUserWord[]) => void,
  learnWordsInGame: number,
  newWordsInGame: number,
  setNewWordsInGame: React.Dispatch<React.SetStateAction<number>>,
  setlearnWordsInGame: React.Dispatch<React.SetStateAction<number>>
) => {
  const FIND = loadingUserWords.find(
    (el: any) => el.wordId === randomWordsInGame[count].ID
  );

  const SUCCESS = !randomWordsInGame[count].TYPE_OF_ANSWER ? true : false;

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

    const UPDATE_WORD = updateWord(
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
  newWordsInGame: number
) => {
  let newWords = 0;
  if (statistic.optional.newWords) {
    newWords = statistic.optional.newWords;
  }
  const NEW_STATISTIC: IStatistic = {
    learnedWords: statistic.learnedWords + learnWordsInGame,
    optional: {
      game: "sprint",
      date: new Date(),
      bestSeries: 0,
      succesCounter: 0,
      failCounter: 0,
      newWords: newWords + newWordsInGame,
    },
  };
  console.log(NEW_STATISTIC);
  await httpClient.putUserStatistic(user as IUserData, NEW_STATISTIC);
};

export {
  getWordsFromGroup,
  randomNum,
  makeTreeRandomPage,
  shuffle,
  createNewUserWord,
  makeAnswersArray,
  addViewToBonus,
  makeWord,
  makeRandomAnswerArray,
  workWithUserWord,
  newStatistic
};
