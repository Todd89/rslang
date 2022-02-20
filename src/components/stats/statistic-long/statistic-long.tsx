import "./statistic-long.css";
import Chart from "chart.js/auto";
import { useEffect, useState } from "react";
import httpClient from "../../../services/http-client";
import { getUserAuthData } from "../../../store/data/selectors";
import { useSelector } from "react-redux";
import { IStatistic, IUserData } from '../../../interface/interface'

const LongStatistic: React.FC = () => {
  const [user, setUser] = useState<IUserData>();
  const USER_DATA = useSelector(getUserAuthData);

  if (!user) {
    if (USER_DATA) {
      const NEW_USER = {
        userId: USER_DATA.userId,
        token: USER_DATA.token,
      };
      setUser(NEW_USER);
    }
  }

 
  useEffect(() => {
    
    const getStatistic = async () => {;
      const STATISTIC:IStatistic = await httpClient.getUserStatistic(user as IUserData);
      let { stat } = STATISTIC.optional.longTerm;
      let labels:string[] = stat.map((el) => el.data);
      let newWords:number[] = stat.map((el) => el.newWordsInData);
      let learnedWords:number[] = stat.map((el) => el.newLearnedInData);


      let canvas = document.getElementById("myChart") as HTMLCanvasElement;
      let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

      const myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "New Words",
              data: newWords,
              backgroundColor: "rgba(54, 162, 235)",
            },
            {
            label: "Learned Words",
            data: learnedWords,
            backgroundColor: "rgba(255, 99, 132)",
          },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    return () => {
      myChart.destroy()
    }

    }
    getStatistic()

  }, []);

  return (
    <div>
      <canvas id='myChart' width='400' height='200'></canvas>
    </div>
  );
};

export default LongStatistic;
