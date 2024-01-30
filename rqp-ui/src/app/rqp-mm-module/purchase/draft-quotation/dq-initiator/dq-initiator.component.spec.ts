import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DqInitiatorComponent } from './dq-initiator.component';

describe('DqInitiatorComponent', () => {
  let component: DqInitiatorComponent;
  let fixture: ComponentFixture<DqInitiatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DqInitiatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DqInitiatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
