import { IWordAudio, IAudioQuestion } from "../interface/interface-audio";
import { Url } from "../const/const";

export const PAGES_PER_GROUP = 30; //убрать в общие
export const WORDS_PER_PAGE = 20; //убрать в общие
export const AUDIO_MAX_QUESTION_AMOUNT = 2;
export const AUDIO_ANSWER_AMOUNT = 4;
export const AUDIO_LIVES_AMOUNT = 5;
export const AUDIO_ANSWER_TIME = 60000;
export const AUDIO_PATH_DATA_AUDIO = `${Url.DOMEN}/`;
export const AUDIO_PATH_UTILS_AUDIO = "/assets/sound/";
export const AUDIO_PATH_IMAGES = `${Url.DOMEN}/`;
export const AUDIO_QUESTIONS_ARRAY: Array<IAudioQuestion> = [];
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
                              Удачи!`;

export const AUDIO_PATH_ICONS = "/assets/icon/";
