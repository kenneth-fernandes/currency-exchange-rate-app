import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DummTableComponent } from './dumm-table.component';

describe('DummTableComponent', () => {
  let component: DummTableComponent;
  let fixture: ComponentFixture<DummTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DummTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DummTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
