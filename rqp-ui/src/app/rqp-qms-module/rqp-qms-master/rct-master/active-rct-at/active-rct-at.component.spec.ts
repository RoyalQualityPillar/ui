import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveRctAtComponent } from './active-rct-at.component';

describe('ActiveRctAtComponent', () => {
  let component: ActiveRctAtComponent;
  let fixture: ComponentFixture<ActiveRctAtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveRctAtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveRctAtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
