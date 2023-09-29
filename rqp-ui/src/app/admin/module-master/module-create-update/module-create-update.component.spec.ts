import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleCreateUpdateComponent } from './module-create-update.component';

describe('ModuleCreateUpdateComponent', () => {
  let component: ModuleCreateUpdateComponent;
  let fixture: ComponentFixture<ModuleCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleCreateUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
