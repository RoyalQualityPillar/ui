import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoHomeComponent } from './do-home.component';

describe('DoHomeComponent', () => {
  let component: DoHomeComponent;
  let fixture: ComponentFixture<DoHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
