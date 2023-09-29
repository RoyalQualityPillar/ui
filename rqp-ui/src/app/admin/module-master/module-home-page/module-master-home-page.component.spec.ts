import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleMasterHomePageComponent } from './module-master-home-page.component';

describe('ModuleHomePageComponent', () => {
  let component: ModuleMasterHomePageComponent;
  let fixture: ComponentFixture<ModuleMasterHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleMasterHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleMasterHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
