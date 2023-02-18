import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../hero.service';
import { forkJoin, mergeMap, of, Subject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
declare var _: any, html2canvas: any, $: any;
@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
})
export class OptionComponent implements OnInit {
  constructor(private hs: HeroService) {}
  //api/master-quote
  data: any = {
    contracts: 'NIFTY',
    $masterQuote: of([]),
    $data: of([]),
    $$data: new Subject(),
    expiryData_key: [],
    expiryData: [],
    temp_url: '/api/option/',
  };
  ob = (a: any) => a;
  oa = (a: any) => (Array.isArray(a) ? a : [a]);
  ngOnInit(): void {
    let that = this;

    let x = this.hs._int(this.hs.from_to_time).subscribe((resp: any) => {
      if (resp == true) {
        $('#option_refresh').click();
      } else {
        x.unsubscribe();
      }
    });

    this.data.$data = this.data.$$data.pipe(mergeMap((d) => this.getNew(d)));
    this.data.$masterQuote = this.hs.ajax('/api/master-quote');
    setTimeout(() => {
      this.data.$$data.next({
        url: '/api/option-chain-indices?symbol=',
        id: this.data.contracts,
      });
    }, 100);
  }
  h_contracts(url: any, id: any) {
    debugger;
    this.data.temp_url = url;
    this.data.$$data.next({ url, id });
  }
  getNew(id: any) {
    let that = this;
    debugger;
    return this.hs.ajax(id.url + id.id).pipe(
      map((d: any) => {
        d.records.data = d.records.data.map((d: any) => {
          if (d.PE != undefined)
            d.flag = d.PE.strikePrice > d.PE.underlyingValue;
          // d.flag = d.PE.underlyingValue - d.PE.strikePrice;
          return d;
        });
        let expiryData = that.getAllopData({ data: d });
        let expiryData_key = Object.keys(expiryData);
        let PCR = expiryData_key.reduce((a: any, d: any) => {
          let CE = _.chain(expiryData[d]).map('CE.openInterest').sum().value();
          let PE = _.chain(expiryData[d]).map('PE.openInterest').sum().value();
          a[d] = {
            PCR: Number(PE / CE).toFixed(2),
            TTL_CE: CE,
            TTL_PE: PE,
          };
          return a;
        }, {});
        let dt: any = { data: d, expiryData, expiryData_key, PCR };

        return dt;
      })
    );
  }
  put_call_chart_id_open(id: any, data: any) {
    let that = this;
    let a = this.hs.ajax('/api/chart-databyindex?index=' + data.CE.identifier);
    let b = this.hs.ajax('/api/chart-databyindex?index=' + data.PE.identifier);
    forkJoin(a, b)
      .pipe(
        map((resp: any) => {
          return resp.map((d: any) => {
            return { name: d.identifier, data: d.grapthData };
          });
        })
      )
      .subscribe((resp) => {
        $(id).click();
        that.hs.put_call_chart({ data: resp, _data: data }, 'container');
      });
  }
  h_expiryDates(data: any, _data: any) {
    data.expiryData = this.getAllopData(_data);
  }
  show(d: any, _d: any) {
    console.log(d, _d);
  }
  getexpiryData(expiryDate: any, _data: any) {
    let temp_data: any = _.chain(_data.data.records.data)
      .filter({ expiryDate: expiryDate })
      .value();
    debugger;
    if (temp_data.length < 6)
      return _.chain(temp_data).sortBy('strikePrice').value();

    let a = _.chain(temp_data)
      .filter((d: any) => d.flag == false)
      .sortBy('PE.changeinOpenInterest')
      .takeRight(3)
      .value();
    let b = _.chain(temp_data)
      .filter((d: any) => d.flag == true)
      .sortBy('CE.changeinOpenInterest')
      .takeRight(3)
      .value();
    debugger;
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
    return data;
  }
  reset(a: any, b: any) {
    this.data.$$data.next({ url: this.data.temp_url, id: this.data.contracts });
  }
  n(d: any) {
    return Number(d).toFixed(2);
  }
  h_html2canvas(id: any) {
    this.hs.h_html2canvas(id);
  }
}
