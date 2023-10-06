import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidelinesCreateUpdateComponent } from './guidelines-create-update.component';

describe('GuidelinesCreateUpdateComponent', () => {
  let component: GuidelinesCreateUpdateComponent;
  let fixture: ComponentFixture<GuidelinesCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuidelinesCreateUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuidelinesCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
