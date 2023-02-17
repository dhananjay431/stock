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
    livedt$$: new Subject(),
    livedt$: of([]),
  };
  ngOnInit(): void {
    let that = this;

    this.data.livedt$ = this.data.livedt$$.pipe(
      mergeMap((d) => this.hs.ajax(this.hs.getUrl(), false)),
      tap((d: any) => {
        document.title = 'NIFTY ' + d.marketState[0].last;
      })
    );

    interval(5000)
      .pipe(
        tap((d) => {
          this.data.livedt$$.next();
        })
      )
      .subscribe();
  }

  ref() {
    this.data.livedt$$.next();
  }

  // liveTime: any = '';
  // chk() {
  //   let a =
  //     new Date(new Date().toDateString() + ' 13:30:00').getTime() >
  //     new Date().getTime();
  //   let b =
  //     new Date().getTime() >
  //     new Date(new Date().toDateString() + ' 09:00:00').getTime();
  //   if (a && b) this.ref();
  //   else clearInterval(this.liveTime);
  // }
  // ref_time() {
  //   this.liveTime = setInterval(() => {
  //     this.chk();
  //   }, 3000);
  // }
  ob = (a: any) => a;
  logout() {
    this.router.navigate(['/login']);
    localStorage.removeItem('url');
  }
}
