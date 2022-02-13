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

const colors = [
  {
    borderColor: 'rgb(255, 99, 132)',
    backgroundColor: 'rgba(255, 99, 132, 0.5)',
  },
  {
    borderColor: 'rgb(53, 162, 235)',
    backgroundColor: 'rgba(53, 162, 235, 0.5)',
  },
  {
    borderColor: 'rgb(53, 164, 235)',
    backgroundColor: 'rgba(53, 162, 235, 0.5)',
  },
  {
    borderColor: 'rgb(53, 164, 235)',
    backgroundColor: 'rgba(53, 162, 235, 0.5)',
  },
  {
    borderColor: 'rgb(53, 164, 225)',
    backgroundColor: 'rgba(53, 162, 235, 0.5)',
  },
  {
    borderColor: 'rgb(53, 164, 215)',
    backgroundColor: 'rgba(53, 162, 235, 0.5)',
  }
]

export default function LineChart({data}) {
  let transactions = {}
  let labels = []
  data.map((item)=>{
    labels.push(item.month)
    const product = item.product
    if (transactions[product] != null){
      transactions[product].push(item.txns)
    } 
    else{
      transactions[product] = [item.txns]
    }
  })
  labels = labels.reverse()
  let chartData = {
    labels,
    datasets:[]
  }
  let i = 0
  for (const [key, value] of Object.entries(transactions)) {
    i+=1
    let obj = colors[i]
    obj.label = key
    obj.data = value.reverse()
    chartData.datasets.push(obj)
  }
  console.log("charData",chartData)
  
  return <Line options={options} data={chartData} />;
}