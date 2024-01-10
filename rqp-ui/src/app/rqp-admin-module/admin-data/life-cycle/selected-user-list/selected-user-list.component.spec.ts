import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedUserListComponent } from './selected-user-list.component';

describe('SelectedUserListComponent', () => {
  let component: SelectedUserListComponent;
  let fixture: ComponentFixture<SelectedUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedUserListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
