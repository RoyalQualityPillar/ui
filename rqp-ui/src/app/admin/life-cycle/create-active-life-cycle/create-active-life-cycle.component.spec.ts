import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateActiveLifeCycleComponent } from './create-active-life-cycle.component';

describe('CreateActiveLifeCycleComponent', () => {
  let component: CreateActiveLifeCycleComponent;
  let fixture: ComponentFixture<CreateActiveLifeCycleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateActiveLifeCycleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateActiveLifeCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
