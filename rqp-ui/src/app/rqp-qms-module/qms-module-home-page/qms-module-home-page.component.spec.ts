import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QmsModuleHomePageComponent } from './qms-module-home-page.component';

describe('QmsModuleHomePageComponent', () => {
  let component: QmsModuleHomePageComponent;
  let fixture: ComponentFixture<QmsModuleHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QmsModuleHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QmsModuleHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
