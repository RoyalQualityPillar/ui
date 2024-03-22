import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmsCommonHeaderComponent } from './qms-common-header.component';

describe('DmsCommonHeaderComponent', () => {
  let component: DmsCommonHeaderComponent;
  let fixture: ComponentFixture<DmsCommonHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DmsCommonHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DmsCommonHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
