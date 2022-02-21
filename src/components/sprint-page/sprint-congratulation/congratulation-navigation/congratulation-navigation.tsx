import "./congratulation-navigation.css";
import { ICongratulationNavi, LocationState, IUserData } from '../../../../interface/interface';
import { useLocation } from "react-router";
import { getUserAuthData } from "../../../../store/data/selectors";
import { useSelector } from "react-redux";

const CongratulationNavigation: React.FC<ICongratulationNavi> = ({
  makeRandomWordsForWork,
  allWords,
  changePageState,
  changeAnswersArray,
  getWordsForWorkFromTextBook,
  changeState
}) => {

  const location = useLocation<LocationState>();
  let state = location.state as any;

  let user: IUserData;
  const USER_DATA = useSelector(getUserAuthData);
  if (USER_DATA) {
    user = {
      userId: USER_DATA.userId,
      token: USER_DATA.token,
    };
  }
  

  return (
    <div>
      <button
        className='sprint-navigation-block__button button-repeat'
        onClick={async () =>  {
          if(state) {
            await getWordsForWorkFromTextBook(state.page, state.group, user);
            changePageState("game");
          } else {
            makeRandomWordsForWork(allWords);
            changePageState("game");
          }

          changeAnswersArray([])
        }}
      >
        Повторить игру
      </button>
      <button
        className='sprint-navigation-block__button button-change'
        onClick={() => {
          changeState(undefined)
          changePageState("greeting")
        }}
      >
        Выбрать уровень
      </button>
    </div>
  );
};

export default CongratulationNavigation;
