import Header from "../header/header";
import MainBlock from './main-block/main-block';
import httpClient from "../../services/http-client";
import { Statistic, Settings, User, UserData, UserWord } from '../../interface/interface'

import "./sprint-page.css";


const SprintPage: React.FC = () => {
  return (
    <>
      <Header />
      <MainBlock />
    </>
  );
};

export default SprintPage;
