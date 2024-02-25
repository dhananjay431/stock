import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../hero.service';

import { tap, map } from 'rxjs/operators';
import { of } from 'rxjs';
declare var _: any, html2canvas: any, $: any;
@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
})
export class OptionComponent implements OnInit {
  constructor(private hs: HeroService) {}
  map2_qr: any = {
    type: 'NIFTY',
    date: new Date().toISOString().substring(0, 10),
    time: { h: '09', m: '30' },
  };
  tbl_ob = of([]);
  time: any = [
    { key: '09:20', value: { h: '09', m: '20' } },
    { key: '09:25', value: { h: '09', m: '25' } },
    { key: '09:30', value: { h: '09', m: '30' } },
    { key: '09:35', value: { h: '09', m: '35' } },
    { key: '09:40', value: { h: '09', m: '40' } },
    { key: '09:45', value: { h: '09', m: '45' } },
    { key: '09:50', value: { h: '09', m: '50' } },
    { key: '09:55', value: { h: '09', m: '55' } },
    { key: '10:00', value: { h: '10', m: '00' } },
    { key: '10:05', value: { h: '10', m: '05' } },
    { key: '10:10', value: { h: '10', m: '10' } },
    { key: '10:15', value: { h: '10', m: '15' } },
    { key: '10:20', value: { h: '10', m: '20' } },
    { key: '10:25', value: { h: '10', m: '25' } },
    { key: '10:30', value: { h: '10', m: '30' } },
    { key: '10:35', value: { h: '10', m: '35' } },
    { key: '10:40', value: { h: '10', m: '40' } },
    { key: '10:45', value: { h: '10', m: '45' } },
    { key: '10:50', value: { h: '10', m: '50' } },
    { key: '10:55', value: { h: '10', m: '55' } },
    { key: '11:00', value: { h: '11', m: '00' } },
    { key: '11:05', value: { h: '11', m: '05' } },
    { key: '11:10', value: { h: '11', m: '10' } },
    { key: '11:15', value: { h: '11', m: '15' } },
    { key: '11:20', value: { h: '11', m: '20' } },
    { key: '11:25', value: { h: '11', m: '25' } },
    { key: '11:30', value: { h: '11', m: '30' } },
    { key: '11:35', value: { h: '11', m: '35' } },
    { key: '11:40', value: { h: '11', m: '40' } },
    { key: '11:45', value: { h: '11', m: '45' } },
    { key: '11:50', value: { h: '11', m: '50' } },
    { key: '11:55', value: { h: '11', m: '55' } },
    { key: '12:00', value: { h: '12', m: '00' } },
    { key: '12:05', value: { h: '12', m: '05' } },
    { key: '12:10', value: { h: '12', m: '10' } },
    { key: '12:15', value: { h: '12', m: '15' } },
    { key: '12:20', value: { h: '12', m: '20' } },
    { key: '12:25', value: { h: '12', m: '25' } },
    { key: '12:30', value: { h: '12', m: '30' } },
    { key: '12:35', value: { h: '12', m: '35' } },
    { key: '12:40', value: { h: '12', m: '40' } },
    { key: '12:45', value: { h: '12', m: '45' } },
    { key: '12:50', value: { h: '12', m: '50' } },
    { key: '12:55', value: { h: '12', m: '55' } },
    { key: '13:00', value: { h: '13', m: '00' } },
    { key: '13:05', value: { h: '13', m: '05' } },
    { key: '13:10', value: { h: '13', m: '10' } },
    { key: '13:15', value: { h: '13', m: '15' } },
    { key: '13:20', value: { h: '13', m: '20' } },
    { key: '13:25', value: { h: '13', m: '25' } },
    { key: '13:30', value: { h: '13', m: '30' } },
    { key: '13:35', value: { h: '13', m: '35' } },
    { key: '13:40', value: { h: '13', m: '40' } },
    { key: '13:45', value: { h: '13', m: '45' } },
    { key: '13:50', value: { h: '13', m: '50' } },
    { key: '13:55', value: { h: '13', m: '55' } },
    { key: '14:00', value: { h: '14', m: '00' } },
    { key: '14:05', value: { h: '14', m: '05' } },
    { key: '14:10', value: { h: '14', m: '10' } },
    { key: '14:15', value: { h: '14', m: '15' } },
    { key: '14:20', value: { h: '14', m: '20' } },
    { key: '14:25', value: { h: '14', m: '25' } },
    { key: '14:30', value: { h: '14', m: '30' } },
    { key: '14:35', value: { h: '14', m: '35' } },
    { key: '14:40', value: { h: '14', m: '40' } },
    { key: '14:45', value: { h: '14', m: '45' } },
    { key: '14:50', value: { h: '14', m: '50' } },
    { key: '14:55', value: { h: '14', m: '55' } },
    { key: '15:00', value: { h: '15', m: '00' } },
    { key: '15:05', value: { h: '15', m: '05' } },
    { key: '15:10', value: { h: '15', m: '10' } },
    { key: '15:15', value: { h: '15', m: '15' } },
    { key: '15:20', value: { h: '15', m: '20' } },
    { key: '15:25', value: { h: '15', m: '25' } },
    { key: '15:30', value: { h: '15', m: '30' } },
  ];
  search(qr: any) {
    this.tbl_ob = this.search_qr(qr);
  }
  ob = (_: any) => _;
  search_qr(dt: any) {
    let d = new Date(dt.date);
    d.setHours(dt.time.h);
    d.setMinutes(dt.time.m);
    console.log(new Date(d));

    return this.hs
      .post('/option', {
        find: {
          type: dt.type,
          date: {
            $gt: new Date(d).toISOString(),
          },
        },
        select: {
          date: true,
          filtered: true,
        },
        limit: 1,
      })
      .pipe(
        map((d: any) => {
          d[0].filtered.data = d[0].filtered.data.map((d1: any) => {
            if (d1.CE != undefined) {
              d1.ce_itm = d1.CE.underlyingValue - d1.strikePrice;
              d1.atm = Math.abs(d1.CE.underlyingValue - d1.strikePrice);
            }

            if (d1.PE != undefined) {
              d1.pe_itm = d1.strikePrice - d1.PE.underlyingValue;
              d1.atm = Math.abs(d1.PE.underlyingValue - d1.strikePrice);
            }

            if (d1.CE == undefined) {
              d1.CE = {};
            }
            if (d1.PE == undefined) {
              d1.PE = {};
            }
            return d1;
          });

          let atmArr = _.chain(d[0].filtered.data).sortBy('atm').value();
          atmArr[0].atm = true;
          return d;
        })
      );
  }
  number_toFixed(num: any, decimal: any) {
    return Number(num).toFixed(decimal);
  }
  ngOnInit(): void {}
}
