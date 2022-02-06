import {AUDIO_LIVES_AMOUNT} from "../../../const/const-audio";
import "./audio-lives.css";

interface IPropsLives {
  amount: number;
}

export function AudioLives(props: IPropsLives) {
  const { amount } = props;
  const arrLives = [
    ...Array(amount).fill(true),
    ...Array(AUDIO_LIVES_AMOUNT - amount).fill(false),
  ];

  return (
    <div className="game__lives">
      {arrLives.map((item) => {
        return item ? (
          <div className="game__life"></div>
        ) : (
          <div className="game__life-lost"></div>
        );
      })}
    </div>
  );
}