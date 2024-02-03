import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoHomeComponent } from './so-home.component';

describe('SoHomeComponent', () => {
  let component: SoHomeComponent;
  let fixture: ComponentFixture<SoHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
