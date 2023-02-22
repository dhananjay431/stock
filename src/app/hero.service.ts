import { Injectable } from '@angular/core';
import { from, interval, of, shareReplay } from 'rxjs';
import { finalize, map, mergeMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
declare var $: any, Highcharts: any, html2canvas: any, _: any;
@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(private http: HttpClient) {}

  from_to_time: any = 10;
  testdb: any = of({});
  /*testdb: any = interval(this.from_to_time * 1000).pipe(
    mergeMap((d) => this.ajax('/api/marketStatus', false).pipe(shareReplay())),
    map((d: any) => {
      return _.chain(d.marketState).find({ market: 'Capital Market' }).value();
    })
  );*/
  oa(a: any) {
    return Array.isArray(a) ? a : [a];
  }

  start() {
    $('body').append("<div class='loader'></div>");
  }
  stop() {
    $('.loader').last().remove();
  }

  ajax(url: any, flag = true) {
    let that = this;
    flag == true && that.start();
    return of([]).pipe(
      mergeMap((d: any) =>
        this.http.post(this.getUrl() + '/nse', {
          url: url,
        })
      ),
      finalize(() => {
        flag == true && that.stop();
      })
    );
  }
  getUrl() {
    //let t: any = Object.fromEntries(new URLSearchParams(location.search));
    //return t.url || '';
    return localStorage.getItem('url');
    //return 'http://localhost:3000';
  }
  ch(data: any, id: any) {
    console.log('hs.ch=>', data, id);
    Highcharts.chart(id, {
      chart: {
        zoomType: 'x',
      },
      title: {
        text: data.name,
        align: 'center',
      },

      xAxis: {
        type: 'datetime',
      },
      yAxis: {
        title: {
          text: '',
        },
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        area: {
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1,
            },
            stops: [
              [0, Highcharts.getOptions().colors[0]],
              [
                1,
                Highcharts.color(Highcharts.getOptions().colors[0])
                  .setOpacity(0)
                  .get('rgba'),
              ],
            ],
          },
          marker: {
            radius: 2,
          },
          lineWidth: 1,
          states: {
            hover: {
              lineWidth: 1,
            },
          },
          threshold: null,
        },
      },

      series: [
        {
          type: 'area',
          name: data.name,
          data: data.grapthData,
        },
      ],
    });
  }
  get_chart(data: any, id: any) {
    return this.ajax(
      `/api/chart-databyindex?index=${data.selected}&indices=true`,
      false
    ).pipe(
      tap((_data: any) => {
        console.log('data=>', _data);

        this.ch(_data, id);
      })
    );
  }
  h_html2canvas(id: any) {
    let that = this;
    that.start();
    html2canvas(document.querySelector(id)).then((canvas: any) => {
      canvas.toBlob((blob: any) => {
        navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
        that.stop();
      });
    });
  }

  put_call_chart(data: any, id: any) {
    Highcharts.chart(id, {
      chart: {
        type: 'spline',
      },
      // '' + data._data.CE.underlyingValue,
      title: {
        text: data._data.CE.underlying,
      },
      subtitle: {
        text: data._data.expiryDate,
      },
      xAxis: {
        type: 'datetime',
        crosshair: {
          snap: true,
        },
        dateTimeLabelFormats: {
          // don't display the year
          month: '%e. %b',
          year: '%b',
        },
        title: {
          text: 'Date',
        },
      },
      // yAxis: {
      //   title: {
      //     text: 'Snow depth (m)',
      //   },
      //   min: 0,
      // },
      tooltip: {
        crosshairs: true,
        animation: true,
        distance: 16,
        enabled: true,
        followTouchMove: true,
        followPointer: true,
        headerFormat: '<b>{point.key}</b><br>',
        pointFormat: ' {point.y:.2f}',
        shared: true,
        split: true,
      },

      plotOptions: {
        series: {
          marker: {
            enabled: false,
            radius: 1,
          },
        },
      },

      colors: ['green', 'red', '#06C', '#036', '#000'],
      series: data.data,
    });
  }
}
