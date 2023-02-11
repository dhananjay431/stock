import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../hero.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  constructor(private hs: HeroService) {}
  ngOnInit() {}
}
