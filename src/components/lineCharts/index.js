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

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];


export default function LineChart({data}) {
  let transactions = {}
  let labels = []
  let datasets = []
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
  let chartData = {
    labels,
    datasets:[]
  }
  for (const [key, value] of Object.entries(transactions)) {
    let obj = {}
    obj.label = key
    obj.data = value.reverse()
    chartData.datasets.push(obj)
  }
  return <Line options={options} data={chartData} />;
}