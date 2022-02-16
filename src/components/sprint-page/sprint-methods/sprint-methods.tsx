import httpClient from "../../../services/http-client";
import { SprintNums } from "../../../const/const";
import {
  IWordInArray,
  IRandomWordInGame,
  IUserWord,
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
    difficulty: "weak",
    optional: {
      learned: false,
      group: GROUP,
      page: PAGE,
      successCounter: 0,
      failCounter: 0,
      new: true,
    },
  };
  if (success && !newWord.optional.learned) {
    newWord.optional.successCounter++;
  } else {
    newWord.optional.failCounter++;
    newWord.optional.successCounter = 0;
  }

  if (newWord.difficulty === "weak") {
    if (newWord.optional.successCounter === SprintNums.MAX_SUCCESS_LIGTH_MODE) {
      newWord.optional.learned = true;
    }
  } else {
    if (newWord.optional.successCounter === SprintNums.MAX_SUCCESS_HARD_MODE) {
      newWord.optional.learned = true;
    }
  }
  return newWord;
};

const makeAnswersArray = (
  rightAnswer: boolean,
  playerAnswer: boolean,
  randomWordsInGame: IRandomWordInGame[],
  answers: IRandomWordInGame[],
  setAnswers: (arr: IRandomWordInGame[]) => void,
  AUDIO_RIGHT:HTMLAudioElement,
  AUDIO_WRONG:HTMLAudioElement,
  count:number
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

const addViewToBonus = (scoreX:number) => {
  const EL = document.getElementById("level-up") as HTMLElement;
  const EL_FIRST = EL.firstElementChild;
  const EL_SECOND = EL.firstElementChild?.nextElementSibling;
  const EL_THIRD =
    EL.firstElementChild?.nextElementSibling?.nextElementSibling;
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
}

const makeWord = (state: boolean, word:IWordInArray, russianVariant:string) => {
  let newRandomQuastion: IRandomWordInGame;

  const ID = word.id;
  const AUDIO = word.audio;
  const PAGE = word.page;
  const GROUP = word.group;
  const ENGLISH_WORD = word.word.toUpperCase();
  const RUSSIAN_WORD = russianVariant.toUpperCase();
  const REAL_TRANSLATE =  word.wordTranslate.toUpperCase()
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
    GROUP
  };

  return newRandomQuastion;
}

const makeRandomAnswerArray = (word: IWordInArray, wordsInGame:Array<IWordInArray>): IRandomWordInGame => {
    
  const VALUE = randomNum(9);

  if (VALUE < 5) {
    return makeWord(true, word, word.wordTranslate)
  } else {
    const WRONG_NUM = randomNum(59);
    if (
      wordsInGame[WRONG_NUM].wordTranslate !==
      (word as IWordInArray).wordTranslate
    ) {
      return makeWord(false, word,  wordsInGame[WRONG_NUM].wordTranslate)
    } else {
      makeRandomAnswerArray(word, wordsInGame);
    }
  }
  return makeWord(true, word, word.wordTranslate)
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
  makeRandomAnswerArray
};
