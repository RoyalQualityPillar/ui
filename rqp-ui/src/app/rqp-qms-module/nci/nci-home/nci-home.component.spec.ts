import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NciHomeComponent } from './nci-home.component';

describe('NciHomeComponent', () => {
  let component: NciHomeComponent;
  let fixture: ComponentFixture<NciHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NciHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NciHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
