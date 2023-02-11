import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexDtlComponent } from './index-dtl.component';

describe('IndexDtlComponent', () => {
  let component: IndexDtlComponent;
  let fixture: ComponentFixture<IndexDtlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexDtlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexDtlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
