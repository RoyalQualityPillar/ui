import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MmModuleHomePageComponent } from './mm-module-home-page.component';

describe('MmModuleHomePageComponent', () => {
  let component: MmModuleHomePageComponent;
  let fixture: ComponentFixture<MmModuleHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MmModuleHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MmModuleHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
