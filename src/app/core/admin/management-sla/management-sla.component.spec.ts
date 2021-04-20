import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementSlaComponent } from './management-sla.component';

describe('ManagementSlaComponent', () => {
  let component: ManagementSlaComponent;
  let fixture: ComponentFixture<ManagementSlaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementSlaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementSlaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
