import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QMSESignatureComponent } from './qms-e-signature.component';

describe('QMSESignatureComponent', () => {
  let component: QMSESignatureComponent;
  let fixture: ComponentFixture<QMSESignatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QMSESignatureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QMSESignatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
