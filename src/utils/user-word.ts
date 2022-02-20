import { IUserData, IUserWord } from "../interface/interface";
import httpClient from "../services/http-client";


export const createUserDifficultWord = async (
  id: string, 
  userAuthData: IUserData,
  isDifficult: boolean
) => {
  const getWord = await httpClient.getWord(id);
  let userWord: IUserWord = {
    difficulty: String(isDifficult),
    optional: {
      learned: false,
      group: getWord.group,
      page: getWord.page,
      successCounter: 0,
      failCounter: 0,
      new: false,
    },
  };
  httpClient.createUserWord(userAuthData, userWord, id);
}

export const createUserLearnedWord = async (
  id: string, 
  userAuthData: IUserData,
  isLearned: boolean 
) => {
  const getWord = await httpClient.getWord(id);
  let userWord: IUserWord = {
    difficulty: "false",
    optional: {
      learned: isLearned,
      group: getWord.group,
      page: getWord.page,
      successCounter: 0,
      failCounter: 0,
      new: false,
    },
  };
  userWord.optional.learned = isLearned;
  httpClient.createUserWord(userAuthData, userWord, id);
} 

export async function changeDifficulty(
  id: string,
  userAuthData: IUserData,
  isDifficult: boolean
) {
  const response = await httpClient.getUserWord(userAuthData, id);
  console.log("changeDifficulty - isDifficult", isDifficult)
  if (response === undefined) {
    //новое слово, раньше пользователю не встречалось
    createUserDifficultWord(id, userAuthData, isDifficult);
  } else {
    //уже встречалось, просто меняем признак
    const { optional } = response;
    httpClient.updateUserWord(userAuthData, { difficulty: String(isDifficult), optional}, id);
  }
}

export async function changeLearned(
  id: string,
  userAuthData: IUserData,
  isLearned: boolean
) {
  const response = await httpClient.getUserWord(userAuthData, id);
  if (response === undefined) {
    //новое слово, раньше пользователю не встречалось
    createUserLearnedWord(id, userAuthData, isLearned);
  } else {
    //уже встречалось, просто меняем признак
    const { optional, difficulty } = response;
    optional.learned = isLearned;
    httpClient.updateUserWord(userAuthData, { difficulty, optional}, id);
  }
}
