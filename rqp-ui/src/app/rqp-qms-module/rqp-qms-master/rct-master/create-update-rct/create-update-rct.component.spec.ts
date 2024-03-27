import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateRctComponent } from './create-update-rct.component';

describe('CreateUpdateRctComponent', () => {
  let component: CreateUpdateRctComponent;
  let fixture: ComponentFixture<CreateUpdateRctComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateRctComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateRctComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
