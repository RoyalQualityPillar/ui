import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RqpSdHomePageComponent } from './rqp-sd-home-page.component';

describe('RqpSdHomePageComponent', () => {
  let component: RqpSdHomePageComponent;
  let fixture: ComponentFixture<RqpSdHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RqpSdHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RqpSdHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
