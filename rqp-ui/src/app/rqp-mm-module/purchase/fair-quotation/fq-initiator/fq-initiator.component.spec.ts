import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FqInitiatorComponent } from './fq-initiator.component';

describe('FqInitiatorComponent', () => {
  let component: FqInitiatorComponent;
  let fixture: ComponentFixture<FqInitiatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FqInitiatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FqInitiatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
