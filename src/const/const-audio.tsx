import {
  IWordAudio,
  IAudioQuestion,
  IUserWord,
  IAudioStat,
  IStatistic,
  ILongTerm,
} from "../interface/interface-audio";
import { Url } from "../const/const";

export const PAGES_PER_GROUP = 29; //убрать в общие
export const WORDS_PER_PAGE = 20; //убрать в общие
export const AUDIO_MAX_QUESTION_AMOUNT = 30;
export const AUDIO_ANSWER_AMOUNT = 4;
export const AUDIO_LIVES_AMOUNT = 5;
export const RIGHT_ANSWERS_DIFFICULT = 5;
export const RIGHT_ANSWERS_NOT_DIFFICULT = 3;
export const AUDIO_ANSWER_TIME = 7000;
export const DELAY_AUDIO_QUESTION = 1000;
export const AUDIO_PATH_DATA_AUDIO = `${Url.DOMEN}/`;
export const AUDIO_PATH_UTILS_AUDIO = "/assets/sound/";
export const AUDIO_PATH_IMAGES = `${Url.DOMEN}/`;
export const AUDIO_PATH_ICONS = "/assets/icon/";
export const AUDIO_QUESTIONS_ARRAY: Array<IAudioQuestion> = [];
export const AUDIO_USER_WORDS_ARRAY: Array<IUserWord> = [];
export const AUDIO_USER_WORDS_ARRAY_FOR_GAME: Array<IUserWord> = [];
export const AUDIO_BEST_SERIES = [0];

const dateTemp = new Date().toLocaleDateString();

export const FORMER_STAT: IStatistic = {
  learnedWords: 0,
  optional: {
    audio: {
      date: dateTemp,
      bestSeries: 0,
      successCounter: 0,
      failCounter: 0,
      newWords: 0,
      learnedWords: 0,
    },
    sprint: {
      date: dateTemp,
      bestSeries: 0,
      successCounter: 0,
      failCounter: 0,
      newWords: 0,
      learnedWords: 0,
    },
    longTerm: {
      stat: [],
    },
  },
};

export const AUDIO_STAT: Array<IAudioStat> = [];

export const AUDIO = new Audio();

export const AUDIO_EMPTY_WORD: IWordAudio = {
  id: "-1",
  group: -1,
  page: -1,
  word: "",
  image: "",
  audio: "",
  transcription: "",
  wordTranslate: "",
};

export const AUDIO_EMPTY_USER_WORD: IUserWord = {
  wordId: "-1",
  difficulty: "false",
  optional: {
    learned: false,
    group: -1,
    page: -1,
    successCounter: 0,
    failCounter: 0,
    new: false,
  },
};

export const AUDIO_RULES = `В этой игре вам нужно будет определить слово, сказанное вслух, 
                              и выбрать его из предложенного списка.
                              На каждый ответ дается 6 секунд.
                              Если вы ошибаетесь, то теряете жизнь.
                              Всего у вас 5 жизней.                      
                              Уровень сложности выбирается кнопками внизу.
                              Каждая кнопка соответствует разделу учебника.
                              Так как вы зашли в игру из главного меню, вопросов 20, 
                              в пределах выбранного уровня сложности.
                              Если вы заходите в игру со страницы учебника, то вопросы будут
                              сформированы из списка текушего раздела и текущей или предыдущих страниц.
                              Отвечать можно как мышкой, так и кнопками клавиатуры: по номерам кнопок слева направо 1, 2, 3, 4.
                              Переход к следующему вопросу - стрелка вправо.
                              Если вы правильно угадаете слово три раза подряд, оно станет изученным.
                              Но если слово сложное, то угадать придется пять раз подряд.
                              Если ошибетесь хотя бы один раз, вам придется учить его снова.
                              Чтобы игра отразилась в статистике, ее придется пройти до конца!
                              Удачи!`;
