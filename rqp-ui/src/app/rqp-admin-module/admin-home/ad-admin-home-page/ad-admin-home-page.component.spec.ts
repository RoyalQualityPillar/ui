import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdAdminHomePageComponent } from './ad-admin-home-page.component';

describe('AdAdminHomePageComponent', () => {
  let component: AdAdminHomePageComponent;
  let fixture: ComponentFixture<AdAdminHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdAdminHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdAdminHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
