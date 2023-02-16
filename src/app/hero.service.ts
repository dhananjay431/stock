import { Injectable } from '@angular/core';
import { from, of } from 'rxjs';
import { finalize, mergeMap, tap } from 'rxjs/operators';
declare var $: any, Highcharts: any, html2canvas: any;
@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor() {}
  oa(a: any) {
    return Array.isArray(a) ? a : [a];
  }

  start() {
    $('body').append("<div class='loader'></div>");
  }
  stop() {
    $('.loader').last().remove();
  }

  ajax(url: any) {
    let that = this;
    that.start();
    return of([]).pipe(
      mergeMap((d: any) => from(fetch(url).then((resp) => resp.json()))),
      finalize(() => {
        console.log('end');
        that.stop();
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
    Highcharts.chart(id, {
      chart: {
        zoomType: 'x',
      },
      title: {
        text: data.name + ' ' + data.closePrice,
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
}
