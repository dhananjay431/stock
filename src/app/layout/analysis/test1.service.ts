import { Injectable } from '@angular/core';
import { HeroService } from '../../hero.service';
import { tap } from 'rxjs';
declare var Chart: any;
@Injectable({
  providedIn: 'root',
})
export class Test1Service {
  constructor(private hs: HeroService) {}
  db_chart(label: any, data: any, data2: any) {
    let dh2 = new Chart(document.getElementById('acquisitions'), {
      type: 'line',
      data: {
        labels: label,
        datasets: [
          {
            label: 'PCR',
            data: data,
            borderColor: 'red',
            backgroundColor: 'red',
            yAxisID: 'y',
          },
          {
            label: 'PRICE',
            data: data2,
            borderColor: 'blue',
            backgroundColor: 'blue',
            yAxisID: 'y1',
          },
        ],
      },
      options: {
        onClick: (e: any) => {
          const canvasPosition = Chart.helpers.getRelativePosition(e, dh2);

          console.log('click', dh2.tooltip.title);
          // Substitute the appropriate scale IDs
          const dataX = dh2.scales.x.getValueForPixel(canvasPosition.x);
          const dataY = dh2.scales.y.getValueForPixel(canvasPosition.y);
          console.log(dataX, dataY);
        },
        fill: false,
        interaction: {
          intersect: false,
        },
        radius: 0,
        responsive: true,
        // interaction: {
        //   mode: 'index',
        //   intersect: false,
        // },
        stacked: false,
        plugins: {
          title: {
            display: false,
            text: 'Chart.js Line Chart - Multi Axis',
          },
        },
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',

            // grid line settings
            grid: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
          },
        },
      },
    });
  }
  /* 
   {
  fill: false,
  interaction: {
    intersect: false
  },
  radius: 0,
}
 */
  db_chart2(data: any) {
    let dh1 = new Chart(document.getElementById('acquisitions2'), {
      type: 'bar',
      data: data,

      options: {
        fill: false,

        radius: 0,
        responsive: true,
        interaction: {
          intersect: false,
          axis: 'x',
        },
        stacked: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: false,
            text: 'Chart.js Floating Bar Chart',
          },
        },
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',

            // grid line settings
            grid: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
          },
          y2: {
            type: 'linear',
            display: false,
            position: 'right',

            // grid line settings
            grid: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
          },
        },
      },
    });
  }
  db_chart3(data: any) {
    new Chart(document.getElementById('acquisitions3'), {
      type: 'bar',
      data: data,

      options: {
        fill: false,

        radius: 0,
        responsive: true,
        interaction: {
          intersect: false,
        },
        stacked: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: false,
            text: 'Chart.js Floating Bar Chart',
          },
        },
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',

            // grid line settings
            grid: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
          },
        },
      },
    });
  }

  db_chart2_data(resp: any, type: any) {
    return {
      labels: resp[0].filtered.data.map((d: any) => d?.CE?.strikePrice || 0),
      datasets: [
        {
          label: 'ratio',
          data: resp[0].filtered.data.map(
            (d: any) => (d?.PE?.[type] || 0) / (d?.CE?.[type] || 0)
          ),
          backgroundColor: 'black',
          borderColor: 'black',
          type: 'line',
          yAxisID: 'y2',
        },
        {
          label: 'CE',
          data: resp[0].filtered.data.map((d: any) => d?.CE?.change || 0),
          backgroundColor: 'green',
          borderColor: 'green',
          type: 'line',
          yAxisID: 'y1',
        },
        {
          label: 'PE',
          data: resp[0].filtered.data.map((d: any) => d?.PE?.change || 0),
          backgroundColor: 'red',
          borderColor: 'red',
          type: 'line',
          yAxisID: 'y1',
        },
        {
          label: 'CE ' + type,
          data: resp[0].filtered.data.map((d: any) => d?.CE?.[type] || 0),
          backgroundColor: 'green',
          yAxisID: 'y',
        },
        {
          label: 'PE ' + type,
          data: resp[0].filtered.data.map((d: any) => d?.PE?.[type] || 0),
          backgroundColor: 'red',
          yAxisID: 'y',
        },
      ],
    };
  }
  db_chart2_qr(dt: any) {
    return this.hs
      .post('/option', {
        find: {
          type: dt.type,
          date: {
            $gt: dt.date,
          },
        },
        limit: dt.limit,
        skip: dt.skip,
        select: {
          date: true,
          // 'filtered.CE': true,
          // 'filtered.PE': true,
          'filtered.data.CE.underlyingValue': true,
          'filtered.data.CE.changeinOpenInterest': true,
          'filtered.data.PE.changeinOpenInterest': true,
          'filtered.data.PE.openInterest': true,
          'filtered.data.CE.openInterest': true,
          'filtered.data.CE.strikePrice': true,
          'filtered.data.PE.strikePrice': true,
          'filtered.data.CE.change': true,
          'filtered.data.PE.change': true,
        },
      })
      .pipe(
        tap((resp: any) => {
          setTimeout(() => {
            this.db_chart2(this.db_chart2_data(resp, 'changeinOpenInterest'));
            this.db_chart3(this.db_chart2_data(resp, 'openInterest'));
          }, 300);
        })
      );
  }
}
