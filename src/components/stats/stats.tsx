import Footer from "../footer/footer";
import Header from "../header/header";
import ShortTermStats from "./short-term-stats/short-term-stats";
import LongStatistic from "./statistic-long/statistic-long";
import "./stats.css";
import Chart from 'chart.js/auto';
import { useEffect, useState } from "react";

const Stats: React.FC = () => {
  const [conva, setConva] = useState(0); 
  useEffect(()=> {
    let canvas = document.getElementById('myChart') as HTMLCanvasElement;
    console.log(canvas)
  //   let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  //   const myChart = new Chart(ctx, {
  //     type: 'bar',
  //     data: {
  //         labels: ['Red', 'Blue', 'Bellow', 'Green', 'Purple', 'Orange'],
  //         datasets: [{
  //             label: '# of Votes',
  //             data: [12, 19, 3, 5, 2, 3],
  //             backgroundColor: [
  //                 'rgba(255, 99, 132, 0.2)',
  //                 'rgba(54, 162, 235, 0.2)',
  //                 'rgba(255, 206, 86, 0.2)',
  //                 'rgba(75, 192, 192, 0.2)',
  //                 'rgba(153, 102, 255, 0.2)',
  //                 'rgba(255, 159, 64, 0.2)'
  //             ],
  //             borderColor: [
  //                 'rgba(255, 99, 132, 1)',
  //                 'rgba(54, 162, 235, 1)',
  //                 'rgba(255, 206, 86, 1)',
  //                 'rgba(75, 192, 192, 1)',
  //                 'rgba(153, 102, 255, 1)',
  //                 'rgba(255, 159, 64, 1)'
  //             ],
  //             borderWidth: 1
  //         }]
  //     },
  //     options: {
  //         scales: {
  //             y: {
  //                 beginAtZero: true
  //             }
  //         }
  //     }
  // });
  }, [conva])
  
  return (
    <>
      <Header />
      <main className='stats'>
        <div className='stats__wrapper container'>
          <div className='game__wrapper horizontal'>
            <img
              className='image-stat'
              src='assets/images/girl-stat.png'
              alt=''
            />
            <div className='stat__section'>
              <h2 className='stat__header'>Статистика</h2>
              <ShortTermStats />
              <h3>Долгосрочная статистика</h3>
              <div className='stat__block stat-long'>
                <LongStatistic />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Stats;
