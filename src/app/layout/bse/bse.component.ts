import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../hero.service';
import { mergeMap, of, tap, toArray } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-bse',
  templateUrl: './bse.component.html',
  styleUrls: ['./bse.component.scss'],
})
export class BseComponent implements OnInit {
  constructor(private hs: HeroService) {}

  data: any = {
    getAll$: of([]),
    Dropdowndata$: of([]),
    MktCapBoard$: of([]),
  };
  ob = (_: any) => _;
  HeatMapData(i: any) {
    return this.hs
      .ajaxp(
        `https://api.bseindia.com/BseIndiaAPI/api/HeatMapData/w?flag=HEAT&alpha=D&indexcode=${i.code}&random=23220231738`
      )
      .pipe(
        map((d: any) => {
          i.new_data = d
            .replace('bseindia$#$', '')
            .split('|')
            .map((d: any) => d.split(','));
          return i;
        })
      );
  }

  getSub(i: any) {
    console.log(i);
    this.HeatMapData(i).subscribe((resp) => {
      console.log(resp);
    });
  }
  fun_MktCapBoard(i: any) {
    return this.hs
      .ajaxp(
        `https://api.bseindia.com/BseIndiaAPI/api/MktCapBoard/w?cat=${i.CategoryNO}&type=${i.categorytype}`,
        false
      )
      .pipe(
        map((d: any) => {
          i.new_data = d;
          return i;
        }),
        mergeMap((d: any) => {
          if (d.new_data.RealTime != undefined) {
            return of(...d.new_data.RealTime).pipe(
              mergeMap((dx: any) => {
                dx.code = dx.ScripFlagCode;
                return this.HeatMapData(dx);
              })
            );
          }
          return of([]);
        }),
        toArray()
      );
  }

  Dropdowndata$$() {
    let dx: any;
    return this.hs
      .ajaxp('https://api.bseindia.com/BseIndiaAPI/api/Dropdowndata/w')
      .pipe(
        tap((d) => {
          dx = d;
        }),
        mergeMap((d: any) => {
          return of(...d.Category).pipe(
            mergeMap((dx) => {
              return this.fun_MktCapBoard(dx);
            }),
            toArray()
          );
        }),
        map((d) => {
          console.log(dx);
          console.log(d);
          return dx;
        })
      );
  }
  ngOnInit(): void {
    this.data.getAll$ = this.hs.ajaxp(
      'https://api.bseindia.com/bseindia/api/Indexmasternew/GetData?json={"flag":"","ln":"en","pg":"1","cnt":"100","fields":"1,2,3,4,5,6,7,8","hmpg":"1"}'
    );

    this.data.Dropdowndata$ = this.Dropdowndata$$();
  }
}
//https://api.bseindia.com/BseIndiaAPI/api/Dropdowndata/w

//https://api.bseindia.com/BseIndiaAPI/api/MktCapBoard/w?cat=7&type=1
