import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SdAdminHomePageComponent } from './sd-admin-home-page.component';

describe('SdAdminHomePageComponent', () => {
  let component: SdAdminHomePageComponent;
  let fixture: ComponentFixture<SdAdminHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SdAdminHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SdAdminHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
