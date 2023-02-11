import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../hero.service';
import { from, of } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';
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

    that.data.drop = this.hs
      .ajax('https://livedata.glitch.me/api/allIndices')
      .pipe(
        map((d) => {
          let x = _.chain(d.data).groupBy('key').value();
          return { key: Object.keys(x), data: x, all: d.data };
        })
      );
  }
  _selected_drop(id: any, _data: any) {
    if (_data === '') id.selected_ob = [];
    else id.selected_ob = _.find(_data.drop.all, { index: id.selected });

    this.data.pg_data = this.hs.ajax(
      'https://livedata.glitch.me/api/index/' + id.selected
    );
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
    let ft = _.cloneDeep(dt);
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
    pg_dt.pg_data.data = _.flow(new_ftr)(pg_dt.pg_data.data);
    console.log('pg_dt.data=>', pg_dt.pg_data.data);
    // this.dt = this.set_data_refresh_table(x);

    //   console.log(_.flow(dt.filter_arr)(pg_dt[0].data));
  }
  reset(data: any, pg_dt: any) {
    data.filter_arr = [];

    this._selected_drop(data, '');
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
