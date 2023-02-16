import { Component, OnInit, Input } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { HeroService } from '../../hero.service';
declare var _: any;
@Component({
  selector: 'app-symbol-dtl',
  templateUrl: './symbol-dtl.component.html',
  styleUrls: ['./symbol-dtl.component.scss'],
})
/*
https://www.nseindia.com/api/quote-equity?symbol=NTPC   =>  /api/equity/:symbol
https://www.nseindia.com/api/quote-equity?symbol=NTPC&section=trade_info    =>   /api/equity/tradeInfo/:symbol
https://www.nseindia.com/api/chart-databyindex?index=NTPCEQN   => /api/equity/intraday/NTPCEQN
https://www.nseindia.com/api/chart-databyindex?index=NTPCEQN&preopen=true   =>  /api/equity/intraday/NTPCEQN?preopen=true
*/
export class SymbolDtlComponent implements OnInit {
  @Input() selected: any = {};

  data: any = {
    equity$: of([]),
    tradeInfo: of([]),
    set_all_data$: of([]),
    equity_intraday: of([]),
    equity_intraday_preopen: of([]),
  };
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

  selected_col_metadata = [
    { key: 'series', value: 'series' },
    { key: 'symbol', value: 'symbol' },
    { key: 'isin', value: 'isin' },
    { key: 'status', value: 'status' },
    { key: 'listingDate', value: 'listingDate' },
    { key: 'industry', value: 'industry' },
    { key: 'lastUpdateTime', value: 'lastUpdateTime' },
    { key: 'pdSectorPe', value: 'pdSectorPe' },
    { key: 'pdSymbolPe', value: 'pdSymbolPe' },
    { key: 'pdSectorInd', value: 'pdSectorInd' },
  ];
  getD(key: any, data: any) {
    debugger;
    return _.get(data, key) || '';
  }
  n(d: any) {
    return Number(d).toFixed(2);
  }
  constructor(private hs: HeroService) {}
  set_all_data_function(selected: any) {
    this.data.set_all_data$ = this.set_all_data(selected);
  }
  set_all_data(selected: any) {
    let ob_data: any = {};
    ob_data.equity = this.hs.ajax(
      this.hs.getUrl() + '/api/equity/' + selected.symbol
    );
    ob_data.tradeInfo = this.hs.ajax(
      this.hs.getUrl() + '/api/equity/tradeInfo/' + selected.symbol
    );
    ob_data.equity_intraday = this.hs.ajax(
      this.hs.getUrl() + '/api/equity/intraday/' + selected.symbol
    );
    ob_data.equity_intraday_preopen = this.hs.ajax(
      this.hs.getUrl() + `api/equity/intraday/${selected.symbol}?preopen=true`
    );
    return forkJoin(ob_data);
  }
  ngOnInit(): void {
    console.log('symbol pop =>', this.selected);
    // this.data.equity$ = this.hs.ajax('/api/equity/' + this.selected.symbol);
    // this.data.tradeInfo = this.hs.ajax(
    //   ' /api/equity/tradeInfo/' + this.selected.symbol
    // );
    // this.data.equity_intraday = this.hs.ajax(
    //   '/api/equity/intraday/' + this.selected.symbol
    // );
    // this.data.equity_intraday_preopen = this.hs.ajax(
    //   `api/equity/intraday/${this.selected.symbol}?preopen=true`
    // );
  }
}
