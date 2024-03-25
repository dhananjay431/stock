import { Component, OnInit, Input } from '@angular/core';
import { Subject, map, mergeMap, of } from 'rxjs';
import { HeroService } from './../../../hero.service';
declare var Highcharts: any, _: any;
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  @Input() qr: any;
  constructor(private hs: HeroService) {}

  date2sub_ob: any = of([]);
  chart(new_Data: any, id: any) {
    Highcharts.chart(id, {
      chart: {
        zoomType: 'xy',
      },
      title: {
        text: `${this.qr.type}`,
        align: 'left',
      },
      subtitle: {
        text: '',
        align: 'left',
      },
      xAxis: [
        {
          categories: new_Data.strikePrice,
          crosshair: true,
        },
      ],
      yAxis: [
        {
          // Primary yAxis
          labels: {
            format: '{value}',
            style: {
              color: Highcharts.getOptions().colors[1],
            },
          },
          title: {
            text: '',
            style: {
              color: Highcharts.getOptions().colors[1],
            },
          },
        },
        {
          // Secondary yAxis
          title: {
            text: '',
            style: {
              color: Highcharts.getOptions().colors[0],
            },
          },
          labels: {
            format: '{value}',
            style: {
              color: Highcharts.getOptions().colors[0],
            },
          },
          opposite: true,
        },
      ],
      tooltip: {
        shared: true,
      },
      legend: {
        align: 'left',
        x: 80,
        verticalAlign: 'top',
        y: 60,
        floating: true,
        backgroundColor:
          Highcharts.defaultOptions.legend.backgroundColor || // theme
          'rgba(255,255,255,0.25)',
      },
      series: [
        {
          name: 'ce_openInterest',
          type: 'column',
          yAxis: 1,
          data: new_Data.ce_openInterest,
          tooltip: {
            //valueSuffix: ' mm',
          },
          color: 'green',
        },
        {
          name: 'pe_openInterest',
          type: 'column',
          yAxis: 1,
          data: new_Data.pe_openInterest,
          color: 'red',
          tooltip: {
            //valueSuffix: ' mm',
          },
        },
        {
          name: 'ce_lastPrice',
          type: 'spline',
          data: new_Data.ce_lastPrice,
          color: 'green',
          tooltip: {
            // valueSuffix: '°C',
          },
        },
        {
          name: 'pe_lastPrice',
          type: 'spline',
          data: new_Data.pe_lastPrice,
          color: 'red',
          tooltip: {
            //valueSuffix: '°C',
          },
        },
      ],
    });
  }
  _date2Change(map2_qr: any) {
    // this.date2sub.next(map2_qr);
  }
  str: any = '';
  ngOnInit(): void {
    debugger;
    let dt: any = new Date(this.qr.date1);
    if (this.qr.time != undefined) {
      // let a = new Date(this.qr.date1);
      dt.setHours(this.qr.time.h);
      dt.setMinutes(this.qr.time.m);
      dt = new Date(dt).getTime() - 10000;
    }

    console.log('ngOnInitngOnInit=>', this.qr);
    this.str = this.qr.type + this.qr.date1;
    this.date2sub_ob = this.hs
      .post('/option', {
        aggregate: [
          {
            $match: {
              type: this.qr.type,
              date: {
                $gt: {
                  _eval: 'dt',
                  value: new Date(dt).toISOString(),
                },
              },
            },
          },
          { $limit: 1 },
          { $unwind: '$records.data' },
          {
            $match: {
              'records.data.expiryDate': this.qr.date2,
            },
          },
          {
            $project: {
              type: 1,
              date: 1,
              'records.data': 1,
              'records.timestamp': 1,
              'records.underlyingValue': 1,
            },
          },
          { $group: { _id: '$date', data: { $push: '$records' } } },
        ],
      })
      .pipe(
        map((dt: any) => {
          console.log(dt);
          let new_Data: any = {
            ce_openInterest: _.chain(dt[0].data)
              .map('data.CE.changeinOpenInterest')
              .map((d: any) => (d == 0 ? null : d))
              .value(),
            pe_openInterest: _.chain(dt[0].data)
              .map('data.PE.changeinOpenInterest')
              .value(),
            ce_lastPrice: _.chain(dt[0].data)
              .map('data.CE.lastPrice')
              .map((d: any) => (d == 0 ? null : d))
              .value(),
            pe_lastPrice: _.chain(dt[0].data)
              .map('data.PE.lastPrice')
              .map((d: any) => (d == 0 ? null : d))
              .value(),
            strikePrice: _.chain(dt[0].data)
              .map('data.strikePrice')
              .map((d: any) => (d == 0 ? null : d))
              .value(),
          };

          let new_Data2: any = {
            ce_openInterest: [],
            pe_openInterest: [],
            ce_lastPrice: [],
            pe_lastPrice: [],
            strikePrice: [],
          };
          for (let i = 0; i < dt[0].data.length; i++) {
            dt[0].data[i].data.CE =
              dt[0].data[i].data.CE == undefined ? {} : dt[0].data[i].data.CE;
            dt[0].data[i].data.PE =
              dt[0].data[i].data.PE == undefined ? {} : dt[0].data[i].data.PE;

            new_Data2.ce_openInterest.push(
              (dt[0].data[i].data.CE.changeinOpenInterest || 0) == 0
                ? null
                : dt[0].data[i].data.CE.changeinOpenInterest
            );
            new_Data2.pe_openInterest.push(
              (dt[0].data[i].data.PE.changeinOpenInterest || 0) == 0
                ? null
                : dt[0].data[i].data.PE.changeinOpenInterest
            );
            new_Data2.ce_lastPrice.push(
              (dt[0].data[i].data.CE.lastPrice || 0) == 0
                ? null
                : dt[0].data[i].data.CE.lastPrice
            );

            new_Data2.pe_lastPrice.push(
              (dt[0].data[i].data.PE.lastPrice || 0) == 0
                ? null
                : dt[0].data[i].data.PE.lastPrice
            );

            new_Data2.strikePrice.push(dt[0].data[i].data.strikePrice);
          }
          console.log('new_Data2=>', new_Data2);

          try {
            console.log('new_Data=>', new_Data2);
            this.chart(new_Data2, this.str);
          } catch (err) {
            console.log(err);
          }
        })
      );
  }
}
