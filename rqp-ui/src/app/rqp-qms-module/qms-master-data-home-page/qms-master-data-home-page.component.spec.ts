import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QmsMasterDataHomePageComponent } from './qms-master-data-home-page.component';

describe('QmsMasterDataHomePageComponent', () => {
  let component: QmsMasterDataHomePageComponent;
  let fixture: ComponentFixture<QmsMasterDataHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QmsMasterDataHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QmsMasterDataHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
