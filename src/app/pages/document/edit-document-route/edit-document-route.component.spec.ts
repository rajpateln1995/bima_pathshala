import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDocumentRouteComponent } from './edit-document-route.component';

describe('EditDocumentRouteComponent', () => {
  let component: EditDocumentRouteComponent;
  let fixture: ComponentFixture<EditDocumentRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDocumentRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDocumentRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
