import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiUpdateComponent } from './si-update.component';

describe('SiUpdateComponent', () => {
  let component: SiUpdateComponent;
  let fixture: ComponentFixture<SiUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
