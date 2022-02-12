import "./sprint-congratulation-block.css";
import CongratulationItemBlock from "./congratulation-item-block/congratulation-item-block";
import { IRandomWordInGame } from '../../../interface/interface'

const CongratulationBlock: React.FC<any> = ({ answersArray }) => {
  let id = 100;
  const ELEMEMENTS = answersArray.map((el: IRandomWordInGame) => {
    const { ...items } = el;
    return (
      <li key={id++} className=''>
        <CongratulationItemBlock {...items} />
      </li>
    );
  });

  return <ul>{ELEMEMENTS}</ul>;
};

export default CongratulationBlock;
