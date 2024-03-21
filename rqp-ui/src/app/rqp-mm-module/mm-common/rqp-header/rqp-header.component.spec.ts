import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RqpHeaderComponent } from './rqp-header.component';

describe('RgpHeaderComponent', () => {
  let component: RqpHeaderComponent;
  let fixture: ComponentFixture<RqpHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RqpHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RqpHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
