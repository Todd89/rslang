import "./sprint-greeting-block.css";
import { IGreetingBlockProps } from "../../../interface/interface";
import { BUTTONS_NUMS, SPRINT_RULE, SprintColors } from "../../../const/const";
import { getWordsFromGroup } from "../sprint-methods/sprint-methods";
import httpClient from "../../../services/http-client";
import { useSelector } from "react-redux";
import { getUserAuthData } from "../../../store/data/selectors";

const SprintrGreetingBlock: React.FC<IGreetingBlockProps> = ({
  changePageState,
  setFirstWord,
  makeRandomWordsForWork,
  changeAllWord,
  changeLoadingUserWords,
}) => {
  const USER_DATA = useSelector(getUserAuthData);
  const NEW_USER = {
    userId: USER_DATA.userId,
    token: USER_DATA.token,
  };

  const BUTTONS = BUTTONS_NUMS.map((item) => {
    const ID = item.toString();
    let color = "";
    switch (ID) {
      case "1":
        color = `${SprintColors.ONE}`;
        break;
      case "2":
        color = `${SprintColors.TWO}`;
        break;
      case "3":
        color = `${SprintColors.THREE}`;
        break;
      case "4":
        color = `${SprintColors.FOUR}`;
        break;
      case "5":
        color = `${SprintColors.FIVE}`;
        break;
      case "6":
        color = `${SprintColors.SIX}`;
        break;
      default:
        color = `${SprintColors.ONE}`;
        break;
    }

    return (
      <button
        key={ID}
        style={{ backgroundColor: color }}
        className='greeting-sprint-block__button'
        onClick={async () => {
          const WORDS = await getWordsFromGroup((Number(ID) - 1).toString());

          const LOADING_WORDS = await httpClient.getAllUserWords(NEW_USER);

          changeLoadingUserWords(LOADING_WORDS);
          changeAllWord(WORDS);

          const WORDS_FOR_WORK = await makeRandomWordsForWork(WORDS);

          setFirstWord(WORDS_FOR_WORK);
          changePageState("game");
        }}
      >
        {ID}
      </button>
    );
  });

  return (
    <div className='greeting-sprint-block'>
      <div className='girl-image'>
        <img src='/assets/images/png/think_girl.png' alt='девочка' />
      </div>
      <div className='greeting-sprint-levelchange-block'>
        <div className='greeting-sprint-levelchange-block__rules'>
          <p className='greeting-sprint-levelchange-block__rules-text'>
            Правила игры
          </p>
          <p className='greeting-sprint-levelchange-block__rules-text'>
            {SPRINT_RULE}
          </p>
          <p className='greeting-sprint-levelchange-block__rules-text'>
            Выберите уровень сложности
          </p>
        </div>
        <div className='greeting-sprint-levelchange-block__levels'>
          <div className='greeting-sprint-levelchange-block__levels-buttons'>
            {BUTTONS}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SprintrGreetingBlock;
