import {
  AUDIO_MAX_QUESTION_AMOUNT,
  AUDIO_ANSWER_AMOUNT,
  AUDIO_QUESTIONS_ARRAY,
} from "../../../const/const-audio";
import { IWord } from "../../../interface/interface-audio";

import { PAGES_PER_GROUP } from "../../../const/const-audio";
import httpClient from "../../../services/http-client";

const wordsArray: Array<IWord> = [];

async function getWords(group: number, page: number): Promise<void> {
  const promiseArray = [];
  for (let i = 0; i < PAGES_PER_GROUP; i += 1) {
    const wordsServer = httpClient.getChunkOfWords(String(i), String(group));
    promiseArray.push(wordsServer);
  }

  await Promise.all(promiseArray).then((values) => {
    for (let i = 0; i < values.length; i++) {
      values[i].forEach(
        (item: {
          id: any;
          group: any;
          page: any;
          word: any;
          image: any;
          audio: any;
          transcription: any;
          wordTranslate: any;
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

export async function createArrayOfQuestions(group: number, page: number) {
  AUDIO_QUESTIONS_ARRAY.length = 0;

  await getWords(group, page);
  const wordsForQuestions: Array<IWord> = [];

  const arrAvailableWords = getFilteredArray(group, page);

  const questionAmount = Math.min(
    arrAvailableWords.length,
    AUDIO_MAX_QUESTION_AMOUNT
  );

  while (wordsForQuestions.length < questionAmount) {
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

  function getRandomWord(): IWord {
    return arrAvailableWords[
      Math.floor(Math.random() * (arrAvailableWords.length - 1))
    ];
  }

  function getAnswersForQuestion(questionWord: IWord): Array<IWord> {
    const arrAnswers: Array<IWord> = [];
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

function getFilteredArray(group: number, page: number): Array<IWord> {
  let arrAvailableWords: Array<IWord> = [...wordsArray];
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
