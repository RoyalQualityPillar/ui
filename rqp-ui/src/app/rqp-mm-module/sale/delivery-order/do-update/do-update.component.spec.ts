import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoUpdateComponent } from './do-update.component';

describe('DoUpdateComponent', () => {
  let component: DoUpdateComponent;
  let fixture: ComponentFixture<DoUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
