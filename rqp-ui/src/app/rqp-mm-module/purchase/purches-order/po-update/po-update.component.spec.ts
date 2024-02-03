import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoUpdateComponent } from './po-update.component';

describe('PoUpdateComponent', () => {
  let component: PoUpdateComponent;
  let fixture: ComponentFixture<PoUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
