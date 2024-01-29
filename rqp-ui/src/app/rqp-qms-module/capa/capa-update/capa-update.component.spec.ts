import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapaUpdateComponent } from './capa-update.component';

describe('CapaUpdateComponent', () => {
  let component: CapaUpdateComponent;
  let fixture: ComponentFixture<CapaUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapaUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapaUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
