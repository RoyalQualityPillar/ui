import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleMasterCreateUpdateComponent } from './role-master-create-update.component';

describe('RoleMasterCreateUpdateComponent', () => {
  let component: RoleMasterCreateUpdateComponent;
  let fixture: ComponentFixture<RoleMasterCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleMasterCreateUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleMasterCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
