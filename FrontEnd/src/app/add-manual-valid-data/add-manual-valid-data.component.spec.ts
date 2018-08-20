import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddManualValidDataComponent } from './add-manual-valid-data.component';

describe('AddManualValidDataComponent', () => {
  let component: AddManualValidDataComponent;
  let fixture: ComponentFixture<AddManualValidDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddManualValidDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddManualValidDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
