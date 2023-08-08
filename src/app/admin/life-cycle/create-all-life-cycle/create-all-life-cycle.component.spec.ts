import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAllLifeCycleComponent } from './create-all-life-cycle.component';

describe('CreateAllLifeCycleComponent', () => {
  let component: CreateAllLifeCycleComponent;
  let fixture: ComponentFixture<CreateAllLifeCycleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAllLifeCycleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAllLifeCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
