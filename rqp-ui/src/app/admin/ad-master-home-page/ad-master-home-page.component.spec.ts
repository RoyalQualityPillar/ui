import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdMasterHomePageComponent } from './ad-master-home-page.component';

describe('AdMasterHomePageComponent', () => {
  let component: AdMasterHomePageComponent;
  let fixture: ComponentFixture<AdMasterHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdMasterHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdMasterHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
