import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SymbolDtlComponent } from './symbol-dtl.component';

describe('SymbolDtlComponent', () => {
  let component: SymbolDtlComponent;
  let fixture: ComponentFixture<SymbolDtlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SymbolDtlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SymbolDtlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
