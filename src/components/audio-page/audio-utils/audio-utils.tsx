import {
  AUDIO_MAX_QUESTION_AMOUNT,
  AUDIO_ANSWER_AMOUNT,
  AUDIO_QUESTIONS_ARRAY,
  AUDIO_USER_WORDS_ARRAY,
  AUDIO_USER_WORDS_ARRAY_FOR_GAME,
  AUDIO_EMPTY_USER_WORD,
  RIGHT_ANSWERS_DIFFICULT,
  RIGHT_ANSWERS_NOT_DIFFICULT,
} from "../../../const/const-audio";
import {
  IWordAudio,
  IStatistic,
  IAudioGameStatistic,
} from "../../../interface/interface-audio";

import { Url, Methods, ResponseStatus } from "../../../const/const";

import { IUserWord, IUserData } from "../../../interface/interface";

import { AuthData } from "../../../interface/auth-interface";
//import { IWord, IUserData } from "../../../interface/interface";

import { WORDS_PER_PAGE, PAGES_PER_GROUP } from "../../../const/const-audio";
import httpClient from "../../../services/http-client";

const wordsArray: Array<IWordAudio> = [];

const userLearnedWordsArray: Array<string> = [];
//const userWordsArray: Array<IUserWord> = [];
let userLearnedWordsArrayToCheck: Array<string> = [];

async function getWords(
  group: number,
  page: number,
  strong: boolean
): Promise<void> {
  const promiseArray = [];

  if (strong) {
    const wordsServer = httpClient.getChunkOfWords(
      String(page - 1),
      String(group)
    );
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
  updateGameStatistic: (data: IAudioGameStatistic) => void,
  userAuthData: AuthData
) {
  const userWordArr = AUDIO_USER_WORDS_ARRAY_FOR_GAME.filter(
    (item) => item.wordId === word.id
  );
  let userWord = AUDIO_EMPTY_USER_WORD;
  let isNewUserWord = true;
  if (userWordArr.length > 0) {
    userWord = userWordArr[0];
    isNewUserWord = false;
  } else {
    //создать новое слово
    userWord.optional.new = true;
    userWord.wordId = word.id;
    userWord.difficulty = "false";
    userWord.optional.group = word.group;
    userWord.optional.page = word.page;
    //добавить сохранение нового слова для статистики
  }
  userWord.optional.failCounter = Number(!isRightAnswer);
  if (userWord.difficulty === "true") {
    userWord.optional.successCounter = isRightAnswer
      ? Math.min(
          (userWord.optional.successCounter += 1),
          RIGHT_ANSWERS_DIFFICULT
        )
      : 0;
    userWord.optional.learned =
      isRightAnswer &&
      userWord.optional.successCounter === RIGHT_ANSWERS_DIFFICULT;
  } else {
    userWord.optional.successCounter = isRightAnswer
      ? Math.min(
          (userWord.optional.successCounter += 1),
          RIGHT_ANSWERS_NOT_DIFFICULT
        )
      : 0;
    userWord.optional.learned =
      isRightAnswer &&
      userWord.optional.successCounter === RIGHT_ANSWERS_NOT_DIFFICULT;
  }
  if (isNewUserWord) {
    //httpClient.createUserWord(userAuthData, userWord);
    createUserWord(userAuthData, userWord);
  } else {
    //httpClient.updateUserWord(userAuthData, userWord);
    updateUserWord(userAuthData, userWord);
  }

  updateGameStatistic({
    gameLearnedWords: Number(userWord.optional.learned),
    gameBestSeries: 0,
    gameSuccessCounter: Number(isRightAnswer),
    gameFailCounter: Number(!isRightAnswer),
    gameNewWords: Number(userWord.optional.new),
  });
}

const createUserWord = async (
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
};

export async function getUserWords(
  userAuthData: AuthData,
  isLoadFromTextBook: boolean
) {
  //User functions

  //console.log("utils getUserWords");

  const promiseArray = [];
  AUDIO_USER_WORDS_ARRAY.length = 0;

  //const userWords = httpClient.getAllUserWords({userId:userAuthData.userId,token:userAuthData.token});
  const userWords = httpClient.getAllUserWords(userAuthData);

  promiseArray.push(userWords);

  //console.log("utils getUserWords", userWords);

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

    // console.log("getUserWords AUDIO_USER_WORDS_ARRAY", AUDIO_USER_WORDS_ARRAY);
  });
}

export async function getUserWordsForTheGame(
  userAuthorized: boolean,
  userAuthData: AuthData
) {
  /*console.log(
    "getUserWordsForTheGame AUDIO_QUESTIONS_ARRAY",
    AUDIO_QUESTIONS_ARRAY
  );*/
  const wordsTemp = AUDIO_QUESTIONS_ARRAY.map((item) => item.questionWord);
  /*console.log(
    "getUserWordsForTheGame AUDIO_QUESTIONS_ARRAY",
    AUDIO_QUESTIONS_ARRAY
  );*/

  //console.log("getUserWordsForTheGame userWordsArray", AUDIO_USER_WORDS_ARRAY);

  AUDIO_USER_WORDS_ARRAY_FOR_GAME.length = 0;
  if (userAuthorized) {
    const arrTemp = AUDIO_USER_WORDS_ARRAY.filter((userWord) =>
      wordsTemp.map((wordTemp) => wordTemp.id).includes(userWord.wordId)
    );
    arrTemp.forEach((item) => AUDIO_USER_WORDS_ARRAY_FOR_GAME.push(item)); //получили пользовательские слова для игры
  }
  /* console.log(
    "getUserWordsForTheGame AUDIO_USER_WORDS_ARRAY_FOR_GAME",
    AUDIO_USER_WORDS_ARRAY_FOR_GAME
  );*/
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
      Math.floor(Math.random() * (arrAvailableWords.length - 1))
    ];
  }

  function getAnswersForQuestion(questionWord: IWordAudio): Array<IWordAudio> {
    const arrAnswers: Array<IWordAudio> = [];
    arrAnswers.push(questionWord);

    while (arrAnswers.length < AUDIO_ANSWER_AMOUNT) {
      const answer = getRandomWord();
      if (!arrAnswers.includes(answer)) {
        arrAnswers.push(answer);
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
  const dateTemp = new Date();
  const currentData = `${String(dateTemp.getFullYear)}-${String(
    dateTemp.getMonth() + 1
  )} - ${String(dateTemp.getDate())}`;
  const promise = httpClient.getUserStatistic(userAuthData);
  let localStatistic: IStatistic = {
    learned: 0,
    optional: {
      game: "audio",
      date: currentData,
      bestSeries: 0,
      successCounter: 0,
      failCounter: 0,
      newWords: 0,
    },
  };

  promise
    .then((values) => {
      for (let i = 0; i < values.length; i += 1) {
        if (
          values[i].optional.game === "audio" &&
          values[i].optional.date === currentData
        ) {
          localStatistic = values[i];
        }
      }
    })
    .catch((err) => "")
    .finally(() => {
      localStatistic.learned += statisticState.gameLearnedWords;
      localStatistic.optional.bestSeries = Math.max(
        localStatistic.optional.bestSeries,
        statisticState.gameBestSeries
      );
      localStatistic.optional.successCounter +=
        statisticState.gameSuccessCounter;
      localStatistic.optional.failCounter += statisticState.gameFailCounter;
      localStatistic.optional.newWords += statisticState.gameNewWords;

      httpClient.putUserStatistic(userAuthData, localStatistic);
    });
}
