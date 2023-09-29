import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialSubTypeCreateUpdateComponent } from './material-sub-type-create-update.component';

describe('MaterialSubTypeCreateUpdateComponent', () => {
  let component: MaterialSubTypeCreateUpdateComponent;
  let fixture: ComponentFixture<MaterialSubTypeCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialSubTypeCreateUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialSubTypeCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
