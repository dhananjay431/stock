import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../hero.service';
import { from, of } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';
import { dropdown_filter_data } from './data';
declare var _: any, $: any, XLSX: any;
const TM = 20;
@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss'],
})
export class DashComponent implements OnInit {
  constructor(private hs: HeroService) {}
  oa: any = this.hs.oa;
  ob = (a: any) => a;
  n(d: any) {
    return Number(d).toFixed(2);
  }
  dt: any = of(null);

  data: any = {
    pg_data: of(null),
    drop: of([]),
    filter: {},
    filter_arr: [],
    dropdown_filter_data: dropdown_filter_data,
  };

  _getKey = (d: any) => {
    console.log('call---getKey');
    return Object.keys(d);
  };
  ngOnInit(): void {
    let that = this;
    // that.data.drop = this.hs
    //   .ajax('https://livedata.glitch.me/api/equityMaster')
    //   .pipe(
    //     map((d) => {
    //       return { key: Object.keys(d), data: d };
    //     })
    //   );

    that.data.drop = this.hs.ajax(this.hs.getUrl() + '/api/allIndices').pipe(
      map((d) => {
        let x = _.chain(d.data).groupBy('key').value();
        return { key: Object.keys(x), data: x, all: d.data };
      })
    );
  }
  _sh(d: any) {
    console.log(d);
  }
  _selected_drop$(id: any, _data: any) {
    debugger;
    if (_data === '') id.selected_ob = [];
    else id.selected_ob = _.find(_data.drop.all, { index: id.selected });
    /*
{
    "priority": 1,
    "symbol": "NIFTY 50",
    "identifier": "NIFTY 50",
    "open": 17847.55,
    "dayHigh": 17876.95,
    "dayLow": 17801,
    "lastPrice": 17856.5,
    "previousClose": 17893.45,
    "change": -36.95000000000073,
    "pChange": -0.21,
    "ffmc": 788165089.5,
    "yearHigh": 18887.6,
    "yearLow": 15183.4,
    "totalTradedVolume": 231991834,
    "totalTradedValue": 170638820357.98,
    "lastUpdateTime": "10-Feb-2023 16:00:00",
    "nearWKH": 5.459137211715616,
    "nearWKL": -17.605411172728115,
    "perChange365d": 2.77,
    "date365dAgo": "11-Feb-2022",
    "chart365dPath": "https://static.nseindia.com/sparklines/365d/NIFTY-50.jpg",
    "date30dAgo": "13-Jan-2023",
    "perChange30d": -0.56,
    "chart30dPath": "https://static.nseindia.com/sparklines/30d/NIFTY-50.jpg",
    "chartTodayPath": "https://static.nseindia.com/sparklines/today/NIFTY-50.jpg"
}
*/
    return this.hs.ajax(this.hs.getUrl() + '/api/index/' + id.selected);
    /*      .pipe(
            map((d) => {
              d.data = d.data.map((x: any) => {
                x.DNL = ((x.lastPrice - x.dayLow) / x.dayLow) * 100;
                x.DNH = ((x.dayHigh - x.lastPrice) / x.dayHigh) * 100;
                return x;
              });
              return d;
            }),
            tap((d: any) => {
              console.log(d);
            })
          );*/
  }

  _selected_drop(id: any, _data: any) {
    this.data.pg_data = this._selected_drop$(id, _data);
  }
  //add datasdfaasdf
  // asc_desc(key: any, data: any) {
  //   if (data[0].col === undefined) {
  //     data[0].col = {};
  //   }
  //   if (data[0].col[key] == undefined) {
  //     data[0].col[key] = 'asc';
  //   } else {
  //     data[0].col[key] = data[0].col[key] == 'asc' ? 'desc' : 'asc';
  //   }
  //   if (data[0].col[key] === 'asc')
  //     data[0].data = data[0].data.sort((a: any, b: any) => {
  //       return _.get(a, key) < _.get(b, key) ? 1 : -1;
  //     });
  //
  //   if (data[0].col[key] === 'desc')
  //     data[0].data = data[0].data.sort((a: any, b: any) => {
  //       return _.get(a, key) > _.get(b, key) ? 1 : -1;
  //     });
  // }
  download(id: any) {
    let table_elt = document.getElementById(id);
    let workbook = XLSX.utils.table_to_book(table_elt);
    let ws = workbook.Sheets['Sheet1'];
    XLSX.utils.sheet_add_aoa(ws, [], {
      origin: -1,
    });
    XLSX.writeFile(workbook, new Date().toISOString() + '.csv');
  }

  add_fn(dt: any, pg_dt: any) {
    let ft = _.cloneDeep(dt);

    dt.filter_arr.push(ft.filter);
    dt.filter = {};
  }
  set_data_refresh_table(x: any) {
    let that = this;
    return from(
      new Promise((a, b) => {
        setTimeout(() => {
          a(x);
        }, TM);
      })
    );
  }
  search(dt: any, pg_dt: any) {
    pg_dt.pg_data.data = this._search(dt, pg_dt);
  }
  _search(dt: any, pg_dt: any) {
    let ft = _.cloneDeep(dt);

    if (ft.filter_arr.length == 0) return pg_dt.pg_data.data;
    let new_ftr: any = [];
    for (let i = 0; i < ft.filter_arr.length; i++) {
      let fn = (dx: any) => {
        return dx.filter((dx2: any) => {
          return _[ft.filter_arr[i].cond](
            _.get(dx2, ft.filter_arr[i].col),
            ft.filter_arr[i].val
          );
        });
      };
      new_ftr.push(fn);
    }

    let x = _.chain(_.cloneDeep(ft.pg_data))
      .flatMap()
      .filter({ name: ft.selected })
      .value();
    return _.flow(new_ftr)(pg_dt.pg_data.data);
  }
  reset(id: any, _data: any) {
    debugger;
    //id.filter_arr = [];
    //this.data.pg_data =

    this.data.pg_data = this._selected_drop$(id, _data).pipe(
      map((d: any) => {
        debugger;
        _data.pg_data = _.cloneDeep(d);
        _data.pg_data.data = this._search(id, _.cloneDeep(_data));
        return _data.pg_data;
      })
    );
    // .subscribe((resp) => {
    //   _data.pg_data = resp;
    // });

    // pg_dt.pg_data.data = this._search(dt, pg_dt);
  }
  temp_save_popup_data(d: any) {}

  asc_desc(key: any, pg_dt: any) {
    debugger;
    if (pg_dt.col === undefined) {
      pg_dt.col = {};
    }
    if (pg_dt.col[key] == undefined) {
      pg_dt.col[key] = 'asc';
    } else {
      pg_dt.col[key] = pg_dt.col[key] == 'asc' ? 'desc' : 'asc';
    }
    if (pg_dt.col[key] === 'asc')
      pg_dt.data = pg_dt.data.sort((a: any, b: any) => {
        console.log(_.get(a, key), _.get(b, key));
        return _.get(a, key) < _.get(b, key) ? 1 : -1;
      });

    if (pg_dt.col[key] === 'desc')
      pg_dt.data = pg_dt.data.sort((a: any, b: any) => {
        return _.get(a, key) > _.get(b, key) ? 1 : -1;
      });
  }
  rem_from_filter(data: any, i: any) {
    _.remove(data.filter_arr, function (n: any) {
      return n == i;
    });
  }
}
