import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveUserLifeCycleListComponent } from './active-user-life-cycle-list.component';

describe('ActiveUserLifeCycleListComponent', () => {
  let component: ActiveUserLifeCycleListComponent;
  let fixture: ComponentFixture<ActiveUserLifeCycleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveUserLifeCycleListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveUserLifeCycleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
