import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationHomePageComponent } from './organization-home-page.component';

describe('OrganizationHomePageComponent', () => {
  let component: OrganizationHomePageComponent;
  let fixture: ComponentFixture<OrganizationHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
