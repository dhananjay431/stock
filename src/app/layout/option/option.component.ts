import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../hero.service';
import { mergeMap, of, Subject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
declare var _: any;
@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
})
export class OptionComponent implements OnInit {
  constructor(private hs: HeroService) {}

  data: any = {
    contracts: 'NIFTY',
    $data: of([]),
    $$data: new Subject(),
    expiryData_key: [],
    expiryData: [],
  };
  ob = (a: any) => a;
  oa = (a: any) => (Array.isArray(a) ? a : [a]);
  ngOnInit(): void {
    let that = this;
    this.data.$data = this.data.$$data.pipe(mergeMap((d) => this.getNew(d)));

    setTimeout(() => {
      this.data.$$data.next(this.data.contracts);
    }, 100);
  }
  h_contracts(id: any) {
    this.data.$$data.next(id);
  }
  getNew(id: any) {
    let that = this;
    return this.hs.ajax('https://livedata.glitch.me/api/option/' + id).pipe(
      map((d: any) => {
        let expiryData = that.getAllopData({ data: d });
        let expiryData_key = Object.keys(expiryData);
        let dt = { data: d, expiryData, expiryData_key };
        console.log('dt=>', dt);
        return dt;
      })
    );
  }

  h_expiryDates(data: any, _data: any) {
    data.expiryData = this.getAllopData(_data);
  }
  getexpiryData(expiryDate: any, _data: any) {
    let temp_data: any = _.chain(_data.data.records.data)
      .filter({ expiryDate: expiryDate })
      .value();
    let a = _.chain(temp_data)
      .filter((d: any) => {
        return (d?.PE?.strikePrice || 0) < (d?.PE?.underlyingValue || 0);
      })
      .sortBy('PE.changeinOpenInterest')
      .takeRight(3)
      .value();
    debugger;
    let b = _.chain(temp_data)
      .filter((d: any) => {
        return (d?.CE?.strikePrice || 0) > (d?.CE?.underlyingValue || 0);
      })
      .sortBy('CE.changeinOpenInterest')
      .takeRight(3)
      .value();
    return _.chain([...a, ...b])
      .sortBy('strikePrice')
      .value();
  }
  getAllopData(_data: any) {
    debugger;
    return _.chain(_data.data.records.expiryDates)
      .take(4)
      .reduce((a: any, b: any) => {
        let t: any = {};
        a[b] = this.getexpiryData(b, _data);
        return a;
      }, {})
      .value();
  }
  check(data: any, key: any) {
    console.log(data, key, typeof data);
    return data;
  }
  reset(a: any, b: any) {
    this.data.$$data.next(this.data.contracts);
  }
  n(d: any) {
    return Number(d).toFixed(2);
  }
}
