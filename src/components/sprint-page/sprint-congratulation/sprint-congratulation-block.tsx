import "./sprint-congratulation-block.css";
import CongratulationItemBlock from './congratulation-item-block/congratulation-item-block'
import { randomNum } from "../sprint-methods/sprint-methods";
import { IGameBlockProps, IWordInAnswerArray } from "../../../interface/interface";
import { useState } from 'react';

const CongratulationBlock: React.FC<any> = ({ answersArray }) => {
  console.log(answersArray)
   const ELEMEMENTS = answersArray.map((el:any) => {
    const {id, ...items} = el
    return (
    <li key = {id} className="">
      < CongratulationItemBlock
      {...items} />
    </li>)
   })
  
  return (
    <ul>
     { ELEMEMENTS }
    </ul>
  );
};

export default CongratulationBlock;