import {
  AUDIO_MAX_QUESTION_AMOUNT,
  AUDIO_ANSWER_AMOUNT,
  AUDIO_QUESTIONS_ARRAY,
  AUDIO_USER_WORDS_ARRAY,
  AUDIO_USER_WORDS_ARRAY_FOR_GAME,
  AUDIO_EMPTY_USER_WORD,
  RIGHT_ANSWERS_DIFFICULT,
  RIGHT_ANSWERS_NOT_DIFFICULT,
  AUDIO_STAT,
  FORMER_STAT,
} from "../../../const/const-audio";
import {
  IWordAudio,
  IStatistic,
  IAudioGameStatistic,
  ILongTerm,
} from "../../../interface/interface-audio";

import { Url, Methods } from "../../../const/const";

import { IUserWord, IUserData, IUser } from "../../../interface/interface";

import { AuthData } from "../../../interface/auth-interface";
//import { IWord, IUserData } from "../../../interface/interface";

import { WORDS_PER_PAGE, PAGES_PER_GROUP } from "../../../const/const-audio";
import httpClient from "../../../services/http-client";

const wordsArray: Array<IWordAudio> = [];
const wordsArrayDifficult: Array<IUserWord> = [];

const userLearnedWordsArray: Array<string> = [];

let userLearnedWordsArrayToCheck: Array<string> = [];

async function getWords(
  group: number,
  page: number,
  strong: boolean
): Promise<void> {
  const promiseArray = [];

  if (strong) {
    const wordsServer = httpClient.getChunkOfWords(String(page), String(group));
    promiseArray.push(wordsServer);
  } else {
    for (let i = 0; i < page; i += 1) {
      const wordsServer = httpClient.getChunkOfWords(String(i), String(group));
      promiseArray.push(wordsServer);
    }
  }

  await Promise.all(promiseArray).then((values) => {
    for (let i = 0; i < values.length; i++) {
      values[i].forEach(
        (item: {
          id: string;
          group: number;
          page: number;
          word: string;
          image: string;
          audio: string;
          transcription: string;
          wordTranslate: string;
        }) => {
          const itemWord = {
            id: item.id,
            group: item.group,
            page: item.page,
            word: item.word,
            image: item.image,
            audio: item.audio,
            transcription: item.transcription,
            wordTranslate: item.wordTranslate,
          };
          wordsArray.push(itemWord);
        }
      );
    }
  });
}

export function createUpdateUserWord(
  word: IWordAudio,
  isRightAnswer: boolean,
  userAuthData: AuthData
  // updateGameStatistic: (data: IAudioGameStatistic) => void
) {
  const userWordArr = AUDIO_USER_WORDS_ARRAY_FOR_GAME.filter(
    (item) => item.wordId === word.id
  );
  let userWord = AUDIO_EMPTY_USER_WORD;
  let isNewUserWord = true;

  const indStat = AUDIO_STAT.findIndex((item) => item.id === word.id);

  if (userWordArr.length > 0) {
    userWord = userWordArr[0];
    isNewUserWord = false;
    userWord.optional.new = false;
  } else {
    //создать новое слово
    userWord.optional.new = true;
    userWord.wordId = word.id;
    userWord.difficulty = "false";
    userWord.optional.group = word.group;
    userWord.optional.page = word.page;
    AUDIO_STAT[indStat].new = true;
  }
  userWord.optional.failCounter = Number(!isRightAnswer);
  const learnedBefore = userWord.optional.learned;
  if (userWord.difficulty === "true") {
    userWord.optional.successCounter = isRightAnswer
      ? userWord.optional.successCounter === RIGHT_ANSWERS_DIFFICULT
        ? RIGHT_ANSWERS_DIFFICULT
        : (userWord.optional.successCounter += 1)
      : 0;
    userWord.optional.learned =
      isRightAnswer &&
      userWord.optional.successCounter === RIGHT_ANSWERS_DIFFICULT;
  } else {
    userWord.optional.successCounter = isRightAnswer
      ? userWord.optional.successCounter === RIGHT_ANSWERS_NOT_DIFFICULT
        ? RIGHT_ANSWERS_NOT_DIFFICULT
        : (userWord.optional.successCounter += 1)
      : 0;
    userWord.optional.learned =
      isRightAnswer &&
      userWord.optional.successCounter === RIGHT_ANSWERS_NOT_DIFFICULT;
  }
  if (!learnedBefore && userWord.optional.learned) {
    AUDIO_STAT[indStat].learned = true;
  }
  const userWordServer: IUserWord = {
    difficulty: userWord.difficulty,
    optional: {
      learned: userWord.optional.learned,
      group: userWord.optional.group,
      page: userWord.optional.page,
      successCounter: userWord.optional.successCounter,
      failCounter: userWord.optional.failCounter,
      new: userWord.optional.new,
    },
  };
  if (isNewUserWord) {
    httpClient.createUserWord(userAuthData, userWordServer, userWord.wordId);
    AUDIO_USER_WORDS_ARRAY.push(userWord);
  } else {
    httpClient.updateUserWord(userAuthData, userWordServer, userWord.wordId);
    const findWordIndex = AUDIO_USER_WORDS_ARRAY.findIndex(
      (item) => item.wordId === userWord.wordId
    );
    AUDIO_USER_WORDS_ARRAY.splice(findWordIndex, 1, userWord);
  }
}

/*const createUserWord = async (
  { userId, token }: IUserData,
  userWord: IUserWord
) => {
  const userWordServer = {
    difficulty: userWord.difficulty,
    optional: {
      learned: userWord.optional.learned,
      group: userWord.optional.group,
      page: userWord.optional.page,
      successCounter: userWord.optional.successCounter,
      failCounter: userWord.optional.failCounter,
      new: userWord.optional.new,
    },
  };
  const rawResponse = await fetch(
    `${Url.DOMEN}/users/${userId}/words/${userWord.wordId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userWordServer),
    }
  );
  const content = await rawResponse.json();
};

const updateUserWord = async (
  { userId, token }: IUserData,
  userWord: IUserWord
) => {
  const userWordServer = {
    difficulty: userWord.difficulty,
    optional: {
      learned: userWord.optional.learned,
      group: userWord.optional.group,
      page: userWord.optional.page,
      successCounter: userWord.optional.successCounter,
      failCounter: userWord.optional.failCounter,
      new: userWord.optional.new,
    },
  };

  const rawResponse = await fetch(
    `${Url.DOMEN}/users/${userId}/words/${userWord.wordId}`,
    {
      method: `${Methods.PUT}`,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userWordServer),
    }
  );
  const content = await rawResponse.json();
};*/

export async function getUserWords(
  userAuthData: AuthData,
  isLoadFromTextBook: boolean
) {
  const promiseArray = [];
  AUDIO_USER_WORDS_ARRAY.length = 0;

  userLearnedWordsArray.length = 0;

  const userWords = httpClient.getAllUserWords(userAuthData);

  promiseArray.push(userWords);
  await Promise.all(promiseArray).then((values) => {
    for (let i = 0; i < values.length; i++) {
      values[i].forEach(
        (item: {
          wordId: string;
          difficulty: string;
          optional: {
            learned: boolean;
            group: number;
            page: number;
            successCounter: number;
            failCounter: number;
            new: boolean;
          };
        }) => {
          const itemWord = {
            wordId: item.wordId,
            difficulty: item.difficulty,
            optional: {
              learned: item.optional.learned,
              group: item.optional.group,
              page: item.optional.page,
              successCounter: item.optional.successCounter,
              failCounter: item.optional.failCounter,
              new: item.optional.new,
            },
          };
          AUDIO_USER_WORDS_ARRAY.push(itemWord);
          if (itemWord.optional.learned) {
            userLearnedWordsArray.push(itemWord.wordId);
          }
        }
      );
    }

    if (isLoadFromTextBook) {
      userLearnedWordsArrayToCheck = userLearnedWordsArray.slice();
    }
  });
}

export async function getUserWordsForTheGame(
  userAuthorized: boolean,
  userAuthData: AuthData
) {
  const wordsTemp = AUDIO_QUESTIONS_ARRAY.map((item) => item.questionWord);

  AUDIO_USER_WORDS_ARRAY_FOR_GAME.length = 0;
  if (userAuthorized) {
    const arrTemp = AUDIO_USER_WORDS_ARRAY.filter((userWord) =>
      wordsTemp.map((wordTemp) => wordTemp.id).includes(userWord.wordId)
    );
    arrTemp.forEach((item) => AUDIO_USER_WORDS_ARRAY_FOR_GAME.push(item)); //получили пользовательские слова для игры
  }
}

export async function createArrayOfQuestions(
  group: number,
  page: number,
  isLoadFromTextBook: boolean,
  userAuthorized: boolean,
  userAuthData: AuthData
) {
  AUDIO_QUESTIONS_ARRAY.length = 0;

  AUDIO_USER_WORDS_ARRAY.length = 0;

  AUDIO_STAT.length = 0;

  if (page < 0) {
    await getWords(group, PAGES_PER_GROUP, false);
  } else {
    await getWords(group, page, true);
  }
  if (userAuthorized) {
    //для отбора неизученных слов
    await getUserWords(userAuthData, isLoadFromTextBook); //получить слова пользователя
  }

  const wordsForQuestions: Array<IWordAudio> = [];

  const arrAvailableWords = getFilteredArray(group, page);

  const questionAmount = Math.min(
    arrAvailableWords.length,
    AUDIO_MAX_QUESTION_AMOUNT
  );

  let counter = 0;

  while (
    wordsForQuestions.length < questionAmount &&
    counter < WORDS_PER_PAGE
  ) {
    const question = getRandomWord();

    if (
      !wordsForQuestions.includes(question) &&
      !userLearnedWordsArrayToCheck.includes(question.id)
    ) {
      wordsForQuestions.push(question);
      if (userAuthorized) {
        AUDIO_STAT.push({
          id: question.id,
          learned: false,
          new: false,
        });
      }
    }
    counter += 1;
  }

  if (wordsForQuestions.length < AUDIO_MAX_QUESTION_AMOUNT) {
    await getWords(group, page - 1, false);
    const question = getRandomWord();

    if (
      !wordsForQuestions.includes(question) &&
      !userLearnedWordsArrayToCheck.includes(question.id)
    ) {
      wordsForQuestions.push(question);
      if (userAuthorized) {
        AUDIO_STAT.push({
          id: question.id,
          learned: false,
          new: false,
        });
      }
    }
  }

  wordsForQuestions.forEach((word) => {
    AUDIO_QUESTIONS_ARRAY.push({
      questionWord: word,
      answers: getAnswersForQuestion(word),
    });
  });

  if (userAuthorized) {
    await getUserWordsForTheGame(userAuthorized, userAuthData);
  }

  function getRandomWord(): IWordAudio {
    return arrAvailableWords[
      Math.floor(Math.random() * arrAvailableWords.length)
    ];
  }

  function getAnswersForQuestion(questionWord: IWordAudio): Array<IWordAudio> {
    const arrAnswers: Array<IWordAudio> = [];
    arrAnswers.push(questionWord);

    while (
      arrAnswers.length < AUDIO_ANSWER_AMOUNT &&
      arrAnswers.length < wordsArray.length
    ) {
      const answer = getRandomWord();

      if (!arrAnswers.includes(answer)) {
        const checkingArr = arrAnswers.filter(
          (item) => item.word === answer.word
        );
        if (checkingArr.length === 0) {
          arrAnswers.push(answer);
        }
      }
    }
    arrAnswers.sort(() => Math.random() - 0.5);
    return arrAnswers;
  }
}

function getFilteredArray(group: number, page: number): Array<IWordAudio> {
  let arrAvailableWords: Array<IWordAudio> = [...wordsArray];
  if (group >= 0) {
    arrAvailableWords = wordsArray.filter((word) => word.group === group);
  }
  if (page >= 0) {
    const arrPageFiltered = arrAvailableWords.filter(
      (word) => word.page === page
    );
    let arrLength = arrPageFiltered.length;
    if (arrLength < 30) {
      arrAvailableWords = arrAvailableWords.filter((word) => word.page <= page);
    } else {
      arrAvailableWords = arrPageFiltered;
    }
  }
  return arrAvailableWords;
}

export async function getPutAudioUserStatistic(
  userAuthData: AuthData,
  statisticState: IAudioGameStatistic
) {
  const getStat = getUserStatistic(userAuthData);

  let newStat: ILongTerm;

  await getStat;

  let dataArr = FORMER_STAT.optional.longTerm.stat;
  const arrLength = dataArr.length;

  FORMER_STAT.learnedWords += statisticState.gameLearnedWords;
  FORMER_STAT.optional.audio.bestSeries = statisticState.gameBestSeries;
  FORMER_STAT.optional.audio.failCounter =
    FORMER_STAT.optional.audio.failCounter + statisticState.gameFailCounter;
  FORMER_STAT.optional.audio.newWords =
    FORMER_STAT.optional.audio.newWords + statisticState.gameNewWords;
  FORMER_STAT.optional.audio.successCounter =
    FORMER_STAT.optional.audio.successCounter +
    statisticState.gameSuccessCounter;
  FORMER_STAT.optional.audio.learnedWords =
    FORMER_STAT.optional.audio.learnedWords + statisticState.gameLearnedWords;

  if (arrLength === 0) {
    newStat = {
      data: new Date().toLocaleDateString(),
      newWordsInData: statisticState.gameNewWords,
      newLearnedInData: statisticState.gameLearnedWords,
    };
    dataArr.push(newStat);
  } else if (dataArr[arrLength - 1].data !== new Date().toLocaleDateString()) {
    newStat = {
      data: new Date().toLocaleDateString(),
      newWordsInData: statisticState.gameNewWords,
      newLearnedInData: statisticState.gameLearnedWords,
    };
    dataArr.push(newStat);
  } else {
    dataArr[arrLength - 1].newLearnedInData += statisticState.gameLearnedWords;
    dataArr[arrLength - 1].newWordsInData += statisticState.gameNewWords;
  }

  FORMER_STAT.optional.longTerm.stat = dataArr;

  const putStat = putUserStatistic(userAuthData, FORMER_STAT);
  await putStat;
}

export const getUserStatistic = async ({ userId, token }: IUserData) => {
  try {
    const rawResponse = await fetch(`${Url.DOMEN}/users/${userId}/statistics`, {
      method: `${Methods.GET}`,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    const stat = await rawResponse.json();

    const currentData = new Date().toLocaleDateString();

    FORMER_STAT.learnedWords = stat.learnedWords;

    if (stat.optional.audio.date === currentData) {
      FORMER_STAT.optional.audio.bestSeries = stat.optional.audio.bestSeries;
      FORMER_STAT.optional.audio.date = stat.optional.audio.date;
      FORMER_STAT.optional.audio.failCounter = stat.optional.audio.failCounter;
      FORMER_STAT.optional.audio.newWords = stat.optional.audio.newWords;
      FORMER_STAT.optional.audio.successCounter =
        stat.optional.audio.successCounter;
      FORMER_STAT.optional.audio.learnedWords =
        stat.optional.audio.learnedWords;
      FORMER_STAT.optional.sprint.bestSeries = stat.optional.sprint.bestSeries;
      FORMER_STAT.optional.sprint.date = stat.optional.sprint.date;
      FORMER_STAT.optional.sprint.failCounter =
        stat.optional.sprint.failCounter;
      FORMER_STAT.optional.sprint.newWords = stat.optional.sprint.newWords;
      FORMER_STAT.optional.sprint.successCounter =
        stat.optional.sprint.successCounter;
      FORMER_STAT.optional.sprint.learnedWords =
        stat.optional.sprint.learnedWords;
    }
    FORMER_STAT.optional.longTerm.stat.length = 0;
    for (let i = 0; i < stat.optional.longTerm.stat.length; i += 1) {
      const newStat = {
        data: stat.optional.longTerm.stat[i].data,
        newWordsInData:
          stat.optional.longTerm.stat[i].newWordsInData === undefined
            ? 0
            : stat.optional.longTerm.stat[i].newWordsInData,
        newLearnedInData:
          stat.optional.longTerm.stat[i].newLearnedInData === undefined
            ? 0
            : stat.optional.longTerm.stat[i].newLearnedInData,
      };
      FORMER_STAT.optional.longTerm.stat.push(newStat);
    }
  } catch {
    console.log("no stat for you, yet((");
  }
};

const putUserStatistic = async (
  { userId, token }: IUserData,
  statistic: IStatistic
) => {
  const rawResponse = await fetch(`${Url.DOMEN}/users/${userId}/statistics`, {
    method: `${Methods.PUT}`,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(statistic),
  });
  const content = await rawResponse.json();
};

export async function createArrayOfQuestionsFromDifficultWords(
  group: number,
  page: number,
  isLoadFromTextBook: boolean,
  userAuthorized: boolean,
  userAuthData: AuthData
) {
  if (!userAuthorized) {
    return;
  }

  AUDIO_QUESTIONS_ARRAY.length = 0;

  AUDIO_USER_WORDS_ARRAY.length = 0;

  AUDIO_STAT.length = 0;

  await getDifficultUserWords(userAuthData);

  for (let i = 0; i < wordsArrayDifficult.length; i++) {
    const item = wordsArrayDifficult[i];
    const getWord = await httpClient.getWord(item.wordId || "");
    const word = {
      id: getWord.id,
      group: getWord.group,
      page: getWord.page,
      word: getWord.word,
      image: getWord.image,
      audio: getWord.audio,
      transcription: getWord.transcription,
      wordTranslate: getWord.wordTranslate,
    };

    wordsArray.push(word);
  }

  const wordsForQuestions: Array<IWordAudio> = [];

  const questionAmount = Math.min(wordsArray.length, AUDIO_MAX_QUESTION_AMOUNT);

  let counter = 0;

  while (
    wordsForQuestions.length < questionAmount &&
    counter <= wordsArray.length
  ) {
    const question = getRandomDifficultWord();
    if (!wordsForQuestions.includes(question)) {
      wordsForQuestions.push(question);
      AUDIO_STAT.push({
        id: question.id,
        learned: false,
        new: false,
      });
    }
    counter += 1;
  }

  console.log(wordsForQuestions);

  wordsForQuestions.forEach((word) => {
    console.log(word);
    AUDIO_QUESTIONS_ARRAY.push({
      questionWord: word,
      answers: getAnswersForQuestion(word),
    });
  });

  await getUserWordsForTheGame(userAuthorized, userAuthData);

  function getRandomDifficultWord(): IWordAudio {
    return wordsArray[Math.floor(Math.random() * wordsArray.length)];
  }

  function getAnswersForQuestion(questionWord: IWordAudio): Array<IWordAudio> {
    const arrAnswers: Array<IWordAudio> = [];
    arrAnswers.push(questionWord);

    while (
      arrAnswers.length < AUDIO_ANSWER_AMOUNT &&
      arrAnswers.length < wordsArray.length
    ) {
      const answer = getRandomDifficultWord();

      if (!arrAnswers.includes(answer)) {
        const checkingArr = arrAnswers.filter(
          (item) => item.word === answer.word
        );
        if (checkingArr.length === 0) {
          arrAnswers.push(answer);
        }
      }
    }
    arrAnswers.sort(() => Math.random() - 0.5);
    return arrAnswers;
  }
}

export async function getDifficultUserWords(userAuthData: AuthData) {
  const promiseArray = [];
  AUDIO_USER_WORDS_ARRAY.length = 0;

  userLearnedWordsArray.length = 0;

  const userWords = httpClient.getAllUserWords(userAuthData);

  promiseArray.push(userWords);
  await Promise.all(promiseArray).then((values) => {
    for (let i = 0; i < values.length; i++) {
      values[i].forEach(
        (item: {
          wordId: string;
          difficulty: string;
          optional: {
            learned: boolean;
            group: number;
            page: number;
            successCounter: number;
            failCounter: number;
            new: boolean;
          };
        }) => {
          const itemWord = {
            wordId: item.wordId,
            difficulty: item.difficulty,
            optional: {
              learned: item.optional.learned,
              group: item.optional.group,
              page: item.optional.page,
              successCounter: item.optional.successCounter,
              failCounter: item.optional.failCounter,
              new: item.optional.new,
            },
          };

          if (itemWord.difficulty === "true" && !itemWord.optional.learned) {
            wordsArrayDifficult.push(itemWord);
          }
        }
      );
    }
  });
}
