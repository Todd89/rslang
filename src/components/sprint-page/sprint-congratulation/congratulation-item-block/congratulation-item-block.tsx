import "./congratulation-item-block.css";
import { IGameBlockProps, IWordInAnswerArray } from "../../../../interface/interface";
import { useState } from 'react';

const CongratulationItemBlock: React.FC<any> = ({ audio, word, transcription , wordTranslate, isAnwserTrue }) => {
  
  return (
    <>
    <span className=''>""</span>
    <span className=''>{word}</span> 
    <span className=''>{transcription}</span> 
    <span className=''>{wordTranslate}</span> 
    <span className=''>{`${isAnwserTrue}`}</span> 
    </>
  );
};

export default CongratulationItemBlock;