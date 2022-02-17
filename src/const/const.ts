import { IStatistic } from '../interface/interface'

export const enum AppRoute {
  ROOT = "/",
  AUDIO_CHALLENGE = "/audio-challenge",
  SPRINT = "/sprint",
  TEXTBOOK = "/textbook",
  STATS = "/stats",
}

export const enum Methods {
  PUT = "PUT",
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
}

export const enum ResponseStatus {
  OK = 200,
  EXPECTATION_FAILED = 417,
}

export const enum Url {
  DOMEN = "https://react-app-learnwords.herokuapp.com",
}


export const enum SprintNums {
  PAGE_COUNT = 30,
  MINUTE = 60,
  MAX_SUCCESS_HARD_MODE = 5,
  MAX_SUCCESS_LIGTH_MODE = 3,
  MULTIPLIER_TWO = 2,
  MULTIPLIER_DOTE_FIVE = 1.5,
  MULTIPLIER_DOTE_TWENTYFIVE = 1.25,
  PLUS_TO_SCORE = 100,
  MAX_ANSWERS_LENGTH = 10,
}

export const enum SprintColors {
  ONE = '#e2faed',
  TWO = '#a0db8e',
  THREE = '#3cb77e',
  FOUR = '#ffba01',
  FIVE = '#3cb10e',
  SIX = '#c808f9',
}

export const NULL_STATISTIC: IStatistic = {
  learnedWords: 0,
  optional: {
    sprint: 
      {
        date: new Date(),
        bestSeries: 0,
        successCounter: 0,
        failCounter: 0,
        newWords: 0,
      },
    audio: 
      {
        date: new Date(),
        bestSeries: 0,
        successCounter: 0,
        failCounter: 0,
        newWords: 0,
      },
  },
};

export const SPRINT_RULE = 'В данной игре необходимо ответить правильный или нет дан перевод английского слова. Если ответ правильный, то увеличивается множитель очков. У Вас 60 секунд, попробуйте набрать максимальное количество очков.'

export const BUTTONS_NUMS = [1, 2, 3, 4, 5, 6];

export const teamMembers = [
  {
    id: 1,
    name: "Александр Голамонов",
    work: "Здесь будет написано, что делал каждый из нас. Если хотите текст можете предложить уже сейчас",
    ghLink: "https://github.com/Todd89",
    avatar: "assets/images/avatar-sasha.jpg",
    role: "Team-lead",
  },
  {
    id: 2,
    name: "Ольга Якушева",
    work: "Здесь будет написано, что делал каждый из нас. Если хотите текст можете предложить уже сейчас",
    ghLink: "https://github.com/Dairin-dei",
    avatar: "assets/images/avatar-olya.jpg",
    role: "Front-end",
  },
  {
    id: 3,
    name: "Роман Гольцман",
    work: "Здесь будет написано, что делал каждый из нас. Если хотите текст можете предложить уже сейчас",
    ghLink: "https://github.com/Romnasi",
    avatar: "assets/images/avatar-roman.jpg",
    role: "Front-end",
  }
]

