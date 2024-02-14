import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../hero.service';
//import { map, tap } from 'rxjs/operators';
import { map, of, tap } from 'rxjs';
import { Test1Service } from './test1.service';
declare var google: any, Chart: any;

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss'],
})
export class AnalysisComponent implements OnInit {
  constructor(private hs: HeroService, private tone: Test1Service) {}
  pgData: any = of({});
  pgcepe: any = of({});
  map2_qr: any = {
    type: 'NIFTY',
    date: new Date().toISOString().substring(0, 10),
    limit: 1,
    skip: 0,
  };
  typeChange(all_data: any) {
    this.ngOnInit();
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
  ngOnInit(): void {
    let next: any = new Date(this.map2_qr.date);
    //date.setDate(date.getDate() + 1);
    this.pgData = this.hs
      .post('/option', {
        find: {
          type: this.map2_qr.type,
          date: {
            $gt: this.map2_qr.date,
            $lt: new Date(next.setDate(next.getDate() + 1)).toISOString(),
          },
        },
        limit: 100,
        select: {
          date: true,
          'filtered.CE': true,
          'filtered.PE': true,

          // 'filtered.data.CE.changeinOpenInterest': true,
          // 'filtered.data.PE.changeinOpenInterest': true,
          // 'filtered.data.PE.openInterest': true,
          // 'filtered.data.CE.openInterest': true,
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
            this.tone.db_chart(label, data, data2);
          }, 300);
        })
      );

    this.pgcepe = this.tone.db_chart2_qr(this.map2_qr);
  }
}

/*
<SOAP:Envelope xmlns:SOAP="http://schemas.xmlsoap.org/soap/envelope/">
  <SOAP:Body>
    <Getalldata xmlns="http://schemas.cordys.com/memberdatatable" preserveSpace="no" qAccess="0" qValues="" />
  </SOAP:Body>
</SOAP:Envelope>
 */
