import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../hero.service';
import { from, of } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';
declare var _: any, $: any, XLSX: any;
const TM = 20;
@Component({
  selector: 'app-index',
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
    pg_data: [],
    drop: [],
    filter: {},
    filter_arr: [],
  };
  test(d: any) {
    this.data.pg_data = _.clone(d);

    this.data.drop = _.keys(this.data.pg_data);
  }
  _getKey = (d: any) => {
    console.log('call---getKey');
    return Object.keys(d);
  };
  ngOnInit(): void {
    let that = this;

    this.hs.ajax(this.hs.getUrl() + '/api/equityMaster').subscribe((resp) => {
      console.log('resp=>', resp);
    });
    this.hs
      .ajax(this.hs.getUrl() + '/dhananjay431/my_imp_data/master/20230210.json')
      .subscribe((r) => {
        that.data.pg_data = r;
        that.data.drop = Object.keys(r);
      });
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
  _selected_drop(selected: any, data: any) {
    let x = _.chain(data.pg_data).flatMap().filter({ name: selected }).value();
    this.dt = this.set_data_refresh_table(x);
  }
  asc_desc(key: any, data: any) {
    if (data[0].col === undefined) {
      data[0].col = {};
    }
    if (data[0].col[key] == undefined) {
      data[0].col[key] = 'asc';
    } else {
      data[0].col[key] = data[0].col[key] == 'asc' ? 'desc' : 'asc';
    }
    if (data[0].col[key] === 'asc')
      data[0].data = data[0].data.sort((a: any, b: any) => {
        return _.get(a, key) < _.get(b, key) ? 1 : -1;
      });

    if (data[0].col[key] === 'desc')
      data[0].data = data[0].data.sort((a: any, b: any) => {
        return _.get(a, key) > _.get(b, key) ? 1 : -1;
      });
  }
  add_fn(dt: any, pg_dt: any) {
    let ft = _.cloneDeep(dt);

    dt.filter_arr.push(ft.filter);
    dt.filter = {};
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
    x[0].data = _.flow(new_ftr)(x[0].data);
    this.dt = this.set_data_refresh_table(x);

    //   console.log(_.flow(dt.filter_arr)(pg_dt[0].data));
  }
  reset(data: any, pg_dt: any) {
    let ft = _.cloneDeep(data);
    data.filter_arr = [];
    let x = _.chain(_.cloneDeep(ft.pg_data))
      .flatMap()
      .filter({ name: ft.selected })
      .value();
    this.dt = this.set_data_refresh_table(x);
  }
  temp_save_popup_data(d: any) {
    console.log('popup_data=>', d);
  }
  rem_from_filter(data: any, i: any) {
    _.remove(data.filter_arr, function (n: any) {
      return n == i;
    });
  }
  download(id: any) {
    let table_elt = document.getElementById(id);
    let workbook = XLSX.utils.table_to_book(table_elt);
    let ws = workbook.Sheets['Sheet1'];
    XLSX.utils.sheet_add_aoa(ws, [], {
      origin: -1,
    });
    XLSX.writeFile(workbook, new Date().toISOString() + '.csv');
  }
}
