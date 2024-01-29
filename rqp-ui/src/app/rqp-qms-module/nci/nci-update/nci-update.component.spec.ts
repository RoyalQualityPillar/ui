import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NciUpdateComponent } from './nci-update.component';

describe('NciUpdateComponent', () => {
  let component: NciUpdateComponent;
  let fixture: ComponentFixture<NciUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NciUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NciUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
