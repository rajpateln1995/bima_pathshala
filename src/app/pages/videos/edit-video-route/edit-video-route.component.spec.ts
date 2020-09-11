import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVideoRouteComponent } from './edit-video-route.component';

describe('EditVideoRouteComponent', () => {
  let component: EditVideoRouteComponent;
  let fixture: ComponentFixture<EditVideoRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVideoRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVideoRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
