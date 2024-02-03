import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DqHomeComponent } from './dq-home.component';

describe('DqHomeComponent', () => {
  let component: DqHomeComponent;
  let fixture: ComponentFixture<DqHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DqHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DqHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
