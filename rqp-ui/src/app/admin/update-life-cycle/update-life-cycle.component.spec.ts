import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLifeCycleComponent } from './update-life-cycle.component';

describe('UpdateLifeCycleComponent', () => {
  let component: UpdateLifeCycleComponent;
  let fixture: ComponentFixture<UpdateLifeCycleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateLifeCycleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateLifeCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
