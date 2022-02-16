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
}

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

export const enum PaginationData {
  START_INDEX = 1,
  TOTAL_COUNT = 600,
  SIBLING_COUNT = 0,
  PAGE_SIZE = 30,
}

export const DOTS = '...';

export const textbookSections = [
  { 
    id: 1,
    name: 1,
    labelClass: "textbook-nav__label", 
  }, 
  { 
    id: 2,
    name: 2,
    labelClass: "textbook-nav__label",
   }, 
  { 
    id: 3,
    name: 3,
    labelClass: "textbook-nav__label",
   }, 
  { 
    id: 4,
    name: 4,
    labelClass: "textbook-nav__label",
   }, 
  { 
    id: 5,
    name: 5,
    labelClass: "textbook-nav__label",
   }, 
  { 
    id: 6,
    name: 6,
    labelClass: "textbook-nav__label",
   }, 
  { 
    id: 7,
    name: "7 - Сложные слова",
    labelClass: "textbook-nav__label textbook-nav__label--complex",
  }, 
];
