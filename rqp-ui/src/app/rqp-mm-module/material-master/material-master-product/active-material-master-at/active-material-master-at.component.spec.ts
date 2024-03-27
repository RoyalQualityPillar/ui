import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveMaterialMasterAtComponent } from './active-material-master-at.component';

describe('ActiveMaterialMasterAtComponent', () => {
  let component: ActiveMaterialMasterAtComponent;
  let fixture: ComponentFixture<ActiveMaterialMasterAtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveMaterialMasterAtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveMaterialMasterAtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
