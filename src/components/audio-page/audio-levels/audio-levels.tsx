import { useState } from "react";
import { AUDIO_RULES } from "../../../const/const-audio";
import { AudioLevel } from "../audio-level/audio-level";
import "./audio-levels.css";
interface IProps {
  isGameLoaded: boolean;
  changeState: (isGame: boolean) => void;
  changeGameLoadedStatus: (isLoad: boolean) => void;
}

export function AudioLevels(props: IProps) {
  const { isGameLoaded, changeState, changeGameLoadedStatus } = props;

  const [isGameChosen, SetIsGameChosen] = useState(false);

  const arrLevels = [1, 2, 3, 4, 5, 6];

  const changeIsGameChosen = function (isCh: boolean) {
    SetIsGameChosen(isCh);
  };

  return (
    <>
      {!isGameChosen ? (
        <>
          <div className="game__section game__wrapper horizontal">
            <div className="game__levels-image"></div>
            <div className="game__rules-section game__wrapper vertical">
              <h3>Правила игры</h3>
              <p className="game_rules-text">{AUDIO_RULES}</p>
              <div className="game__leves">
                {arrLevels.map((item) => {
                  return (
                    <AudioLevel
                      id={item}
                      key={item}
                      changeState={changeState}
                      isGameLoaded={isGameLoaded}
                      changeGameLoadedStatus={changeGameLoadedStatus}
                      changeIsGameChosen={changeIsGameChosen}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="game__wrapper horizontal wrapper-screen">
            <div className="game__levels-image"></div>
            <div className="game__loading"></div>
          </div>
        </>
      )}
    </>
  );
}
