import { Component, OnInit, Input } from '@angular/core';
declare var _: any;
@Component({
  selector: 'app-symbol-dtl',
  templateUrl: './symbol-dtl.component.html',
  styleUrls: ['./symbol-dtl.component.scss'],
})
export class SymbolDtlComponent implements OnInit {
  @Input() selected: any;
  selected_col: any = [
    { key: 'symbol', value: 'Symbol' },
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
  n(d: any) {
    return Number(d).toFixed(2);
  }
  constructor() {}

  ngOnInit(): void {}
}
