import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoHomeComponent } from './po-home.component';

describe('PoHomeComponent', () => {
  let component: PoHomeComponent;
  let fixture: ComponentFixture<PoHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
