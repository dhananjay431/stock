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
    new Chart(document.getElementById('acquisitions'), {
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
    new Chart(document.getElementById('acquisitions2'), {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: false,
            text: 'Chart.js Floating Bar Chart',
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
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Floating Bar Chart',
          },
        },
      },
    });
  }

  db_chart2_data(resp: any, type: any) {
    return {
      labels: resp[0].filtered.data.map((d: any) => d?.CE?.strikePrice || 0),
      datasets: [
        // {
        //   label: 'CE',
        //   data: resp[0].filtered.data.map(
        //     (d: any) => d?.CE?.changeinOpenInterest || 0
        //   ),
        //   backgroundColor: 'blue',
        // },
        // {
        //   label: 'PE',
        //   data: resp[0].filtered.data.map(
        //     (d: any) => d?.PE?.changeinOpenInterest || 0
        //   ),
        //   backgroundColor: 'black',
        // },
        {
          label: 'CE ' + type,
          data: resp[0].filtered.data.map((d: any) => d?.CE?.[type] || 0),
          backgroundColor: 'green',
        },
        {
          label: 'PE ' + type,
          data: resp[0].filtered.data.map((d: any) => d?.PE?.[type] || 0),
          backgroundColor: 'red',
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
