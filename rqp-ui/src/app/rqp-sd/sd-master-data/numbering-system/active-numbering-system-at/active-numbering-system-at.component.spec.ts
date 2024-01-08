import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveNumberingSystemAtComponent } from './active-numbering-system-at.component';

describe('ActiveNumberingSystemAtComponent', () => {
  let component: ActiveNumberingSystemAtComponent;
  let fixture: ComponentFixture<ActiveNumberingSystemAtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveNumberingSystemAtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveNumberingSystemAtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
