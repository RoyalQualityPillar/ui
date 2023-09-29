import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityProfileCreateUpdateComponent } from './security-profile-create-update.component';

describe('SecurityProfileCreateUpdateComponent', () => {
  let component: SecurityProfileCreateUpdateComponent;
  let fixture: ComponentFixture<SecurityProfileCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityProfileCreateUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecurityProfileCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
