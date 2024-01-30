import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FqUpdateComponent } from './fq-update.component';

describe('FqUpdateComponent', () => {
  let component: FqUpdateComponent;
  let fixture: ComponentFixture<FqUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FqUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FqUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
