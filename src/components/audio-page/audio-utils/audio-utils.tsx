import {
  AUDIO_MAX_QUESTION_AMOUNT,
  AUDIO_ANSWER_AMOUNT,
  AUDIO_QUESTIONS_ARRAY,
} from "../../../const/const-audio";
import { IWordAudio, IUserWord } from "../../../interface/interface-audio";
import { IWord, IUserData } from "../../../interface/interface";

import { WORDS_PER_PAGE, PAGES_PER_GROUP } from "../../../const/const-audio";
import httpClient from "../../../services/http-client";

const wordsArray: Array<IWordAudio> = [];

const userLearnedWordsArray: Array<IUserWord> = [];

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

async function getUserWords(user: IUserData) {
  //User functions

  const promiseArray = [];
  const userWords = httpClient.getAllUserWords(user);

  promiseArray.push(userWords);

  await Promise.all(promiseArray).then((values) => {
    for (let i = 0; i < values.length; i++) {
      values[i].forEach(
        (item: {
          wordId: string;
          difficulty: string;
          optional: {
            // group: number;
            //  page: number;
            learned: boolean;
            new: boolean;
            wordCounter: number;
            rightCounter: number;
          };
        }) => {
          if (item.optional.learned) {
            const itemWord = {
              wordId: item.wordId,
              difficulty: item.difficulty,
              optional: {
                learned: item.optional.learned,
                new: item.optional.new,
                wordCounter: item.optional.wordCounter,
                rightCounter: item.optional.rightCounter,
              },
            };
            userLearnedWordsArray.push(itemWord);
          }
        }
      );
    }
  });
}

export async function createArrayOfQuestions(
  group: number,
  page: number
  // user: IUserData //authorization
) {
  AUDIO_QUESTIONS_ARRAY.length = 0;

  if (page < 0) {
    await getWords(group, PAGES_PER_GROUP, false);
  } else {
    await getWords(group, page, true);
  }

  //  await getUserWords(user);//authorization

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

    //добавить отбор по пользовательским словам, если запуск со страницы
    if (!wordsForQuestions.includes(question)) {
      wordsForQuestions.push(question);
    }
    counter += 1;
  }

  if (wordsForQuestions.length < AUDIO_MAX_QUESTION_AMOUNT) {
    await getWords(group, page - 1, false);
    const question = getRandomWord();

    if (!wordsForQuestions.includes(question)) {
      wordsForQuestions.push(question);
    }
  }

  wordsForQuestions.forEach((word) => {
    AUDIO_QUESTIONS_ARRAY.push({
      questionWord: word,
      answers: getAnswersForQuestion(word),
    });
  });

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
