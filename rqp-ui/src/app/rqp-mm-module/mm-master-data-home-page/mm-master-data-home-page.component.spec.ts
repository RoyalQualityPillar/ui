import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MmMasterDataHomePageComponent } from './mm-master-data-home-page.component';

describe('MmMasterDataHomePageComponent', () => {
  let component: MmMasterDataHomePageComponent;
  let fixture: ComponentFixture<MmMasterDataHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MmMasterDataHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MmMasterDataHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
