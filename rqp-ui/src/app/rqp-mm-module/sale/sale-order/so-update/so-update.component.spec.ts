import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoUpdateComponent } from './so-update.component';

describe('SoUpdateComponent', () => {
  let component: SoUpdateComponent;
  let fixture: ComponentFixture<SoUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
