import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QmsCommonHeaderComponent } from './qms-common-header.component';

describe('DmsCommonHeaderComponent', () => {
  let component: QmsCommonHeaderComponent;
  let fixture: ComponentFixture<QmsCommonHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QmsCommonHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QmsCommonHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
