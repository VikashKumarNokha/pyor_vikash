import { Datefun } from '../component/Datefun';

export function Option(key, data){

    const option = {
        title: {
          text: `Line-chart of ${key} prices`
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
          data: data?.map((e)=> Datefun( e[0]))
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: data?.map((e)=> e[1]),
            type: 'line',
            areaStyle: {}
          }    
        ]
      };

      return option;
}