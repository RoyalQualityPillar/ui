import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardReasonRegistartionHomePageComponent } from './standard-reason-registartion-home-page.component';

describe('StandardReasonRegistartionHomePageComponent', () => {
  let component: StandardReasonRegistartionHomePageComponent;
  let fixture: ComponentFixture<StandardReasonRegistartionHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StandardReasonRegistartionHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StandardReasonRegistartionHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
