import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialSubTypeHomePageComponent } from './material-sub-type-home-page.component';

describe('MaterialSubTypeHomePageComponent', () => {
  let component: MaterialSubTypeHomePageComponent;
  let fixture: ComponentFixture<MaterialSubTypeHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialSubTypeHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialSubTypeHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
