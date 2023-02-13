import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../hero.service';
import { catchError, forkJoin, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
declare var Highcharts: any, $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private hs: HeroService) {}

  // /api/equity/intraday/NIFTY%2050?indices=true

  ///api/allIndices
  data: any = {
    dt$: of([]),
    allIndices$: of([]),
    selected: 'NIFTY 50',
  };
  ob = (a: any) => a;
  h_selected_change(data: any) {
    this.data.dt$ = this.get_selected_change(data);
  }
  get_selected_change(data2: any) {
    return this.hs
      .ajax(
        this.hs.getUrl() + '/api/equity/intraday/' + data2 + '?indices=true'
      )
      .pipe(
        tap((data: any) => {
          debugger;
          console.log('data=>', data, data2);
          this.ch(data, data2);
        }),
        catchError((err: any) => {
          return of({
            closePrice: 0,
            grapthData: [],
            identifier: '',
            name: '',
          });
        })
      );
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
  ngOnInit(): void {
    let that = this;
    this.data.allIndices$ = this.hs
      .ajax(this.hs.getUrl() + '/api/allIndices')
      .pipe(
        tap((d) => {
          debugger;
          let all_chart = d.data.map((dx: any) => {
            return that.get_selected_change(dx.index);
          });

          forkJoin(all_chart).subscribe();
        })
      );
    // this.data.dt$ = this.get_selected_change(this.data);
  }
}
