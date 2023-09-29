import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignationHomePageComponent } from './designation-home-page.component';

describe('DesignationHomePageComponent', () => {
  let component: DesignationHomePageComponent;
  let fixture: ComponentFixture<DesignationHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignationHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesignationHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
