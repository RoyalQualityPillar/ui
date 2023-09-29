import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleMasterHomePageComponent } from './role-master-home-page.component';

describe('RoleMasterHomePageComponent', () => {
  let component: RoleMasterHomePageComponent;
  let fixture: ComponentFixture<RoleMasterHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleMasterHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleMasterHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
