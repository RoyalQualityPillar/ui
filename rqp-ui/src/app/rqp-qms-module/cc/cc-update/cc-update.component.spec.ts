import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcUpdateComponent } from './cc-update.component';

describe('CcUpdateComponent', () => {
  let component: CcUpdateComponent;
  let fixture: ComponentFixture<CcUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CcUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CcUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
