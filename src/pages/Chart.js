import React, { useEffect, useState } from 'react'

import ReactEcharts from "echarts-for-react"; 
import axios from 'axios';
import { Datefun } from '../component/Datefun';


function Chart() {
    const [data, setData] = useState([]);

    const getdatafun = ()=>{
         return axios.get("https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=365&interval=daily").then((res)=>{
            //console.log("ress", res.data.prices);
             setData(res.data.prices);
         }).catch((err)=>{
           console.log('err', err);
         })
    }
    
     useEffect(()=>{
       if(data.length == 0){
        getdatafun();
       }
     },[]);

     console.log("dda", data.map((e)=> Datefun( e[0])))
  
  const option = {
    title: {
      text: 'Stacked Area Chart'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data.map((e)=> Datefun( e[0]))
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: data.map((e)=> e[1]),
        type: 'line',
        areaStyle: {}
      }    
    ]
  };
  

  return (
    <div>
      <h1>Chart</h1>
      <ReactEcharts option={option} />
      

    </div>
  )
}

export default Chart