import { Injectable } from '@angular/core';
import { HeroService } from '../../hero.service';
import { Subject, tap } from 'rxjs';
declare var Chart: any;
@Injectable({
  providedIn: 'root',
})
export class Test1Service {
  sub: any = {};
  new_sub(key: any) {
    this.sub[key] = new Subject();
    return this.sub[key];
  }
  constructor(private hs: HeroService) {}
  db_chart(label: any, data: any, data2: any, id: any) {
    let that = this;
    let dh2 = new Chart(document.getElementById(id), {
      type: 'line',
      data: {
        labels: label,
        datasets: [
          {
            label: 'PCR',
            fill: false,
            data: data,
            borderColor: 'red',
            backgroundColor: 'red',
            yAxisID: 'y',
          },
          {
            label: 'PRICE',
            fill: false,
            data: data2,
            borderColor: 'blue',
            backgroundColor: 'blue',
            yAxisID: 'y1',
          },
        ],
      },
      options: {
        onClick: (e1: any, e2: any, e3: any) => {
          that.sub['setObj'].next({ title: dh2.tooltip.title[0], type: 'one' });
          // that.chart2.destroy();
          // that.chart3.destroy();
        },
        fill: false,
        interaction: {
          intersect: false,
          mode: 'index',
        },
        radius: 0,
        responsive: true,
        // interaction: {
        //   mode: 'index',
        //   intersect: false,
        // },
        stacked: false,
        plugins: {
          tooltip: {
            callbacks: {
              footer: (tooltipItems: any) => {
                // let sum = 0;
                // debugger;
                // tooltipItems.forEach(function (tooltipItem: any) {
                //   sum += tooltipItem.parsed.y;
                // });
                // return 'Sum: ' + sum;
              },
            },
          },
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
  chart2: any;
  chart3: any;
  db_chart2(data: any, id: any) {
    let that = this;
    this.chart2 = new Chart(document.getElementById(id), {
      type: 'bar',
      data: data,

      options: {
        onClick: (e1: any, e2: any, e3: any) => {
          that.sub['setObj'].next({
            title: e3.tooltip.title,
            type: 'two',
          });
        },
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
    this.chart3 = new Chart(document.getElementById('acquisitions3'), {
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

  db_chart2_strike(resp: any) {
    return {
      labels: resp[4],
      datasets: [
        {
          label: 'CE LTP',
          fill: false,
          data: resp[0],
          backgroundColor: 'green',
          borderColor: 'green',
          type: 'line',
          yAxisID: 'y1',
        },
        {
          label: 'PE LTP',
          fill: false,
          data: resp[1],
          backgroundColor: 'red',
          borderColor: 'red',
          type: 'line',
          yAxisID: 'y1',
        },

        {
          label: 'CE COI',
          fill: false,
          data: resp[2],
          backgroundColor: 'green',
          yAxisID: 'y',
        },
        {
          label: 'PE COI',
          fill: false,
          data: resp[3],
          backgroundColor: 'red',
          yAxisID: 'y',
        },
      ],
    };
  }
  db_chart2_data(resp: any, type: any) {
    return {
      labels: resp[0].filtered.data.map((d: any) => d?.CE?.strikePrice || 0),
      datasets: [
        {
          label: 'ratio',
          fill: false,
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
          fill: false,
          data: resp[0].filtered.data.map((d: any) => d?.CE?.change || 0),
          backgroundColor: 'green',
          borderColor: 'green',
          type: 'line',
          yAxisID: 'y1',
        },
        {
          label: 'PE',
          fill: false,
          data: resp[0].filtered.data.map((d: any) => d?.PE?.change || 0),
          backgroundColor: 'red',
          borderColor: 'red',
          type: 'line',
          yAxisID: 'y1',
        },
        {
          label: 'CE ' + type,
          fill: false,
          data: resp[0].filtered.data.map((d: any) => d?.CE?.[type] || 0),
          backgroundColor: 'green',
          yAxisID: 'y',
        },
        {
          label: 'PE ' + type,
          fill: false,
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
            this.db_chart2(
              this.db_chart2_data(resp, 'changeinOpenInterest'),
              'acquisitions2'
            );
            this.db_chart2(
              this.db_chart2_data(resp, 'openInterest'),
              'acquisitions3'
            );
          }, 300);
        })
      );
  }
}
