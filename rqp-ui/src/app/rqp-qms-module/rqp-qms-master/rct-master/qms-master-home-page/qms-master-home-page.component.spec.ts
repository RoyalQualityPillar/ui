import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QmsMasterHomePageComponent } from './qms-master-home-page.component';

describe('QmsMasterHomePageComponent', () => {
  let component: QmsMasterHomePageComponent;
  let fixture: ComponentFixture<QmsMasterHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QmsMasterHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QmsMasterHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
