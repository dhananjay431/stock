import { Component, OnInit } from '@angular/core';
import { HeroService } from './../../hero.service';
import { Subject, from, map, mergeMap, of } from 'rxjs';

declare var Highcharts: any, _: any;
@Component({
  selector: 'app-analysistwo',
  templateUrl: './analysistwo.component.html',
  styleUrls: ['./analysistwo.component.scss'],
})
export class AnalysistwoComponent implements OnInit {
  constructor(private hs: HeroService) {}
  time: any = [
    { key: '09:00', value: { h: '09', m: '00' } },
    { key: '09:05', value: { h: '09', m: '05' } },
    { key: '09:10', value: { h: '09', m: '10' } },
    { key: '09:15', value: { h: '09', m: '15' } },
    { key: '09:20', value: { h: '09', m: '20' } },
    { key: '09:25', value: { h: '09', m: '25' } },
    { key: '09:30', value: { h: '09', m: '30' } },
    { key: '09:35', value: { h: '09', m: '35' } },
    { key: '09:40', value: { h: '09', m: '40' } },
    { key: '09:45', value: { h: '09', m: '45' } },
    { key: '09:50', value: { h: '09', m: '50' } },
    { key: '09:55', value: { h: '09', m: '55' } },
    { key: '10:00', value: { h: '10', m: '00' } },
    { key: '10:05', value: { h: '10', m: '05' } },
    { key: '10:10', value: { h: '10', m: '10' } },
    { key: '10:15', value: { h: '10', m: '15' } },
    { key: '10:20', value: { h: '10', m: '20' } },
    { key: '10:25', value: { h: '10', m: '25' } },
    { key: '10:30', value: { h: '10', m: '30' } },
    { key: '10:35', value: { h: '10', m: '35' } },
    { key: '10:40', value: { h: '10', m: '40' } },
    { key: '10:45', value: { h: '10', m: '45' } },
    { key: '10:50', value: { h: '10', m: '50' } },
    { key: '10:55', value: { h: '10', m: '55' } },
    { key: '11:00', value: { h: '11', m: '00' } },
    { key: '11:05', value: { h: '11', m: '05' } },
    { key: '11:10', value: { h: '11', m: '10' } },
    { key: '11:15', value: { h: '11', m: '15' } },
    { key: '11:20', value: { h: '11', m: '20' } },
    { key: '11:25', value: { h: '11', m: '25' } },
    { key: '11:30', value: { h: '11', m: '30' } },
    { key: '11:35', value: { h: '11', m: '35' } },
    { key: '11:40', value: { h: '11', m: '40' } },
    { key: '11:45', value: { h: '11', m: '45' } },
    { key: '11:50', value: { h: '11', m: '50' } },
    { key: '11:55', value: { h: '11', m: '55' } },
    { key: '12:00', value: { h: '12', m: '00' } },
    { key: '12:05', value: { h: '12', m: '05' } },
    { key: '12:10', value: { h: '12', m: '10' } },
    { key: '12:15', value: { h: '12', m: '15' } },
    { key: '12:20', value: { h: '12', m: '20' } },
    { key: '12:25', value: { h: '12', m: '25' } },
    { key: '12:30', value: { h: '12', m: '30' } },
    { key: '12:35', value: { h: '12', m: '35' } },
    { key: '12:40', value: { h: '12', m: '40' } },
    { key: '12:45', value: { h: '12', m: '45' } },
    { key: '12:50', value: { h: '12', m: '50' } },
    { key: '12:55', value: { h: '12', m: '55' } },
    { key: '13:00', value: { h: '13', m: '00' } },
    { key: '13:05', value: { h: '13', m: '05' } },
    { key: '13:10', value: { h: '13', m: '10' } },
    { key: '13:15', value: { h: '13', m: '15' } },
    { key: '13:20', value: { h: '13', m: '20' } },
    { key: '13:25', value: { h: '13', m: '25' } },
    { key: '13:30', value: { h: '13', m: '30' } },
    { key: '13:35', value: { h: '13', m: '35' } },
    { key: '13:40', value: { h: '13', m: '40' } },
    { key: '13:45', value: { h: '13', m: '45' } },
    { key: '13:50', value: { h: '13', m: '50' } },
    { key: '13:55', value: { h: '13', m: '55' } },
    { key: '14:00', value: { h: '14', m: '00' } },
    { key: '14:05', value: { h: '14', m: '05' } },
    { key: '14:10', value: { h: '14', m: '10' } },
    { key: '14:15', value: { h: '14', m: '15' } },
    { key: '14:20', value: { h: '14', m: '20' } },
    { key: '14:25', value: { h: '14', m: '25' } },
    { key: '14:30', value: { h: '14', m: '30' } },
    { key: '14:35', value: { h: '14', m: '35' } },
    { key: '14:40', value: { h: '14', m: '40' } },
    { key: '14:45', value: { h: '14', m: '45' } },
    { key: '14:50', value: { h: '14', m: '50' } },
    { key: '14:55', value: { h: '14', m: '55' } },
    { key: '15:00', value: { h: '15', m: '00' } },
    { key: '15:05', value: { h: '15', m: '05' } },
    { key: '15:10', value: { h: '15', m: '10' } },
    { key: '15:15', value: { h: '15', m: '15' } },
    { key: '15:20', value: { h: '15', m: '20' } },
    { key: '15:25', value: { h: '15', m: '25' } },
    { key: '15:30', value: { h: '15', m: '30' } },
  ];
  map2_qr: any = {
    type: 'NIFTY',
    date1: new Date().toISOString().substring(0, 10),
  };
  _search(dt: any) {
    console.log(dt);
  }
  date1sub = new Subject();
  date1sub_ob: any = of([]);

  date2sub = new Subject();
  date2sub_ob: any = of([]);
  _date1Change(map2_qr: any) {
    this.date1sub_ob.next(map2_qr);
  }

  q(t: any) {
    return new Promise((a, b) => {
      setTimeout(() => {
        a(new Date().getTime());
      }, t);
    });
  }
  _date2Change(map2_qr: any) {
    this.date2sub_ob = from(this.q(1));
    // this.date2sub.next(map2_qr);
  }

  _typeChange(map2_qr: any) {
    map2_qr.date1 = new Date().toISOString().substring(0, 10);
    map2_qr.date2 = '';
  }
  /* chart(new_Data: any) {
    Highcharts.chart('container', {
      chart: {
        zoomType: 'xy',
      },
      title: {
        text: 'Karasjok weather, 2021',
        align: 'left',
      },
      subtitle: {
        text:
          'Source: ' +
          '<a href="https://www.yr.no/nb/historikk/graf/5-97251/Norge/Troms%20og%20Finnmark/Karasjok/Karasjok?q=2021"' +
          'target="_blank">YR</a>',
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
            text: 'Temperature',
            style: {
              color: Highcharts.getOptions().colors[1],
            },
          },
        },
        {
          // Secondary yAxis
          title: {
            text: 'Precipitation',
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
  } */
  ob = (_: any) => _;
  ngOnInit(): void {
    this.date1sub_ob = this.date1sub.pipe(
      mergeMap((d1: any) => {
        return this.hs.post('/option', {
          find: {
            type: d1.type,
            date: {
              $gt: d1.date1,
            },
          },
          limit: 1,
          select: {
            'records.expiryDates': true,
          },
        });
      })
    );
    /* this.date2sub_ob = this.date2sub.pipe(
      mergeMap((qr: any) => {
        return this.hs.post('/option', {
          aggregate: [
            {
              $match: {
                type: qr.type,
                date: {
                  $gt: { _eval: 'dt', value: new Date(qr.date1).toISOString() },
                },
              },
            },
            { $limit: 1 },
            { $unwind: '$records.data' },
            {
              $match: {
                'records.data.expiryDate': qr.date2,
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
        });
      }),
      map((dt: any) => {
        let new_Data: any = {
          ce_openInterest: _.chain(dt[0].data)
            .map('data.CE.openInterest')
            .map((d: any) => (d == 0 ? null : d))
            .value(),
          pe_openInterest: _.chain(dt[0].data)
            .map('data.PE.openInterest')
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
        try {
          this.chart(new_Data);
        } catch (err) {
          console.log(err);
        }
        console.log('new_Data=>', new_Data);
      })
    ); */
  }
}
