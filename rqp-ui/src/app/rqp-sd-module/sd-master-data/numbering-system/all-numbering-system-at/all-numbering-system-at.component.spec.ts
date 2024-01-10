import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllNumberingSystemAtComponent } from './all-numbering-system-at.component';

describe('AllNumberingSystemAtComponent', () => {
  let component: AllNumberingSystemAtComponent;
  let fixture: ComponentFixture<AllNumberingSystemAtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllNumberingSystemAtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllNumberingSystemAtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
