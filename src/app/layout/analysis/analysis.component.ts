import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../hero.service';
//import { map, tap } from 'rxjs/operators';
import { map, of, tap } from 'rxjs';
import { Test1Service } from './test1.service';
declare var google: any, Chart: any, _: any, dayjs: any, $: any;

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss'],
})
export class AnalysisComponent implements OnInit {
  constructor(private hs: HeroService, private tone: Test1Service) {}
  pgData: any = of({});
  pgcepe: any = of({});
  strike: any = of({});
  sh: any = 'All';

  map2_qr: any = {
    type: 'NIFTY',
    date: new Date().toISOString().substring(0, 10),
    limit: 1,
    skip: 0,
    strikePrice: '',
  };
  typeChange(all_data: any) {
    this.db_init();
  }
  changeStrike(map2: any) {
    let dd = new Date(map2.date);
    dd.setHours(9);
    dd.setMinutes(15);

    let dd2 = new Date(map2.date);
    dd2.setHours(15);
    dd2.setMinutes(31);

    this.strike = this.hs
      .post('/option', {
        aggregate: [
          {
            $match: {
              type: map2.type,
              date: {
                $gt: { _eval: 'dt', value: new Date(dd).toISOString() },
                $lt: { _eval: 'dt', value: new Date(dd2).toISOString() },
              },
            },
          },
          { $project: { 'filtered.data': 1, date: 1 } },
          { $unwind: { path: '$filtered.data' } },
          { $match: { 'filtered.data.strikePrice': map2.strikePrice } },
          { $project: { date: 1, data: '$filtered.data' } },
        ],
      })
      .pipe(
        tap((resp: any) => {
          let t: any = [];
          t[0] = _.chain(resp).map('data.CE.lastPrice').value();
          t[1] = _.chain(resp).map('data.PE.lastPrice').value();
          t[2] = _.chain(resp).map('data.CE.changeinOpenInterest').value();
          t[3] = _.chain(resp).map('data.PE.changeinOpenInterest').value();
          t[4] = _.chain(resp)
            .map((d: any) => dayjs(new Date(d.date)).format('HH:mm'))
            .value();
          let t2: any = [];
          t2[0] = t[0];
          t2[1] = t[1];
          t2[2] = _.chain(resp).map('data.CE.openInterest').value();
          t2[3] = _.chain(resp).map('data.PE.openInterest').value();
          t2[4] = t[4];
          setTimeout(() => {
            // this.tone.db_chart(t[3], t[0], t[1], 'acquisitions4');
            this.tone.db_chart2(this.tone.db_chart2_strike(t), 'acquisitions4');
            this.tone.db_chart2(
              this.tone.db_chart2_strike(t2),
              'acquisitions5'
            );
          }, 300);
        })
      );
  }
  formatTime(localIsoDate: any) {
    localIsoDate = new Date(localIsoDate);
    function z(n: any) {
      return (n < 10 ? '0' : '') + n;
    }
    var hh = localIsoDate.getHours();
    var mm = localIsoDate.getMinutes();
    var ss = localIsoDate.getSeconds();
    return z(hh) + ':' + z(mm) + ':' + z(ss);
  }
  ob = (_: any) => _;

  date_change(map2_qr: any) {
    console.log(map2_qr);
  }
  pre_next(id: any) {
    if (id == 'n') {
      //this.map2_qr.limit = this.map2_qr.limit + 1;
      this.map2_qr.skip = this.map2_qr.skip + 1;
    } else if (id == 'p') {
      //this.map2_qr.limit = this.map2_qr.limit - 1;
      this.map2_qr.skip = this.map2_qr.skip - 1;
    }
    this.pgcepe = this.tone.db_chart2_qr(this.map2_qr);
  }
  sub: any = of([]);
  db_init() {
    let next: any = new Date(this.map2_qr.date);
    //date.setDate(date.getDate() + 1);
    let d = new Date(this.map2_qr.date);
    d.setHours(9);
    d.setMinutes(16);
    this.pgData = this.hs
      .post('/option', {
        find: {
          type: this.map2_qr.type,
          date: {
            $gt: new Date(d).toISOString(),
            $lt: new Date(next.setDate(next.getDate() + 1)).toISOString(),
          },
        },
        limit: 100,
        select: {
          date: true,
          // 'filtered.strikePrice': true,
          'filtered.CE': true,
          'filtered.PE': true,
          'filtered.data.CE.underlyingValue': true,
        },
      })
      .pipe(
        tap((resp: any) => {
          let data: any = [];
          let data2: any = [];
          let label: any = [];
          for (let i = 0; i < resp.length; i++) {
            if (resp[i].filtered.data.length > 0) {
              data.push(resp[i].filtered.PE.totOI / resp[i].filtered.CE.totOI);
              data2.push(resp[i].filtered.data[0].CE.underlyingValue);
              label.push(this.formatTime(new Date(resp[i].date)));
            }
          }
          setTimeout(() => {
            this.tone.db_chart(label, data, data2, 'acquisitions');
          }, 300);
        })
      );

    this.pgcepe = this.tone.db_chart2_qr(this.map2_qr);
  }
  ngOnInit(): void {
    let that = this;
    this.sub = this.tone.new_sub('setObj').pipe(
      tap((d: any) => {
        if (d.type == 'one') {
          let dt: any = new Date(that.map2_qr.date);
          let hhmmss = d.title.split(':');
          dt.setHours(hhmmss[0]);
          dt.setMinutes(hhmmss[1]);
          let new_qr = JSON.parse(JSON.stringify(that.map2_qr));
          new_qr['date'] = dt.toISOString();
          new_qr['limit'] = 1;
          new_qr['skip'] = 0;
          $('#all').click();
          that.pgcepe = that.tone.db_chart2_qr(new_qr);
        } else if (d.type == 'two') {
          $('#strike').click();
          that.map2_qr.strikePrice = Number(d.title[0]);
          that.changeStrike(that.map2_qr);
        }
      })
    );

    this.db_init();
  }
}

/*
<SOAP:Envelope xmlns:SOAP="http://schemas.xmlsoap.org/soap/envelope/">
  <SOAP:Body>
    <Getalldata xmlns="http://schemas.cordys.com/memberdatatable" preserveSpace="no" qAccess="0" qValues="" />
  </SOAP:Body>
</SOAP:Envelope>
 */
