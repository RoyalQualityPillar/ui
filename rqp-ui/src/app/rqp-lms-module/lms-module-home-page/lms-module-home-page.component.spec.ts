import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LmsModuleHomePageComponent } from './lms-module-home-page.component';

describe('LmsModuleHomePageComponent', () => {
  let component: LmsModuleHomePageComponent;
  let fixture: ComponentFixture<LmsModuleHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LmsModuleHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LmsModuleHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
