import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DqUpdateComponent } from './dq-update.component';

describe('DqUpdateComponent', () => {
  let component: DqUpdateComponent;
  let fixture: ComponentFixture<DqUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DqUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DqUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
