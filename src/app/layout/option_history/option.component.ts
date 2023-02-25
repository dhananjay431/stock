import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../hero.service';
import { forkJoin, mergeMap, of, Subject, from, catchError } from 'rxjs';
import { tap, map } from 'rxjs/operators';
declare var _: any, html2canvas: any, $: any;
@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
})
export class OptionComponent implements OnInit {
  constructor(private hs: HeroService) {}
  data: any = {
    sub$$: new Subject(),
    data$: of([]),
    date: '2023-02-24',
    type: 'NIFTY',
    n: 0,
  };

  get_prc = (d: any) =>
    from(
      fetch(`${this.hs.getUrl()}/data/${d.date}_PCR_${d.type}`).then((r: any) =>
        r.text()
      )
    ).pipe(
      map((d: any) => {
        debugger;

        return d
          .split('\n')
          .filter(Boolean)
          .map((d: any) => JSON.parse(d));
      })
    );
  get_option_data(d: any) {
    return this.hs
      .ajaxp(`${this.hs.getUrl()}/getData/${d.date}_${d.type}?n=${d.n}`)
      .pipe(this._getNew());
  }

  ngOnInit() {
    this.data.data$ = this.data.sub$$.pipe(
      mergeMap((d: any) => {
        return forkJoin({
          PCR: this.get_prc(d),
          get_option_data: this.get_option_data(d),
        }).pipe(
          tap((dx: any) => {
            this.data.all = dx;
          }),
          catchError((err) => {
            delete this.data.all;
            return of({ PCR: [], get_option_data: {} });
          })
        );
      })
    );
    setTimeout(() => {
      this.data.sub$$.next(this.data);
    }, 10);
  }
  change(data: any) {
    this.data.sub$$.next(data);
  }
  getAllopData(_data: any) {
    return _.chain(_data.data.records.expiryDates)
      .take(4)
      .reduce((a: any, b: any) => {
        let t: any = {};
        a[b] = this.getexpiryData(b, _data);
        return a;
      }, {})
      .value();
  }
  _getNew = () =>
    map((d: any) => {
      if (d?.records?.data == undefined) return;
      d.records.data = d.records.data.map((d: any) => {
        if (d.PE != undefined)
          d.flag = !(d.PE.underlyingValue > d.PE.strikePrice);
        // d.flag = d.PE.underlyingValue - d.PE.strikePrice;
        return d;
      });
      let expiryData = this.getAllopData({ data: d });
      let expiryData_key = Object.keys(expiryData);
      let PCR = expiryData_key.reduce((a: any, d: any) => {
        let CE = _.chain(expiryData[d]).map('CE.openInterest').sum().value();
        let PE = _.chain(expiryData[d]).map('PE.openInterest').sum().value();
        let C_CE = _.chain(expiryData[d])
          .map('CE.changeinOpenInterest')
          .sum()
          .value();
        let C_PE = _.chain(expiryData[d])
          .map('PE.changeinOpenInterest')
          .sum()
          .value();
        a[d] = {
          PCR: Number(PE / CE).toFixed(2),
          C_PCR: Number(C_PE / C_CE).toFixed(2),
          TTL_CE: CE,
          TTL_PE: PE,
          TTL_C_CE: C_CE,
          TTL_C_PE: C_PE,
        };
        return a;
      }, {});
      let dt: any = { data: d, expiryData, expiryData_key, PCR };
      return dt;
    });
  getexpiryData(expiryDate: any, _data: any) {
    let temp_data: any = _.chain(_data.data.records.data)
      .filter({ expiryDate: expiryDate })
      .value();
    if (temp_data.length < 6)
      return _.chain(temp_data).sortBy('strikePrice').value();
    let a = _.chain(temp_data)
      .filter({ flag: false })
      .sortBy('strikePrice')
      .takeRight(8)
      .value();
    let b = _.chain(temp_data)
      .filter({ flag: true })
      .sortBy('strikePrice')
      .take(8)
      .value();
    return _.chain([...a, ...b])

      .sortBy('strikePrice')
      .value();
  }

  ob = (_: any) => _;
  n = (d: any) => Number(Number(d).toFixed(2));
  n_text = (d: any) => Number(d).toFixed(2);
  h_get_pcr(i: any, j: any) {
    return i.PCR[j] || {};
  }
  prev(data: any, flag: any) {
    if (flag == 'p') {
      data.n--;
    }
    if (flag == 'n') {
      data.n++;
    }
    this.data.sub$$.next(data);
  }
  time_change(data: any) {
    this.data.sub$$.next(data);
  }
  change_date(data: any) {
    data.n = 0;
    this.data.sub$$.next(data);
  }
  df(d: any) {
    return this.hs.dateformat(d);
  }
}
