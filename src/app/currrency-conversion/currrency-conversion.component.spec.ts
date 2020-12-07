import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrrencyConversionComponent } from './currrency-conversion.component';

describe('CurrrencyConversionComponent', () => {
  let component: CurrrencyConversionComponent;
  let fixture: ComponentFixture<CurrrencyConversionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrrencyConversionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrrencyConversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
