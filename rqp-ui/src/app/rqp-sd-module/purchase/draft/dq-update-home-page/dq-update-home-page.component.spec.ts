import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DqUpdateHomePageComponent } from './dq-update-home-page.component';

describe('DqUpdateHomePageComponent', () => {
  let component: DqUpdateHomePageComponent;
  let fixture: ComponentFixture<DqUpdateHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DqUpdateHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DqUpdateHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
