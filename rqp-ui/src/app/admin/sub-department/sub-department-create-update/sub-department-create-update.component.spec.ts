import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubDepartmentCreateUpdateComponent } from './sub-department-create-update.component';

describe('SubDepartmentCreateUpdateComponent', () => {
  let component: SubDepartmentCreateUpdateComponent;
  let fixture: ComponentFixture<SubDepartmentCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubDepartmentCreateUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubDepartmentCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
