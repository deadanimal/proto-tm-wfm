import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementLeaveComponent } from './management-leave.component';

describe('ManagementLeaveComponent', () => {
  let component: ManagementLeaveComponent;
  let fixture: ComponentFixture<ManagementLeaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementLeaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
