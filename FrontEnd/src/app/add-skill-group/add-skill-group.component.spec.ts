import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSkillGroupComponent } from './add-skill-group.component';

describe('AddSkillGroupComponent', () => {
  let component: AddSkillGroupComponent;
  let fixture: ComponentFixture<AddSkillGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSkillGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSkillGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
