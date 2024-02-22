import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MmCommonHeaderComponent } from './mm-common-header.component';

describe('MmCommonHeaderComponent', () => {
  let component: MmCommonHeaderComponent;
  let fixture: ComponentFixture<MmCommonHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MmCommonHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MmCommonHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
