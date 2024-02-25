import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SdMasterHomePageComponent } from './sd-master-home-page.component';

describe('SdMasterHomePageComponent', () => {
  let component: SdMasterHomePageComponent;
  let fixture: ComponentFixture<SdMasterHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SdMasterHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SdMasterHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
