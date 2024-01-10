import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberingSystemHomePageComponent } from './numbering-system-home-page.component';

describe('NumberingSystemHomePageComponent', () => {
  let component: NumberingSystemHomePageComponent;
  let fixture: ComponentFixture<NumberingSystemHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumberingSystemHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumberingSystemHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
