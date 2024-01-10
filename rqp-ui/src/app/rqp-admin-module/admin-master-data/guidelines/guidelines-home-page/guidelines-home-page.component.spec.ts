import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidelinesHomePageComponent } from './guidelines-home-page.component';

describe('GuidelinesHomePageComponent', () => {
  let component: GuidelinesHomePageComponent;
  let fixture: ComponentFixture<GuidelinesHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuidelinesHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuidelinesHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
