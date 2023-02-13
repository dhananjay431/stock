import { Component, OnInit, Input } from '@angular/core';
import { HeroService } from '../../../hero.service';
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
  selected_col: any = [
    { key: 'symbol', value: 'Symbol' },

    { key: 'meta.companyName', value: 'Company Name' },
    { key: 'identifier', value: 'identifier' },
    { key: 'series', value: 'series' },
    { key: 'open', value: 'Open' },
    { key: 'dayHigh', value: 'DayHigh' },
    { key: 'dayLow', value: 'DayLow' },
    { key: 'lastPrice', value: 'LastPrice' },
    { key: 'previousClose', value: 'pClose' },
    { key: 'change', value: 'Change' },
    { key: 'pChange', value: 'pChange' },
    { key: 'totalTradedVolume', value: 'total Volume' },
    { key: 'totalTradedValue', value: 'total Value' },

    { key: 'yearHigh', value: 'yHigh' },
    { key: 'ffmc', value: 'ffmc' },
    { key: 'yearLow', value: 'YL' },
    { key: 'nearWKH', value: 'nearWKH' },
    { key: 'nearWKL', value: 'nearWKL' },
    { key: 'perChange365d', value: 'perChange365d' },

    { key: 'perChange30d', value: 'perChange30d' },

    { key: 'meta.isFNOSec', value: 'isFNOSec' },
    { key: 'meta.isCASec', value: 'isCASec' },
    { key: 'meta.isSLBSec', value: 'isSLBSec' },
    { key: 'meta.isDebtSec', value: 'isDebtSec' },
    { key: 'meta.isSuspended', value: 'isSuspended' },
    { key: 'meta.isETFSec', value: 'isETFSec' },
    { key: 'meta.isDelisted', value: 'isDelisted' },
    { key: 'meta.isin', value: 'isin' },
  ];
  getD(key: any, data: any) {
    debugger;
    return _.get(data, key) || '';
  }
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
  /*
{
    "priority": 0,
    "symbol": "TATAMOTORS",
    "identifier": "TATAMOTORSEQN",
    "series": "EQ",
    "open": 437.95,
    "dayHigh": 447.8,
    "dayLow": 431.2,
    "lastPrice": 444.4,
    "previousClose": 436.75,
    "change": 7.65,
    "pChange": 1.75,
    "totalTradedVolume": 14798390,
    "totalTradedValue": 6521946440.8,
    "lastUpdateTime": "10-Feb-2023 15:59:33",
    "yearHigh": 511.5,
    "ffmc": 799630515447.61,
    "yearLow": 366.2,
    "nearWKH": 13.118279569892477,
    "nearWKL": -21.35445111960677,
    "perChange365d": -10.62,
    "date365dAgo": "11-Feb-2022",
    "chart365dPath": "https://static.nseindia.com/sparklines/365d/TATAMOTORS-EQ.jpg",
    "date30dAgo": "13-Jan-2023",
    "perChange30d": 8.35,
    "chart30dPath": "https://static.nseindia.com/sparklines/30d/TATAMOTORS-EQ.jpg",
    "chartTodayPath": "https://static.nseindia.com/sparklines/today/TATAMOTORSEQN.jpg",
    "meta": {
        "symbol": "TATAMOTORS",
        "companyName": "Tata Motors Limited",
        "industry": "AUTOMOBILES - 4 WHEELERS",
        "activeSeries": [
            "EQ"
        ],
        "debtSeries": [],
        "tempSuspendedSeries": [],
        "isFNOSec": true,
        "isCASec": false,
        "isSLBSec": true,
        "isDebtSec": false,
        "isSuspended": false,
        "isETFSec": false,
        "isDelisted": false,
        "isin": "INE155A01022"
    },
    "DNL": 3.061224489795916,
    "DNH": 0.7592675301473948
}*/

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
    debugger;

    let top = ((x.h - x.c) / x.h) * 100;
    let bottom = ((x.o - x.l) / x.l) * 100;
    let body = ((x.c - x.o) / x.o) * 100;

    let tt = top + bottom + body;
    console.log(i.symbol, '= top=>', top, 'bottom=>', bottom, 'body=>', body);
    // if (i.pChange > 0) top = ((i.dayHigh - i.lastPrice) / i.dayHigh) * 100;
    // else {
    //   top = ((i.lastPrice - i.dayLow) / i.dayLow) * 100;
    // }

    let color = i.lastPrice > i.open ? 'green' : 'red';
    return `position: absolute; top: ${top}px; width: 5px; height: ${body}px; background-color: ${color}; `;
  }
  n(d: any) {
    return Number(d).toFixed(2);
  }
  open_popup(id: any, i: any) {
    this.selected = i;
    $(id).click();
  }
}
