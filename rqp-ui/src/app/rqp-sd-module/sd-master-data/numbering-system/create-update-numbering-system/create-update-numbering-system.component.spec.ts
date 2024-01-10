import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateNumberingSystemComponent } from './create-update-numbering-system.component';

describe('CreateUpdateNumberingSystemComponent', () => {
  let component: CreateUpdateNumberingSystemComponent;
  let fixture: ComponentFixture<CreateUpdateNumberingSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateNumberingSystemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateNumberingSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
