import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeCycleHomeComponent } from './life-cycle-home.component';

describe('LifeCycleHomeComponent', () => {
  let component: LifeCycleHomeComponent;
  let fixture: ComponentFixture<LifeCycleHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LifeCycleHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LifeCycleHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
