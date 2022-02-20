import "./congratulation-navigation.css";
import { ICongratulationNavi, LocationState } from '../../../../interface/interface';
import { useLocation } from "react-router";

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
  

  return (
    <div>
      <button
        className='sprint-navigation-block__button-repeat '
        onClick={async () =>  {
          if(state) {
            await getWordsForWorkFromTextBook(state.page, state.group);
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
        className='sprint-navigation-block__button-change '
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
