import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRequirementHomePageComponent } from './user-requirement-home-page.component';

describe('UserRequirementHomePageComponent', () => {
  let component: UserRequirementHomePageComponent;
  let fixture: ComponentFixture<UserRequirementHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRequirementHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRequirementHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
