import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LmsMasterDataHomePageComponent } from './lms-master-data-home-page.component';

describe('LmsMasterDataHomePageComponent', () => {
  let component: LmsMasterDataHomePageComponent;
  let fixture: ComponentFixture<LmsMasterDataHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LmsMasterDataHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LmsMasterDataHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
