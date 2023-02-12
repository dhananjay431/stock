import { Injectable } from '@angular/core';
import { from, of } from 'rxjs';
import { finalize, mergeMap, tap } from 'rxjs/operators';
declare var $: any;
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
    debugger;
    //let t: any = Object.fromEntries(new URLSearchParams(location.search));
    //return t.url || '';
    return 'http://localhost:3000';
  }
}
