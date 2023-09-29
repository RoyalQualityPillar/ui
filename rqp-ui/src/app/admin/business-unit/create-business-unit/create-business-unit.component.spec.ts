import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBusinessUnitComponent } from './create-business-unit.component';

describe('CreateBusinessUnitComponent', () => {
  let component: CreateBusinessUnitComponent;
  let fixture: ComponentFixture<CreateBusinessUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBusinessUnitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBusinessUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
