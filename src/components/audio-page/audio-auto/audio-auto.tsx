import {
  createArrayOfQuestions,
  createArrayOfQuestionsFromDifficultWords,
} from "../audio-utils/audio-utils";
import { useSelector } from "react-redux";

import {
  getUserAuthData,
  getAuthorizeStatus,
} from "../../../store/data/selectors";

import { AuthData } from "../../../interface/auth-interface";
import { useEffect } from "react";

interface IProps {
  group: number;
  page: number;
  isGameLoaded: boolean;
  changeState: (isGame: boolean) => void;
  changeGameLoadedStatus: (isLoad: boolean) => void;
}

export function AudioAuto(props: IProps) {
  const { group, page, isGameLoaded, changeState, changeGameLoadedStatus } =
    props;

  const userAuthData = useSelector(getUserAuthData);
  const userAuthorized = useSelector(getAuthorizeStatus);

  useEffect(() => {
    (async () => {
      if (!isGameLoaded && group === 6) {
        await createArrayOfQuestionsFromDifficultWords(
          group,
          page,
          false,
          userAuthorized,
          userAuthData
        );
        changeState(true);
        changeGameLoadedStatus(true);
      } else if (!isGameLoaded) {
        await createArrayOfQuestions(
          group,
          page,
          false,
          userAuthorized,
          userAuthData
        );
        changeState(true);
        changeGameLoadedStatus(true);
      }
    })();
  }, []);

  return (
    <>
      <div className="game__wrapper horizontal wrapper-screen">
        <div className="game__levels-image"></div>
        <div className="game__loading"></div>
      </div>
    </>
  );
}
