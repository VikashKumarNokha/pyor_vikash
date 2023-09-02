import React from 'react'

import ReactEcharts from "echarts-for-react"; 


function Chart() {
  
  const option = {
    title: {
      text: 'Stacked Area Chart'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
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