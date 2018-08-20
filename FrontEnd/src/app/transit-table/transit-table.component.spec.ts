import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransitTableComponent } from './transit-table.component';

describe('TransitTableComponent', () => {
  let component: TransitTableComponent;
  let fixture: ComponentFixture<TransitTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransitTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransitTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
