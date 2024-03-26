import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RctHomePageComponent } from './rct-home-page.component';

describe('RctHomePageComponent', () => {
  let component: RctHomePageComponent;
  let fixture: ComponentFixture<RctHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RctHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RctHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
