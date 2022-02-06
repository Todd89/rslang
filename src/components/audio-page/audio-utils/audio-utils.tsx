import {
  MAX_QUESTION_AMOUNT,
  ANSWER_AMOUNT,
  CURRENT_GAME_PARAMETERS,
} from "./constants-audiochallenge";
import { IQuestion, IWord } from "./project-interfaces";
import { Question } from "./question";
import { WordsArray } from "./test-server-words";

export function createArrayOfQuestions(): Array<IQuestion> {
  const questionArray: Array<IQuestion> = [];
  const wordsForQuestions: Array<IWord> = [];
  const { group, page } = CURRENT_GAME_PARAMETERS;

  const arrAvailableWords = getFilteredArray(group, page);

  const questionAmount = Math.min(
    arrAvailableWords.length,
    MAX_QUESTION_AMOUNT
  );

  while (wordsForQuestions.length < questionAmount) {
    const question = getRandomWord();

    if (!wordsForQuestions.includes(question)) {
      wordsForQuestions.push(question);
    }
  }

  wordsForQuestions.forEach((word) => {
    questionArray.push({
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

    while (arrAnswers.length < ANSWER_AMOUNT) {
      const answer = getRandomWord();
      if (!arrAnswers.includes(answer)) {
        arrAnswers.push(answer);
      }
    }
    arrAnswers.sort(() => Math.random() - 0.5);
    return arrAnswers;
  }
  return questionArray;
}

function getFilteredArray(group: number, page: number): Array<IWord> {
  let arrAvailableWords: Array<IWord> = [...WordsArray];
  if (group >= 0) {
    arrAvailableWords = WordsArray.filter((word) => word.group === group);
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
