import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSessionRouteComponent } from './create-session-route.component';

describe('CreateSessionRouteComponent', () => {
  let component: CreateSessionRouteComponent;
  let fixture: ComponentFixture<CreateSessionRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSessionRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSessionRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
