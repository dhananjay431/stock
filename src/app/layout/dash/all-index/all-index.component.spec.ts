import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllIndexComponent } from './all-index.component';

describe('AllIndexComponent', () => {
  let component: AllIndexComponent;
  let fixture: ComponentFixture<AllIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
