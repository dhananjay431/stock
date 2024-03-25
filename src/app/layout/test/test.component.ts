import { Component, OnInit } from '@angular/core';
import { HeroService } from 'src/app/hero.service';
import { stat_data, drop } from '../analysis/data';
import { of, tap } from 'rxjs';
declare var _: any, Chart: any;
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  res: any = of([]);
  all_drop: any = drop;
  map2_qr: any = {
    type: 'NIFTY',
    date: new Date().toISOString().substring(0, 10),
    limit: 1,
    skip: 0,
    strikePrice: '',
  };
  constructor(private hs: HeroService) {}

  ch(map2_qr: any) {
    let next: any = new Date(map2_qr.date);

    let d = new Date(map2_qr.date);
    d.setHours(9);
    d.setMinutes(0);
    return this.hs
      .post('/option?id=141', {
        find: {
          type: map2_qr.type,

          date: {
            $gt: new Date(d).toISOString(),
            $lt: new Date(next.setDate(next.getDate() + 1)).toISOString(),
          },
        },
        select: {
          date: true,

          'filtered.data.strikePrice': true,
          'filtered.data.CE.strikePrice': true,

          'filtered.data.CE.underlyingValue': true,
          'filtered.data.CE.changeinOpenInterest': true,
          'filtered.data.PE.changeinOpenInterest': true,
        },
      })
      .pipe(
        tap((d: any) => {
          console.log('d=>', d);
          let dtx = _.chain(d)
            .map((dx: any) => {
              dx.filtered.data = _.chain(dx.filtered.data)
                .map((dx2: any) => {
                  if (dx2.CE != undefined) {
                    dx2.near = Math.abs(
                      dx2.CE.underlyingValue - dx2.CE.strikePrice
                    );
                  }

                  return dx2;
                })
                .sortBy('near')
                .value();
              dx.ttl6 = _.chain(dx.filtered.data)
                .take(7)
                .reduce(
                  (a: any, b: any) => {
                    if (b.CE != undefined) {
                      a.CE += b.CE.changeinOpenInterest;
                    }
                    if (b.PE != undefined) {
                      a.PE += b.PE.changeinOpenInterest;
                    }
                    return a;
                  },
                  { CE: 0, PE: 0 }
                )
                .value();
              dx.ttl10 = _.chain(dx.filtered.data)
                .take(11)
                .reduce(
                  (a: any, b: any) => {
                    if (b.CE != undefined) {
                      a.CE += b.CE.changeinOpenInterest;
                    }
                    if (b.PE != undefined) {
                      a.PE += b.PE.changeinOpenInterest;
                    }
                    return a;
                  },
                  { CE: 0, PE: 0 }
                )
                .value();
              return dx;
            })
            .reduce(
              (a: any, b: any) => {
                if (b.filtered.data.length > 0) {
                  a.date.push(b.date);
                  a.underlyingValue.push(b.filtered.data[0].CE.underlyingValue);
                  a.pcr6.push(b.ttl6.PE / b.ttl6.CE);
                  a.pcr10.push(b.ttl10.PE / b.ttl10.CE);
                }

                return a;
              },
              { date: [], pcr6: [], pcr10: [], underlyingValue: [] }
            )
            .value();

          setTimeout(() => {
            this.chart(dtx, 'chart');
          }, 300);

          return dtx;
        })
      );
  }

  formatTime(localIsoDate: any) {
    localIsoDate = new Date(localIsoDate);
    function z(n: any) {
      return (n < 10 ? '0' : '') + n;
    }
    var hh = localIsoDate.getHours();
    var mm = localIsoDate.getMinutes();
    var ss = localIsoDate.getSeconds();
    return z(hh) + ':' + z(mm) + ':' + z(ss);
  }
  ngOnInit(): void {}
  chart(data: any, id: any) {
    let that = this;
    let dh2 = new Chart(document.getElementById(id), {
      type: 'line',
      data: {
        labels: data.date.map((d: any) => this.formatTime(new Date(d))),
        datasets: [
          {
            label: 'PCR6',
            fill: false,
            data: data.pcr6,
            borderColor: 'red',
            backgroundColor: 'red',
            yAxisID: 'y',
          },
          {
            label: 'PCR10',
            fill: false,
            data: data.pcr10,
            borderColor: 'blue',
            backgroundColor: 'blue',
            yAxisID: 'y',
          },
          {
            label: 'PRICE',
            fill: false,
            data: data.underlyingValue,
            borderColor: 'black',
            backgroundColor: 'black',
            yAxisID: 'y1',
          },
        ],
      },
      options: {
        onClick: (e1: any, e2: any, e3: any) => {
          //  that.sub['setObj'].next({ title: dh2.tooltip.title[0], type: 'one' });
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

  typeChange(map2_qr: any) {
    // this.res = this.ch(map2_qr);
  }
  date_change(map2_qr: any) {
    //this.res = this.ch(map2_qr);
  }
  search(map2_qr: any) {
    this.res = this.ch(map2_qr);
  }
}
