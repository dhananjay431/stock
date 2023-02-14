import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../hero.service';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
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
    this.data.dt$ = this.get_selected_change(data);
  }
  get_selected_change(data: any) {
    return this.hs
      .ajax(
        this.hs.getUrl() +
          '/api/equity/intraday/' +
          data.selected +
          '?indices=true'
      )
      .pipe(
        tap((data: any) => {
          console.log('data=>', data);
          this.hs.ch(data, 'container');
        })
      );
  }

  ngOnInit(): void {
    this.data.allIndices$ = this.hs.ajax(this.hs.getUrl() + '/api/allIndices');
    this.data.dt$ = this.get_selected_change(this.data);
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
    this.data.allIndices$ = this.hs.ajax(this.hs.getUrl() + '/api/allIndices');
  }
}
