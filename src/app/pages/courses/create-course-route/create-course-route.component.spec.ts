import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCourseRouteComponent } from './create-course-route.component';

describe('CreateCourseRouteComponent', () => {
  let component: CreateCourseRouteComponent;
  let fixture: ComponentFixture<CreateCourseRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCourseRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCourseRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
