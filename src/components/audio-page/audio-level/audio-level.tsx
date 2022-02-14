import "./audio-level.css";
import { createArrayOfQuestions } from "../audio-utils/audio-utils";

import { useSelector } from "react-redux";
import {
  getUserAuthData,
  getAuthorizeStatus,
} from "../../../store/data/selectors";

import { AuthData } from "../../../interface/auth-interface";

interface IProps {
  id: number;
  isGameLoaded: boolean;
  changeState: (isOn: boolean) => void;
  changeGameLoadedStatus: (isLoad: boolean) => void;
  changeIsGameChosen: (isCh: boolean) => void;
}

export function AudioLevel(props: IProps) {
  const {
    id,
    isGameLoaded,
    changeState,
    changeGameLoadedStatus,
    changeIsGameChosen,
  } = props;

  function loadGame(userAuthorized: boolean, userAuthData: AuthData) {
    changeIsGameChosen(true);
    (async () => {
      if (!isGameLoaded) {
        await createArrayOfQuestions(
          id - 1,
          -1,
          false,
          userAuthorized,
          userAuthData
        );
        changeState(true);
        changeGameLoadedStatus(true);
      }
    })();
  }

  function btnColor(id: number) {
    let color: string;
    switch (id) {
      case 1:
        color = "#e2faed";
        break;
      case 2:
        color = "#ffba43";
        break;
      case 3:
        color = "#3cb77e";
        break;
      case 4:
        color = "#ffba01";
        break;
      case 5:
        color = "#3cb10e";
        break;
      case 6:
        color = "#aaba63";
        break;
      default:
        color = "#aaba63";
        break;
    }
    return color;
  }

  const userAuthData = useSelector(getUserAuthData);
  const userAuthorized = useSelector(getAuthorizeStatus);

  return (
    <button
      className="btn__level"
      onClick={() => {
        loadGame(userAuthorized, userAuthData);
      }}
      style={{
        backgroundColor: btnColor(id),
      }}
    >
      {id}
    </button>
  );
}
