import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiHomeComponent } from './si-home.component';

describe('SiHomeComponent', () => {
  let component: SiHomeComponent;
  let fixture: ComponentFixture<SiHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
