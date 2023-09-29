import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentHomePageComponent } from './department-home-page.component';

describe('DepartmentHomePageComponent', () => {
  let component: DepartmentHomePageComponent;
  let fixture: ComponentFixture<DepartmentHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
