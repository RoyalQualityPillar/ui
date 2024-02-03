import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FqHomeComponent } from './fq-home.component';

describe('FqHomeComponent', () => {
  let component: FqHomeComponent;
  let fixture: ComponentFixture<FqHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FqHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FqHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
