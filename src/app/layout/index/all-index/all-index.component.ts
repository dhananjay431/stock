import { Component, OnInit, Input } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-all-index',
  templateUrl: './all-index.component.html',
  styleUrls: ['./all-index.component.scss'],
})
export class AllIndexComponent implements OnInit {
  constructor() {}
  @Input() data: any = {
    drop: {
      all: [],
    },
  };
  n(d: any) {
    return Number(d).toFixed(2);
  }
  ngOnInit(): void {}
}
