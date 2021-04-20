import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementTaskComponent } from './management-task.component';

describe('ManagementTaskComponent', () => {
  let component: ManagementTaskComponent;
  let fixture: ComponentFixture<ManagementTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
