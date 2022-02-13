import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  lineTension: 0.5,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: false,
      text: 'Monthly No of transactions',
    },
  },
};

export default function LineChart({data}) {
  let chartList = []
  for (const [key, value] of Object.entries(data)) {
    for (const [product, transactions] of Object.entries(value)) {
      let dataset = []
      let labels = []
      transactions.map((item)=>{
        labels.push(item.month)
        dataset.push(item.txns)
      })
      if (dataset.length>1){
        labels = labels.reverse()
        const chartData = {
          labels,
          datasets:[{
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            label:key+' '+product,
            data:dataset.reverse()
          }]
        }
        chartList.push(chartData)
      }
  }
  }
  return (
    <div>
      {chartList && chartList.length>0 && chartList.map((item)=>{
        return(
          <div>
            <Line options={options} data={item}/>
          </div>
        )
      })}
    </div>
    
  )
}