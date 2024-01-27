import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FairSaveUpdateComponent } from './fair-save-update.component';

describe('FairSaveUpdateComponent', () => {
  let component: FairSaveUpdateComponent;
  let fixture: ComponentFixture<FairSaveUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FairSaveUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FairSaveUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
