import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QtMasterDataHomePageComponent } from './qt-master-data-home-page.component';

describe('QtMasterDataHomePageComponent', () => {
  let component: QtMasterDataHomePageComponent;
  let fixture: ComponentFixture<QtMasterDataHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QtMasterDataHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QtMasterDataHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
