import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapaHomeComponent } from './capa-home.component';

describe('CapaHomeComponent', () => {
  let component: CapaHomeComponent;
  let fixture: ComponentFixture<CapaHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapaHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapaHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
