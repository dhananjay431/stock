import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-index-one',
  templateUrl: './index-one.component.html',
  styleUrls: ['./index-one.component.scss'],
})
export class IndexOneComponent implements OnInit {
  @Input() data: any;
  constructor() {}
  n(d: any) {
    return Number(d).toFixed(2);
  }
  ngOnInit(): void {}
}
