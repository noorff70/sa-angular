import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailablecoursesComponent } from './availablecourses.component';

describe('AvailablecoursesComponent', () => {
  let component: AvailablecoursesComponent;
  let fixture: ComponentFixture<AvailablecoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailablecoursesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailablecoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
