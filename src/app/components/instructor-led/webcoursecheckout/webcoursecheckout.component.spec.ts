import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebcoursecheckoutComponent } from './webcoursecheckout.component';

describe('WebcoursecheckoutComponent', () => {
  let component: WebcoursecheckoutComponent;
  let fixture: ComponentFixture<WebcoursecheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebcoursecheckoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebcoursecheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
