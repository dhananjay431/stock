import { Component, OnInit, Input } from '@angular/core';
import { HeroService } from '../../hero.service';
import { forkJoin } from 'rxjs';
declare var XLSX: any, _: any, $: any;

@Component({
  selector: 'app-index-dtl',
  templateUrl: './index-dtl.component.html',
  styleUrls: ['./index-dtl.component.scss'],
})
export class IndexDtlComponent implements OnInit {
  constructor(private hs: HeroService) {}
  @Input() _data: any = {};
  oa: any = this.hs.oa;
  ob = (a: any) => a;
  selected: any = {};
  popup_flag: any = false;
  ngOnInit(): void {}
  download(id: any) {
    let table_elt = document.getElementById(id);
    let workbook = XLSX.utils.table_to_book(table_elt);
    let ws = workbook.Sheets['Sheet1'];
    XLSX.utils.sheet_add_aoa(ws, [], {
      origin: -1,
    });
    XLSX.writeFile(workbook, new Date().toISOString() + '.csv');
  }
  asc_desc(key: any, pg_dt: any) {
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
        return _.get(a, key) < _.get(b, key) ? 1 : -1;
      });

    if (pg_dt.col[key] === 'desc')
      pg_dt.data = pg_dt.data.sort((a: any, b: any) => {
        return _.get(a, key) > _.get(b, key) ? 1 : -1;
      });
  }
  cand(i: any) {
    let x: any = {};
    if (x.lastPrice > i.open) {
      x.o = i.open;
      x.h = i.dayHigh;
      x.l = i.dayLow;
      x.c = i.lastPrice;
    } else {
      x.o = i.lastPrice;
      x.h = i.dayHigh;
      x.l = i.dayLow;
      x.c = i.open;
    }
    let top = ((x.h - x.c) / x.h) * 100;
    let bottom = ((x.o - x.l) / x.l) * 100;
    let body = ((x.c - x.o) / x.o) * 100;
    let tt = top + bottom + body;
    console.log(i.symbol, '= top=>', top, 'bottom=>', bottom, 'body=>', body);
    let color = i.lastPrice > i.open ? 'green' : 'red';
    return `position: absolute; top: ${top}px; width: 5px; height: ${body}px; background-color: ${color}; `;
  }
  n(d: any) {
    return Number(d).toFixed(2);
  }
  open_popup(id: any, i: any) {
    let that = this;
    let ob_data: any = {};
    ob_data.equity = this.hs.ajax(this.hs.getUrl() + '/api/equity/' + i.symbol);
    ob_data.tradeInfo = this.hs.ajax(
      this.hs.getUrl() + '/api/equity/tradeInfo/' + i.symbol
    );
    ob_data.equity_intraday = this.hs.ajax(
      this.hs.getUrl() + '/api/equity/intraday/' + i.identifier
    );
    // ob_data.equity_intraday_preopen = this.hs.ajax(
    //   this.hs.getUrl() + `/api/equity/intraday/${i.identifier}?preopen=true`
    // );
    forkJoin(ob_data).subscribe((resp: any) => {
      this.selected = { ...i, resp };
      console.log('forkJoin=>', this.selected);
      $(id).click();
      that.hs.ch(resp.equity_intraday, 'container');
    });
    //this.selected = { ...i, ...ob_data };
  }
  symbol_and_to_(i: any) {
    return i.symbol.replace(new RegExp(/&/, 'g'), '_');
  }
}
