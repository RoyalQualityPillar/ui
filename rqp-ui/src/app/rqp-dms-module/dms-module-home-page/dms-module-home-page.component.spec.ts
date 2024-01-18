import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmsModuleHomePageComponent } from './dms-module-home-page.component';

describe('DmsModuleHomePageComponent', () => {
  let component: DmsModuleHomePageComponent;
  let fixture: ComponentFixture<DmsModuleHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DmsModuleHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DmsModuleHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
