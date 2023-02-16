import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../hero.service';
import { of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
declare var Highcharts: any, $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private hs: HeroService, private router: Router) {}

  // /api/equity/intraday/NIFTY%2050?indices=true

  ///api/allIndices
  data: any = {
    dt$: of([]),
    allIndices$: of([]),
    selected: 'NIFTY 50',
  };
  ob = (a: any) => a;
  h_selected_change(data: any) {
    this.data.dt$ = this.get_selected_change(data, 'container');
  }
  n(a: any) {
    return Number(a).toFixed(2);
  }
  get_selected_change(data: any, id: any) {
    return this.hs.get_chart(data, id);
  }

  get_allIndices() {
    return this.hs.ajax(this.hs.getUrl() + '/api/allIndices').pipe(
      map((d: any) => {
        d.data = d.data.map((x: any, i: any) => {
          x.id = i;
          return x;
        });
        return d;
      }),
      tap((d: any) => {
        console.log('ddd=>', d);
        setTimeout(() => {
          $('#dashboard_component_tbl1').DataTable({
            order: [[6, 'desc']],
            lengthMenu: [
              [-1, 50, 25, 10],
              ['All', 50, 25, 10],
            ],
          });
        }, 0);
      })
    );
  }
  ngOnInit(): void {
    this.data.allIndices$ = this.get_allIndices();
    this.data.dt$ = this.get_selected_change(this.data, 'container');
  }
  goto(id: any) {
    // this.routes.navigate([]);
    /*
    * const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
* */
    this.router.navigate(['/index'], { queryParams: { symbol: id.index } });

    console.log('id=>', id.index);
  }
  ref_index() {
    this.data.allIndices$ = this.get_allIndices();
  }
}
