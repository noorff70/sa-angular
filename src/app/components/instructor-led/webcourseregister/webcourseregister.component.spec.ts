import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebcourseregisterComponent } from './webcourseregister.component';

describe('WebcourseregisterComponent', () => {
  let component: WebcourseregisterComponent;
  let fixture: ComponentFixture<WebcourseregisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebcourseregisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebcourseregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
