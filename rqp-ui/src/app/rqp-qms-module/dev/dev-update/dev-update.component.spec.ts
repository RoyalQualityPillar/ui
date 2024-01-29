import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevUpdateComponent } from './dev-update.component';

describe('DevUpdateComponent', () => {
  let component: DevUpdateComponent;
  let fixture: ComponentFixture<DevUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
