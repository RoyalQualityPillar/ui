import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardReasonRegistartionCreateUpdateComponent } from './standard-reason-registartion-create-update.component';

describe('StandardReasonRegistartionCreateUpdateComponent', () => {
  let component: StandardReasonRegistartionCreateUpdateComponent;
  let fixture: ComponentFixture<StandardReasonRegistartionCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StandardReasonRegistartionCreateUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StandardReasonRegistartionCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
