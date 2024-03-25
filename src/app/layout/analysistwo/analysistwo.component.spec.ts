import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysistwoComponent } from './analysistwo.component';

describe('AnalysistwoComponent', () => {
  let component: AnalysistwoComponent;
  let fixture: ComponentFixture<AnalysistwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalysistwoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalysistwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
