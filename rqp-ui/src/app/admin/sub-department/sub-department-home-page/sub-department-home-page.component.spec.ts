import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubDepartmentHomePageComponent } from './sub-department-home-page.component';

describe('SubDepartmentHomePageComponent', () => {
  let component: SubDepartmentHomePageComponent;
  let fixture: ComponentFixture<SubDepartmentHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubDepartmentHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubDepartmentHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
