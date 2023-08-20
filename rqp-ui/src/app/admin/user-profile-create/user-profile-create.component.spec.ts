import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileCreateComponent } from './user-profile-create.component';

describe('UserProfileCreateComponent', () => {
  let component: UserProfileCreateComponent;
  let fixture: ComponentFixture<UserProfileCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfileCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfileCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
