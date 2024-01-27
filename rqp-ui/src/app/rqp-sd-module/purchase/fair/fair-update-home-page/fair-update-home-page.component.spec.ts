import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FairUpdateHomePageComponent } from './fair-update-home-page.component';

describe('FairUpdateHomePageComponent', () => {
  let component: FairUpdateHomePageComponent;
  let fixture: ComponentFixture<FairUpdateHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FairUpdateHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FairUpdateHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
