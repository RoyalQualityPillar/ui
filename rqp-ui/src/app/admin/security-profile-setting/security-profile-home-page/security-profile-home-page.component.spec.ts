import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityProfileHomePageComponent } from './security-profile-home-page.component';

describe('SecurityProfileHomePageComponent', () => {
  let component: SecurityProfileHomePageComponent;
  let fixture: ComponentFixture<SecurityProfileHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityProfileHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecurityProfileHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
