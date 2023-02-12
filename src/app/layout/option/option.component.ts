import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../hero.service';
import { of } from 'rxjs';
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
    $data: of([]),
    expiryData_key: [],
    expiryData: [],
  };
  ob = (a: any) => a;
  oa = (a: any) => (Array.isArray(a) ? a : [a]);

  getNew() {
    let that = this;
    return this.hs.ajax('https://livedata.glitch.me/api/option/NIFTY').pipe(
      map((d: any) => {
        console.log('ddd=>', d);
        let expiryData = that.getAllopData({ data: d });
        let expiryData_key = Object.keys(expiryData);

        return { data: d, expiryData, expiryData_key };
      }),
      tap((d) => {
        console.log('tap=>', d);
      })
    );
  }
  ngOnInit(): void {
    let that = this;
    this.data.$data = this.getNew();
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
        return d.PE.strikePrice < d.PE.underlyingValue;
      })
      .sortBy('PE.changeinOpenInterest')
      .takeRight(3)
      .value();
    let b = _.chain(temp_data)
      .filter((d: any) => {
        return d.CE.strikePrice > d.CE.underlyingValue;
      })
      .sortBy('CE.changeinOpenInterest')
      .takeRight(3)
      .value();

    return _.chain([...a, ...b])
      .sortBy('strikePrice')
      .value();
  }
  getAllopData(_data: any) {
    return _.chain(_data.data.records.expiryDates)
      .take(3)
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
    this.data.$data = this.getNew();
  }
}
