import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCourseSectionRouteComponent } from './create-course-section-route.component';

describe('CreateCourseSectionRouteComponent', () => {
  let component: CreateCourseSectionRouteComponent;
  let fixture: ComponentFixture<CreateCourseSectionRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCourseSectionRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCourseSectionRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
