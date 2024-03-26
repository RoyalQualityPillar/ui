import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRctAtComponent } from './all-rct-at.component';

describe('AllRctAtComponent', () => {
  let component: AllRctAtComponent;
  let fixture: ComponentFixture<AllRctAtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllRctAtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllRctAtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
