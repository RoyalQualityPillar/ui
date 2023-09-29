import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackMasterHomePageComponent } from './pack-master-home-page.component';

describe('PackMasterHomePageComponent', () => {
  let component: PackMasterHomePageComponent;
  let fixture: ComponentFixture<PackMasterHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackMasterHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackMasterHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
