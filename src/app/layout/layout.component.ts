import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeroService } from '../hero.service';
import { mergeMap, of, Subject, interval, tap } from 'rxjs';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  constructor(private router: Router, private hs: HeroService) {}

  data: any = {
    interval$: of(null),
    livedt$$: new Subject(),
    livedt$: of([]),
    test: interval(1000),
  };
  ngOnInit(): void {
    let that = this;
    this.data.livedt$ = this.data.livedt$$.pipe(
      mergeMap((d) => this.hs.ajax(this.hs.getUrl(), false)),
      tap((d: any) => {
        document.title = 'NIFTY ' + d.marketState[0].last;
      })
    );

    let x = this.hs._int(this.hs.from_to_time).subscribe((resp: any) => {
      if (resp == true) {
        that.data.livedt$$.next();
      } else {
        x.unsubscribe();
      }
    });
    setTimeout(() => {
      that.ref();
    }, 0);
  }

  ref() {
    this.data.livedt$$.next();
  }

  chk() {
    let that = this;
    let a =
      new Date(new Date().toDateString() + ' 15:30:00').getTime() >
      new Date().getTime();
    let b =
      new Date().getTime() >
      new Date(new Date().toDateString() + ' 09:00:00').getTime();
    return a && b
      ? true
      : (that.data.interval != null && that.data.interval.subscribe(), false);
  }
  ob = (a: any) => a;
  logout() {
    this.router.navigate(['/login']);
    localStorage.removeItem('url');
  }
}
