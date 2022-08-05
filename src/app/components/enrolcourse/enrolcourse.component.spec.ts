import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrolcourseComponent } from './enrolcourse.component';

describe('EnrolcourseComponent', () => {
  let component: EnrolcourseComponent;
  let fixture: ComponentFixture<EnrolcourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrolcourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrolcourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
