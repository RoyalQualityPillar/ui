import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackMasterCreateUpdateComponent } from './pack-master-create-update.component';

describe('PackMasterCreateUpdateComponent', () => {
  let component: PackMasterCreateUpdateComponent;
  let fixture: ComponentFixture<PackMasterCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackMasterCreateUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackMasterCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
